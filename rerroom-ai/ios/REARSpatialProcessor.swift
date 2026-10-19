import ARKit
import RealityKit

@available(iOS 13.4, *)
@MainActor
final class REARSpatialProcessor: NSObject, ARSessionDelegate {
    private let session: ARSession
    private(set) var isRunning = false
    private(set) var latestSnapshot: SpatialSnapshot = .unavailable
    var onSnapshot: ((SpatialSnapshot) -> Void)?

    init(session: ARSession = ARSession()) {
        self.session = session
        super.init()
        self.session.delegate = self
    }

    var capabilities: SpatialCapabilities {
        SpatialCapabilities(
            worldTracking: ARWorldTrackingConfiguration.isSupported,
            sceneDepth: supports(.sceneDepth),
            smoothedSceneDepth: supports(.smoothedSceneDepth),
            meshReconstruction: supportsMeshReconstruction
        )
    }

    func start() -> Result<SpatialCapabilities, SpatialProcessorError> {
        guard ARWorldTrackingConfiguration.isSupported else {
            return .failure(.worldTrackingUnavailable)
        }

        let configuration = ARWorldTrackingConfiguration()
        configuration.planeDetection = [.horizontal, .vertical]

        if supports(.sceneDepth) {
            configuration.frameSemantics.insert(.sceneDepth)
        }
        if supports(.smoothedSceneDepth) {
            configuration.frameSemantics.insert(.smoothedSceneDepth)
        }
        if supportsMeshReconstruction {
            configuration.sceneReconstruction = .meshWithClassification
        }

        session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
        isRunning = true
        publish(snapshot(for: session.currentFrame))
        return .success(capabilities)
    }

    func pause() {
        session.pause()
        isRunning = false
        publish(snapshot(for: session.currentFrame))
    }

    func stop() {
        session.pause()
        isRunning = false
        latestSnapshot = .unavailable
    }

    func currentSpatialState() -> SpatialSnapshot {
        snapshot(for: session.currentFrame)
    }

    func session(_ session: ARSession, didUpdate frame: ARFrame) {
        publish(snapshot(for: frame))
    }

    func session(_ session: ARSession, didFailWithError error: Error) {
        publish(.failed(message: error.localizedDescription))
    }

    func sessionWasInterrupted(_ session: ARSession) {
        publish(.interrupted)
    }

    func sessionInterruptionEnded(_ session: ARSession) {
        publish(snapshot(for: session.currentFrame))
    }

    private var supportsMeshReconstruction: Bool {
        guard #available(iOS 13.4, *) else { return false }
        return ARWorldTrackingConfiguration.supportsSceneReconstruction(.meshWithClassification)
    }

    private func supports(_ semantics: ARConfiguration.FrameSemantics) -> Bool {
        guard #available(iOS 14.0, *) else { return false }
        return ARWorldTrackingConfiguration.supportsFrameSemantics(semantics)
    }

    private func snapshot(for frame: ARFrame?) -> SpatialSnapshot {
        guard let frame else { return .unavailable }
        let depthAvailable: Bool
        if #available(iOS 14.0, *) {
            depthAvailable = frame.smoothedSceneDepth != nil || frame.sceneDepth != nil
        } else {
            depthAvailable = false
        }
        return .available(
            capabilities: capabilities,
            hasDepth: depthAvailable,
            tracking: TrackingState(frame.camera.trackingState),
            mapping: MappingState(frame.worldMappingStatus),
            timestamp: frame.timestamp
        )
    }

    private func publish(_ snapshot: SpatialSnapshot) {
        latestSnapshot = snapshot
        onSnapshot?(snapshot)
    }
}

struct SpatialCapabilities: Equatable {
    let worldTracking: Bool
    let sceneDepth: Bool
    let smoothedSceneDepth: Bool
    let meshReconstruction: Bool
}

enum SpatialProcessorError: Error, Equatable {
    case worldTrackingUnavailable
}

enum TrackingState: Equatable {
    case notAvailable
    case limited(reason: String)
    case normal

    init(_ state: ARCamera.TrackingState) {
        switch state {
        case .notAvailable: self = .notAvailable
        case .normal: self = .normal
        case .limited(let reason): self = .limited(reason: String(describing: reason))
        @unknown default: self = .limited(reason: "unknown")
        }
    }
}

enum MappingState: Equatable {
    case notAvailable
    case limited
    case extending
    case mapped

    init(_ status: ARFrame.WorldMappingStatus) {
        switch status {
        case .notAvailable: self = .notAvailable
        case .limited: self = .limited
        case .extending: self = .extending
        case .mapped: self = .mapped
        @unknown default: self = .limited
        }
    }
}

enum SpatialSnapshot: Equatable {
    case unavailable
    case interrupted
    case failed(message: String)
    case available(capabilities: SpatialCapabilities, hasDepth: Bool, tracking: TrackingState, mapping: MappingState, timestamp: TimeInterval)

    var isUsable: Bool {
        guard case let .available(_, hasDepth, tracking, mapping, _) = self else { return false }
        let trackingReady = tracking == .normal
        let mappingReady = mapping == .mapped || mapping == .extending
        return trackingReady && mappingReady && hasDepth
    }
}

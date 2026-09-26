import { useMemo, useState } from "react";
import {
  mockARScene,
  mockPlanes,
  mockProducts,
  mockProjects,
  mockRecommendations,
  mockRooms,
  mockStyles,
} from "@/premium/data";
import type { ARMode, FurnitureProduct } from "@/premium/types/models";
import {
  constructionProgress,
  formatMoney,
  nextRotation,
  nextScale,
  productAvailability,
  productsForRoom,
  projectBudgetSummary,
  roomArea,
  validationMessage,
} from "@/features/catalog";
import {
  Button,
  EmptyState,
  Icon,
  IconButton,
  LoadingCard,
  SectionHeading,
  StatusPill,
} from "@/components/ui";

export type SecondaryScreen = "design" | "studio" | "saved" | "profile" | "construction" | null;

interface ExperienceProps {
  onNavigate: (tab: "home" | "explore" | "ar" | "shop" | "projects") => void;
  onSecondary: (screen: SecondaryScreen) => void;
  onSelectProduct: (product: FurnitureProduct) => void;
  favorites: string[];
  onFavorite: (productId: string) => void;
  notify: (message: string) => void;
}

function InteriorImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
      <Icon name="home" size={26} />
    </div>
  ) : (
    <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
}

function FavoriteButton({
  active,
  onToggle,
  label,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <Button className={`favorite-button ${active ? "is-saved" : ""}`} onClick={onToggle} label={label}>
      <Icon name={active ? "heartFill" : "heart"} size={17} />
    </Button>
  );
}

function ProductCard({
  product,
  favorite,
  onFavorite,
  onSelect,
  onAR,
}: {
  product: FurnitureProduct;
  favorite: boolean;
  onFavorite: () => void;
  onSelect: () => void;
  onAR: () => void;
}) {
  return (
    <article className="product-card">
      <button className="product-visual" type="button" onClick={onSelect} aria-label={`Open ${product.name}`}>
        <InteriorImage src={product.image.uri} alt={product.image.alt} />
        <span className="match-pill">{94 - (Number(product.id.split("-")[1]) % 7)}% match</span>
      </button>
      <FavoriteButton
        active={favorite}
        onToggle={onFavorite}
        label={favorite ? `Remove ${product.name} from saved` : `Save ${product.name}`}
      />
      <div className="product-copy">
        <div className="brand-row">
          <span>{product.brand}</span>
          <strong>★ {product.rating.toFixed(1)}</strong>
        </div>
        <button type="button" className="product-title" onClick={onSelect}>
          {product.name}
        </button>
        <p>
          {product.dimensionsCm.width} × {product.dimensionsCm.depth}cm · {product.material}
        </p>
        <div className="product-price">
          <strong>{formatMoney(product.price)}</strong>
          <span className={product.inStock ? "stock-good" : "stock-warn"}>
            {productAvailability(product)}
          </span>
        </div>
        <div className="product-actions">
          <Button className="button-secondary" onClick={onAR}>
            <Icon name="scan" size={14} /> View in AR
          </Button>
          <Button className="button-dark" onClick={onSelect}>
            <Icon name="plus" size={14} /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export function HomeExperience({
  onNavigate,
  onSecondary,
  onSelectProduct,
  favorites,
  onFavorite,
}: ExperienceProps) {
  const room = mockRooms[0];
  const recommendations = productsForRoom(mockProducts, room, 4);
  return (
    <div className="scroll-screen">
      <header className="home-header">
        <div>
          <span className="location">
            <Icon name="pin" size={12} /> Brooklyn · Loft 4B
          </span>
          <h1>Good afternoon, Alex</h1>
        </div>
        <div className="header-actions">
          <IconButton icon="bell" label="Notifications" />
          <Button className="avatar" label="Open profile" onClick={() => onSecondary("profile")}>
            A
          </Button>
        </div>
      </header>
      <section className="hero-card">
        <InteriorImage src={room.image.uri} alt={room.image.alt} />
        <div className="hero-overlay" />
        <div className="brand-lockup">
          <span>R</span> RE:ROOM
        </div>
        <div className="hero-content">
          <StatusPill>
            <Icon name="spark" size={13} /> AI-powered space planning
          </StatusPill>
          <h2>
            Redesign your
            <br />
            space with AI
          </h2>
          <p>Scan, style, and shop your room in minutes.</p>
          <Button className="button-light hero-cta" onClick={() => onSecondary("design")}>
            Start designing <Icon name="arrow" size={17} />
          </Button>
        </div>
      </section>
      <section className="stat-strip" aria-label="Account summary">
        <div>
          <strong>12</strong>
          <span>saved items</span>
        </div>
        <i />
        <div>
          <strong>4</strong>
          <span>active projects</span>
        </div>
        <StatusPill tone="clay">
          <Icon name="spark" size={13} /> Pro
        </StatusPill>
      </section>
      <div className="chip-row" aria-label="Room type filters">
        {["Living room", "Bedroom", "Kitchen", "Office", "Dining"].map((category, index) => (
          <Button key={category} className={`filter-chip ${index === 0 ? "is-selected" : ""}`}>
            {category}
          </Button>
        ))}
      </div>
      <SectionHeading title="Your spaces" action="Explore" onAction={() => onNavigate("explore")} />
      <div className="room-rail">
        {mockRooms.slice(0, 4).map((item) => (
          <Button key={item.id} className="room-card" onClick={() => onSecondary("studio")}>
            <InteriorImage src={item.image.uri} alt={item.image.alt} />
            <span className="room-status">{item.completion}% complete</span>
            <span className="room-copy">
              <strong>{item.name}</strong>
              <small>
                {roomArea(item)} · {item.style}
              </small>
            </span>
          </Button>
        ))}
      </div>
      <SectionHeading title="AI recommendations" action="Refresh" />
      <div className="recommendation-grid">
        {recommendations.slice(0, 2).map((product) => (
          <div className="recommendation-card" key={product.id}>
            <InteriorImage src={product.image.uri} alt={product.image.alt} />
            <FavoriteButton
              active={favorites.includes(product.id)}
              onToggle={() => onFavorite(product.id)}
              label={`Save ${product.name}`}
            />
            <div>
              <span>PERFECT FOR YOUR LOFT</span>
              <h3>{product.name}</h3>
              <p>
                {formatMoney(product.price)} · {product.material}
              </p>
              <Button onClick={() => onSelectProduct(product)} className="card-link">
                Preview detail <Icon name="arrow" size={14} />
              </Button>
            </div>
          </div>
        ))}
        <div className="palette-card">
          <div className="palette-swatches">
            {room.palette.map((color) => (
              <i key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
          <div>
            <span>AI COLOR STORY</span>
            <h3>{room.style}</h3>
            <p>Oak · Linen · Travertine</p>
            <Button className="card-link">
              Apply palette <Icon name="arrow" size={14} />
            </Button>
          </div>
        </div>
      </div>
      <SectionHeading title="Recent activity" action="See all" />
      <div className="activity-card">
        <span className="activity-icon">
          <Icon name="spark" size={17} />
        </span>
        <div>
          <strong>Design insights are ready</strong>
          <p>3 placement improvements could unlock more walkway clearance.</p>
        </div>
        <Button className="inline-link" onClick={() => onSecondary("studio")}>
          Review
        </Button>
      </div>
    </div>
  );
}

export function ExploreExperience({ onSecondary, onSelectProduct, favorites, onFavorite }: ExperienceProps) {
  const [activeStyle, setActiveStyle] = useState("All");
  const rooms = activeStyle === "All" ? mockRooms : mockRooms.filter((room) => room.style === activeStyle);
  return (
    <div className="scroll-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">DESIGN DISCOVERY</span>
          <h1>Explore ideas</h1>
          <p>Distinct directions grounded in the rooms you love.</p>
        </div>
        <IconButton icon="search" label="Search inspiration" />
      </header>
      <div className="chip-row">
        {["All", ...mockStyles.slice(0, 5).map((style) => style.name)].map((style) => (
          <Button
            key={style}
            className={`filter-chip ${activeStyle === style ? "is-selected" : ""}`}
            onClick={() => setActiveStyle(style)}
          >
            {style}
          </Button>
        ))}
      </div>
      <div className="editorial-card">
        <InteriorImage src={mockStyles[0].image.uri} alt={mockStyles[0].image.alt} />
        <div className="editorial-copy">
          <span>STYLE EDIT</span>
          <h2>{mockStyles[0].name}</h2>
          <p>{mockStyles[0].description}</p>
          <Button className="button-light" onClick={() => onSecondary("studio")}>
            Build a moodboard <Icon name="arrow" size={16} />
          </Button>
        </div>
      </div>
      <SectionHeading title="Rooms to explore" action={`${rooms.length} spaces`} />
      <div className="explore-grid">
        {rooms.map((room) => (
          <Button key={room.id} className="explore-room" onClick={() => onSecondary("studio")}>
            <InteriorImage src={room.image.uri} alt={room.image.alt} />
            <div>
              <StatusPill tone={room.status === "Complete" ? "success" : "neutral"}>{room.status}</StatusPill>
              <h3>{room.name}</h3>
              <p>
                {room.style} · {room.areaSqFt} sq ft
              </p>
            </div>
          </Button>
        ))}
      </div>
      <SectionHeading title="Designed for you" />
      <div className="product-rail">
        {mockProducts.slice(10, 16).map((product) => (
          <div className="mini-product" key={product.id}>
            <InteriorImage src={product.image.uri} alt={product.image.alt} />
            <FavoriteButton
              active={favorites.includes(product.id)}
              onToggle={() => onFavorite(product.id)}
              label={`Save ${product.name}`}
            />
            <Button onClick={() => onSelectProduct(product)}>
              <strong>{product.name}</strong>
              <span>{formatMoney(product.price)}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ARScannerExperience({ onSecondary, notify }: ExperienceProps) {
  const [mode, setMode] = useState<ARMode>("Scan");
  const [occlusion, setOcclusion] = useState(mockARScene.occlusionEnabled);
  const [captured, setCaptured] = useState(false);
  const scanProgress = captured ? 100 : mode === "Scan" ? 72 : 86;
  return (
    <div className="ar-experience">
      <InteriorImage
        src={mockRooms[1].image.uri}
        alt="Camera view of warm minimalist room"
        className="ar-camera"
      />
      <div className="ar-tint" />
      <div className="ar-grid" />
      <span className="ar-line line-left" />
      <span className="ar-line line-right" />
      <div className="ar-reticle">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="measure-line horizontal">
        <span>4.8m</span>
      </div>
      <div className="measure-line diagonal">
        <span>3.6m</span>
      </div>
      <header className="ar-top">
        <IconButton
          icon="arrow"
          label="Return home"
          onClick={() => onSecondary(null)}
          className="glass-button back"
        />
        <div className="tracking-state">
          <i />
          <div>
            <strong>{captured ? "Room captured" : "Floor detected"}</strong>
            <span>Confidence 96%</span>
          </div>
        </div>
        <IconButton icon="sun" label="Lighting estimate" className="glass-button" />
      </header>
      <div className="ar-status-row">
        <StatusPill>
          <Icon name="layers" size={14} /> Plane detection · {mockPlanes.length}
        </StatusPill>
        <Button
          className={`hud-chip ${occlusion ? "on" : ""}`}
          onClick={() => setOcclusion((value) => !value)}
        >
          <Icon name="expand" size={14} /> Depth / occlusion <b>{occlusion ? "ON" : "OFF"}</b>
        </Button>
      </div>
      <section className="ai-callout">
        <span>
          <Icon name="spark" size={17} />
        </span>
        <div>
          <small>AI SUGGESTION</small>
          <strong>
            {mode === "Place"
              ? "Tap the floor to place the Luna sofa."
              : "Try a 2.4m sofa against this wall."}
          </strong>
        </div>
        <Button label="Open 3D studio" onClick={() => onSecondary("studio")}>
          <Icon name="arrow" size={16} />
        </Button>
      </section>
      <section className="scan-data">
        <div className="scan-progress">
          <span>SCANNING ROOM</span>
          <strong>{scanProgress}%</strong>
          <small>{captured ? "Scene saved locally" : "Move slowly to map corners"}</small>
        </div>
        <div className="progress-line">
          <i style={{ width: `${scanProgress}%` }} />
        </div>
        <div className="scan-metrics">
          <div>
            <strong>14.2</strong>
            <span>m² area</span>
          </div>
          <div>
            <strong>2.7m</strong>
            <span>ceiling</span>
          </div>
          <div>
            <strong>3</strong>
            <span>walls</span>
          </div>
          <div>
            <strong>1</strong>
            <span>floor plane</span>
          </div>
        </div>
      </section>
      <div className="ar-tools">
        {(["Scan", "Measure", "Place", "Capture"] as ARMode[]).map((tool) => (
          <Button
            key={tool}
            className={`ar-tool ${mode === tool ? "is-active" : ""}`}
            onClick={() => {
              setMode(tool);
              if (tool === "Capture") {
                setCaptured(true);
                notify("Room scan saved for offline planning");
              }
            }}
          >
            <span>
              <Icon
                name={
                  tool === "Scan"
                    ? "scan"
                    : tool === "Measure"
                      ? "ruler"
                      : tool === "Place"
                        ? "cube"
                        : "camera"
                }
                size={20}
              />
            </span>
            {tool === "Capture" ? "Capture" : `${tool} room`}
          </Button>
        ))}
      </div>
      <p className="ar-disclaimer">
        Simulation mode · Live ARKit / ARCore can connect behind this interface.
      </p>
    </div>
  );
}

export function DesignStudioExperience({ onNavigate, onSecondary, notify }: ExperienceProps) {
  const [selectedRoomId, setSelectedRoomId] = useState(mockRooms[0].id);
  const [selectedStyle, setSelectedStyle] = useState(mockStyles[0].id);
  const [brief, setBrief] = useState(
    "Warm, calm, low-maintenance living room with more room to host friends.",
  );
  const [state, setState] = useState<"idle" | "generating" | "ready">("idle");
  const selectedRoom = mockRooms.find((room) => room.id === selectedRoomId) ?? mockRooms[0];
  const style = mockStyles.find((item) => item.id === selectedStyle) ?? mockStyles[0];

  const generate = () => {
    setState("generating");
    window.setTimeout(() => {
      setState("ready");
      notify("Your AI room concept is ready");
    }, 650);
  };

  return (
    <div className="secondary-screen design-studio-screen">
      <header className="secondary-header">
        <Button className="back-button" onClick={() => onSecondary(null)} label="Back to home">
          <Icon name="arrow" size={18} />
        </Button>
        <div>
          <span className="eyebrow">AI DESIGN STUDIO</span>
          <h1>Create your concept</h1>
        </div>
      </header>
      <section className="design-hero">
        <InteriorImage src={selectedRoom.image.uri} alt={selectedRoom.image.alt} />
        <div />
        <span>
          <Icon name="spark" size={14} /> Your selected space
        </span>
        <h2>{selectedRoom.name}</h2>
        <p>
          {roomArea(selectedRoom)} · {selectedRoom.areaSqFt} sq ft · scan confidence 96%
        </p>
      </section>
      <SectionHeading title="1. Choose a room" />
      <div className="room-selector">
        {mockRooms.slice(0, 4).map((room) => (
          <Button
            key={room.id}
            className={selectedRoomId === room.id ? "is-selected" : ""}
            onClick={() => setSelectedRoomId(room.id)}
          >
            <InteriorImage src={room.image.uri} alt={room.image.alt} />
            <span>{room.type}</span>
            <strong>{room.name}</strong>
          </Button>
        ))}
      </div>
      <SectionHeading title="2. Set the direction" />
      <div className="style-picker">
        {mockStyles.slice(0, 5).map((item) => (
          <Button
            key={item.id}
            className={selectedStyle === item.id ? "is-selected" : ""}
            onClick={() => setSelectedStyle(item.id)}
          >
            <i
              style={{ background: `linear-gradient(135deg, ${item.primaryColor}, ${item.secondaryColor})` }}
            />
            <span>{item.name}</span>
          </Button>
        ))}
      </div>
      <label className="design-brief">
        <span>DESIGN BRIEF</span>
        <textarea
          value={brief}
          onChange={(event) => setBrief(event.target.value)}
          maxLength={180}
          aria-label="Describe your design goals"
        />
        <small>{brief.length}/180 · Tell the AI how you want the room to feel.</small>
      </label>
      <section className="design-signal-card">
        <span className="signal-icon">
          <Icon name="layers" size={18} />
        </span>
        <div>
          <strong>Spatial data included</strong>
          <p>Room boundary, 60 measurements, light estimate, clearance rules, and your saved items.</p>
        </div>
        <StatusPill tone="success">
          <Icon name="check" size={12} /> Ready
        </StatusPill>
      </section>
      {state === "generating" ? <LoadingCard label="Generating your spatially-aware concept" /> : null}
      {state === "ready" ? (
        <section className="generated-concept">
          <span>
            <Icon name="spark" size={16} /> CONCEPT READY
          </span>
          <h2>{style.name} for entertaining</h2>
          <p>
            We opened the main circulation path to 1.08m, warmed the lighting plan, and matched 8 pieces to
            your selected room.
          </p>
          <div>
            <StatusPill tone="success">1.08m walkway</StatusPill>
            <StatusPill tone="neutral">$3,486 estimated</StatusPill>
          </div>
          <Button className="button-dark" onClick={() => onSecondary("studio")}>
            Open 3D concept <Icon name="arrow" size={16} />
          </Button>
        </section>
      ) : null}
      <div className="design-actions">
        <Button className="button-secondary" onClick={() => onNavigate("ar")}>
          <Icon name="scan" size={16} /> Scan another room
        </Button>
        <Button className="button-dark" onClick={generate} disabled={state === "generating"}>
          {state === "generating" ? "Designing..." : "Generate concept"} <Icon name="spark" size={16} />
        </Button>
      </div>
    </div>
  );
}

export function StudioExperience({ onSecondary, onSelectProduct, notify }: ExperienceProps) {
  const [selected, setSelected] = useState({
    rotationY: 15,
    scale: 1,
    collision: false,
    snapped: true,
    anchored: true,
  });
  const [tool, setTool] = useState("Furniture");
  const [debug, setDebug] = useState(false);
  const product = mockProducts[0];
  const state = validationMessage(selected);
  return (
    <div className="studio-experience">
      <section className="studio-canvas">
        <InteriorImage src={mockRooms[0].image.uri} alt="3D room studio interior" />
        <div className="studio-shade" />
        <header className="studio-top">
          <IconButton
            icon="arrow"
            label="Back to home"
            className="glass-button back"
            onClick={() => onSecondary(null)}
          />
          <div>
            <span>PROJECT</span>
            <strong>Warm Minimalist Living Room</strong>
          </div>
          <div className="studio-actions">
            <IconButton icon="save" label="Save scene" onClick={() => notify("3D layout saved offline")} />
            <IconButton icon="share" label="Share scene" onClick={() => notify("Share link copied")} />
          </div>
        </header>
        <div className="studio-floating left">
          <Icon name="cube" size={14} /> 3D perspective
        </div>
        <div className="studio-floating right">
          <span>ROOM BUDGET</span>
          <strong>$3,486</strong>
        </div>
        {debug ? (
          <div className="debug-overlay">
            <span>FLOOR PLANE · 96%</span>
            <span>BOUNDARY LOCKED</span>
            <span>OCCLUSION ACTIVE</span>
          </div>
        ) : null}
        <button
          className={`object-outline ${selected.collision ? "has-collision" : ""}`}
          type="button"
          onClick={() => setSelected((value) => ({ ...value, collision: !value.collision }))}
          aria-label="Toggle sofa collision state"
        >
          <i />
          <i />
          <i />
          <i />
          <span className="object-dimension">240 cm</span>
          <span className="snap-note">
            <Icon name={selected.collision ? "warning" : "check"} size={12} />
            {selected.collision ? " Collision: move 18 cm" : " Wall aligned · 8 cm"}
          </span>
          <span className="rotate-handle">
            <Icon name="rotate" size={16} />
          </span>
        </button>
        <div className="snap-guide">
          <span>SNAP</span>
        </div>
        <Button
          className="optimize-layout"
          onClick={() => {
            setSelected((value) => ({
              ...value,
              collision: false,
              snapped: true,
            }));
            notify("AI opened a 1.08m walkway");
          }}
        >
          <Icon name="spark" size={15} /> Optimize layout
        </Button>
      </section>
      <section className="inspector-sheet">
        <div className="sheet-handle" />
        <div className="inspector-heading">
          <div>
            <span>ATELIER NORD</span>
            <h2>{product.name}</h2>
          </div>
          <strong>{formatMoney(product.price)}</strong>
        </div>
        <div className="object-details">
          <div>
            <span>DIMENSIONS</span>
            <strong>240 × 95 × 78cm</strong>
          </div>
          <div>
            <span>MATERIAL</span>
            <strong>Ivory bouclé</strong>
          </div>
          <div>
            <span>PLACEMENT</span>
            <strong className={state.tone}>
              <Icon name={state.tone === "danger" ? "warning" : "check"} size={12} />
              {state.label.split(" · ")[0]}
            </strong>
          </div>
        </div>
        <div className="transform-row">
          <Button
            onClick={() =>
              setSelected((value) => ({
                ...value,
                rotationY: nextRotation(value.rotationY),
              }))
            }
          >
            <Icon name="rotate" size={17} />
            <span>Rotate {selected.rotationY}°</span>
          </Button>
          <Button
            onClick={() =>
              setSelected((value) => ({
                ...value,
                scale: nextScale(value.scale, "decrease"),
              }))
            }
          >
            <Icon name="minus" size={17} />
            <span>Scale</span>
          </Button>
          <strong>{Math.round(selected.scale * 100)}%</strong>
          <Button
            onClick={() =>
              setSelected((value) => ({
                ...value,
                scale: nextScale(value.scale, "increase"),
              }))
            }
          >
            <Icon name="plus" size={17} />
            <span className="sr-only">Increase scale</span>
          </Button>
        </div>
        <div className="studio-tool-tray">
          {["Furniture", "Materials", "Colors", "Lighting", "Layout", "AI"].map((name) => (
            <Button
              key={name}
              className={tool === name ? "is-active" : ""}
              onClick={() => {
                setTool(name);
                if (name === "AI") notify("AI design assistant is ready");
              }}
            >
              <span>
                <Icon
                  name={
                    name === "Furniture"
                      ? "cube"
                      : name === "Materials"
                        ? "layers"
                        : name === "Colors"
                          ? "palette"
                          : name === "Lighting"
                            ? "sun"
                            : name === "Layout"
                              ? "plan"
                              : "spark"
                  }
                  size={18}
                />
              </span>
              {name}
            </Button>
          ))}
        </div>
        <div className="studio-bottom-actions">
          <Button className="button-secondary" onClick={() => setDebug((value) => !value)}>
            <Icon name="grid" size={15} />
            {debug ? "Hide diagnostics" : "Show diagnostics"}
          </Button>
          <Button className="button-dark" onClick={() => onSelectProduct(product)}>
            View product <Icon name="arrow" size={15} />
          </Button>
        </div>
      </section>
    </div>
  );
}

export function ShopExperience({ onNavigate, onSelectProduct, favorites, onFavorite }: ExperienceProps) {
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(8);
  const activeRoom = mockRooms[1];
  const products = (
    category === "All"
      ? productsForRoom(mockProducts, activeRoom, 80)
      : mockProducts.filter((product) => product.category === category)
  ).slice(0, limit);
  return (
    <div className="scroll-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">CURATED FOR YOUR DESIGN</span>
          <h1>Shop your room</h1>
          <p>Spatially matched pieces with a clear delivery picture.</p>
        </div>
        <IconButton icon="bag" label="Shopping bag" />
      </header>
      <section className="shop-hero">
        <InteriorImage src={activeRoom.image.uri} alt={activeRoom.image.alt} />
        <div className="shop-hero-shade" />
        <div className="shop-hero-top">
          <span>{activeRoom.name}</span>
          <Button onClick={() => onNavigate("ar")}>
            View in AR <Icon name="arrow" size={14} />
          </Button>
        </div>
        {["1", "2", "3"].map((number, index) => (
          <i className={`hotspot hotspot-${index + 1}`} key={number}>
            {number}
          </i>
        ))}
        <div className="shop-hero-bottom">
          <span>
            <Icon name="spark" size={13} /> 8 matched pieces
          </span>
          <strong>Save $374 as a set</strong>
        </div>
      </section>
      <div className="chip-row shop-filters">
        {["All", "Sofas", "Lighting", "Rugs", "Decor", "Tables"].map((entry) => (
          <Button
            key={entry}
            onClick={() => setCategory(entry)}
            className={`filter-chip ${category === entry ? "is-selected" : ""}`}
          >
            {entry}
          </Button>
        ))}
      </div>
      <div className="price-rail">
        <span>Price range</span>
        <Button>Under $500</Button>
        <Button>$500–$1,000</Button>
        <Button>$1,000+</Button>
      </div>
      <SectionHeading title="Designed for your room" action="Sort" />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            favorite={favorites.includes(product.id)}
            onFavorite={() => onFavorite(product.id)}
            onSelect={() => onSelectProduct(product)}
            onAR={() => onNavigate("ar")}
          />
        ))}
      </div>
      {limit < 24 ? (
        <Button className="load-more" onClick={() => setLimit((value) => value + 8)}>
          Load more curated pieces
        </Button>
      ) : null}
    </div>
  );
}

export function ProjectsExperience({ onSecondary, notify }: ExperienceProps) {
  const project = mockProjects[0];
  const budget = projectBudgetSummary(project);
  const [tasks, setTasks] = useState(project.tasks.slice(0, 5));
  return (
    <div className="scroll-screen">
      <header className="page-header">
        <div>
          <span className="eyebrow">{project.name.toUpperCase()}</span>
          <h1>Project overview</h1>
          <p>From design intention to a buildable plan.</p>
        </div>
        <IconButton icon="share" label="Share project" onClick={() => notify("Project link copied")} />
      </header>
      <section className="project-hero">
        <InteriorImage src={project.image.uri} alt={project.image.alt} />
        <div className="project-hero-overlay" />
        <StatusPill tone="success">
          <Icon name="check" size={12} /> {project.status}
        </StatusPill>
        <div>
          <span>OVERALL PROGRESS</span>
          <strong>{project.completion}%</strong>
          <i>
            <b style={{ width: `${project.completion}%` }} />
          </i>
        </div>
      </section>
      <section className="project-metrics">
        <div>
          <span>BUDGET</span>
          <strong>{formatMoney(project.budget)}</strong>
          <small>{formatMoney(budget.remaining)} remaining</small>
        </div>
        <div>
          <span>TIMELINE</span>
          <strong>{project.estimatedDays} days</strong>
          <small>Ends Oct 08</small>
        </div>
        <div>
          <span>TEAM</span>
          <strong>4 people</strong>
          <small>2 contractors</small>
        </div>
      </section>
      <SectionHeading
        title="Plan details"
        action="Construction"
        onAction={() => onSecondary("construction")}
      />
      <div className="plan-grid">
        <div>
          <span className="plan-icon clay">
            <Icon name="layers" size={17} />
          </span>
          <p>Materials</p>
          <strong>Paint 42m²</strong>
          <small>Flooring 18m² · Trim 24m</small>
        </div>
        <div>
          <span className="plan-icon sage">
            <Icon name="cube" size={17} />
          </span>
          <p>Furniture</p>
          <strong>8 items</strong>
          <small>6 ordered · 2 pending</small>
        </div>
        <div>
          <span className="plan-icon sand">
            <Icon name="ruler" size={17} />
          </span>
          <p>Measurements</p>
          <strong>14.2m² room</strong>
          <small>± 2cm confidence</small>
        </div>
        <div>
          <span className="plan-icon ink">
            <Icon name="user" size={17} />
          </span>
          <p>Contractors</p>
          <strong>2 confirmed</strong>
          <small>Install · 3 days</small>
        </div>
      </div>
      <SectionHeading title="Renovation timeline" action={`${project.estimatedDays} days`} />
      <section className="timeline-card">
        <i>
          <b style={{ width: `${constructionProgress(project)}%` }} />
        </i>
        <div>
          {["01", "03", "06", "12", "18"].map((day, index) => (
            <span className={index < 2 ? "done" : ""} key={day}>
              <strong>{day}</strong>
              <small>{["Prep", "Paint", "Floor", "Deliver", "Finish"][index]}</small>
            </span>
          ))}
        </div>
      </section>
      <SectionHeading title="Next tasks" action={`${tasks.length} tasks`} />
      <section className="task-list">
        {tasks.map((task) => (
          <Button
            key={task.id}
            className={`task-row ${task.status === "Done" ? "done" : ""}`}
            onClick={() =>
              setTasks((current) =>
                current.map((item) =>
                  item.id === task.id
                    ? {
                        ...item,
                        status: item.status === "Done" ? "Todo" : "Done",
                        progress: item.status === "Done" ? 0 : 100,
                      }
                    : item,
                ),
              )
            }
          >
            <span className="task-check">
              {task.status === "Done" ? <Icon name="check" size={13} /> : null}
            </span>
            <span>
              <strong>{task.title}</strong>
              <small>
                {task.dueDate} · {task.owner}
              </small>
            </span>
            <Icon name="chevron" size={16} />
          </Button>
        ))}
      </section>
      <SectionHeading title="Cost estimate" />
      <section className="cost-card">
        <div className="cost-donut">
          <span>
            <strong>{formatMoney(project.budget)}</strong>
            <small>planned</small>
          </span>
        </div>
        <div>
          {project.budgetLines.slice(0, 4).map((line, index) => (
            <p key={line.id}>
              <i className={`legend-${index}`} />
              <span>{line.category}</span>
              <strong>{formatMoney(line.planned)}</strong>
            </p>
          ))}
        </div>
      </section>
      <div className="project-actions">
        <Button className="button-secondary" onClick={() => notify("Build plan exported")}>
          {" "}
          <Icon name="download" size={16} /> Export plan
        </Button>
        <Button className="button-secondary" onClick={() => notify("Contractor invite ready")}>
          <Icon name="user" size={16} /> Share contractor
        </Button>
        <Button className="button-dark full" onClick={() => notify("Design finalized for construction")}>
          <Icon name="check" size={16} /> Finalize design
        </Button>
      </div>
    </div>
  );
}

export function SavedExperience({
  favorites,
  onFavorite,
  onSelectProduct,
  onSecondary,
}: Pick<ExperienceProps, "favorites" | "onFavorite" | "onSelectProduct" | "onSecondary">) {
  const saved = mockProducts.filter((product) => favorites.includes(product.id));
  return (
    <div className="secondary-screen">
      <header className="secondary-header">
        <Button className="back-button" onClick={() => onSecondary(null)}>
          <Icon name="arrow" size={18} />
        </Button>
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>Saved designs</h1>
        </div>
      </header>
      {saved.length ? (
        <div className="saved-grid">
          {saved.map((product) => (
            <div className="saved-card" key={product.id}>
              <InteriorImage src={product.image.uri} alt={product.image.alt} />
              <div>
                <span>{product.brand}</span>
                <h3>{product.name}</h3>
                <p>{formatMoney(product.price)}</p>
                <Button className="card-link" onClick={() => onSelectProduct(product)}>
                  View details <Icon name="arrow" size={14} />
                </Button>
              </div>
              <FavoriteButton
                active
                onToggle={() => onFavorite(product.id)}
                label={`Remove ${product.name} from saved`}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="bookmark"
          title="Your collection is ready"
          body="Save furniture, materials, and whole-room directions to compare them here."
          action={
            <Button className="button-dark" onClick={() => onSecondary(null)}>
              Explore the shop
            </Button>
          }
        />
      )}
    </div>
  );
}

export function ConstructionExperience({ onSecondary }: Pick<ExperienceProps, "onSecondary">) {
  const project = mockProjects[0];
  return (
    <div className="secondary-screen">
      <header className="secondary-header">
        <Button className="back-button" onClick={() => onSecondary(null)}>
          <Icon name="arrow" size={18} />
        </Button>
        <div>
          <span className="eyebrow">CONSTRUCTION PLANNING</span>
          <h1>Build-ready scope</h1>
        </div>
      </header>
      <section className="construction-summary">
        <StatusPill tone="warning">
          <Icon name="warning" size={13} /> Planning estimate only
        </StatusPill>
        <h2>{project.name}</h2>
        <p>Based on room scan confidence, layout selections, and your current material plan.</p>
        <div>
          <span>
            <strong>14.2m²</strong> measured area
          </span>
          <span>
            <strong>±2cm</strong> tolerance
          </span>
          <span>
            <strong>{project.estimatedDays} days</strong> target
          </span>
        </div>
      </section>
      <SectionHeading title="Budget lines" />
      <div className="budget-lines">
        {project.budgetLines.map((line) => (
          <div key={line.id}>
            <span className="budget-icon">
              <Icon
                name={line.category === "Labor" ? "user" : line.category === "Materials" ? "layers" : "cube"}
                size={16}
              />
            </span>
            <p>
              <strong>{line.label}</strong>
              <small>{line.category}</small>
            </p>
            <span>
              <strong>{formatMoney(line.planned)}</strong>
              <small>{formatMoney(line.actual)} spent</small>
            </span>
          </div>
        ))}
      </div>
      <SectionHeading title="Site checklist" />
      <div className="checklist">
        <p>
          <Icon name="check" size={16} /> Confirm final wall lengths before ordering
        </p>
        <p>
          <Icon name="check" size={16} /> Verify door and circulation clearances
        </p>
        <p>
          <Icon name="warning" size={16} /> Confirm electrical outlet placement with contractor
        </p>
      </div>
    </div>
  );
}

export function ProfileExperience({
  onSecondary,
  onNavigate,
}: Pick<ExperienceProps, "onSecondary" | "onNavigate">) {
  const [offline, setOffline] = useState(false);
  return (
    <div className="secondary-screen">
      <header className="secondary-header">
        <Button className="back-button" onClick={() => onSecondary(null)}>
          <Icon name="arrow" size={18} />
        </Button>
        <div>
          <span className="eyebrow">ACCOUNT & PREFERENCES</span>
          <h1>Your profile</h1>
        </div>
      </header>
      <section className="profile-card">
        <span className="profile-avatar">A</span>
        <div>
          <h2>Alex Morgan</h2>
          <p>RE:ROOM Pro · Brooklyn, NY</p>
        </div>
        <StatusPill tone="clay">
          <Icon name="spark" size={13} /> Pro
        </StatusPill>
      </section>
      <section className="profile-stats">
        <div>
          <strong>12</strong>
          <span>spaces</span>
        </div>
        <div>
          <strong>{mockProducts.length}</strong>
          <span>catalog pieces</span>
        </div>
        <div>
          <strong>4</strong>
          <span>projects</span>
        </div>
      </section>
      <SectionHeading title="Workspace" />
      <div className="settings-card">
        <Button onClick={() => onSecondary("saved")}>
          <Icon name="bookmark" size={19} />
          <span>
            Saved designs<small>Furniture, palettes & rooms</small>
          </span>
          <Icon name="chevron" size={17} />
        </Button>
        <Button onClick={() => onNavigate("projects")}>
          <Icon name="plan" size={19} />
          <span>
            Construction plans<small>Budgets & project timelines</small>
          </span>
          <Icon name="chevron" size={17} />
        </Button>
        <Button onClick={() => setOffline((value) => !value)}>
          <Icon name={offline ? "wifiOff" : "download"} size={19} />
          <span>
            {offline ? "Offline mode enabled" : "Download room for offline"}
            <small>{offline ? "Mock scenes remain available" : "Keep the active room locally"}</small>
          </span>
          <Icon name="chevron" size={17} />
        </Button>
      </div>
      <SectionHeading title="Accessibility" />
      <div className="settings-card">
        <Button>
          <Icon name="sun" size={19} />
          <span>
            High contrast controls<small>Premium readability baseline</small>
          </span>
          <span className="toggle is-on" />
        </Button>
        <Button>
          <Icon name="clock" size={19} />
          <span>
            Reduce motion<small>Follows device preference</small>
          </span>
          <span className="toggle" />
        </Button>
      </div>
    </div>
  );
}

export function ProductDetail({
  product,
  favorite,
  onFavorite,
  onClose,
  onNavigate,
  notify,
}: {
  product: FurnitureProduct;
  favorite: boolean;
  onFavorite: () => void;
  onClose: () => void;
  onNavigate: (tab: "ar" | "shop") => void;
  notify: (message: string) => void;
}) {
  return (
    <div className="product-detail">
      <div className="detail-visual">
        <InteriorImage src={product.image.uri} alt={product.image.alt} />
        <FavoriteButton
          active={favorite}
          onToggle={onFavorite}
          label={favorite ? "Remove from saved" : "Save product"}
        />
      </div>
      <div className="detail-copy">
        <div className="brand-row">
          <span>{product.brand}</span>
          <strong>
            ★ {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </strong>
        </div>
        <h2>{product.name}</h2>
        <p>
          {product.material} · {product.finish ?? "Natural finish"} · {product.dimensionsCm.width} ×{" "}
          {product.dimensionsCm.depth} × {product.dimensionsCm.height}cm
        </p>
        <h3>{formatMoney(product.price)}</h3>
        <StatusPill tone={product.inStock ? "success" : "warning"}>{productAvailability(product)}</StatusPill>
        <div className="color-row">
          {product.colors.map((color) => (
            <span key={color}>{color}</span>
          ))}
        </div>
        <div className="detail-actions">
          <Button
            className="button-secondary"
            onClick={() => {
              onClose();
              onNavigate("ar");
            }}
          >
            <Icon name="scan" size={16} /> View in AR
          </Button>
          <Button className="button-dark" onClick={() => notify(`${product.name} added to your room`)}>
            <Icon name="plus" size={16} /> Add to room
          </Button>
        </div>
      </div>
    </div>
  );
}

export function RecommendationStrip({ onSecondary }: { onSecondary: (screen: SecondaryScreen) => void }) {
  const recommendations = useMemo(() => mockRecommendations.slice(0, 3), []);
  return (
    <div className="recommendation-strip">
      {recommendations.map((recommendation) => (
        <Button key={recommendation.id} onClick={() => onSecondary("studio")}>
          <Icon name="spark" size={15} />
          <span>
            <strong>{recommendation.title}</strong>
            <small>{Math.round(recommendation.confidence * 100)}% confidence</small>
          </span>
          <Icon name="arrow" size={14} />
        </Button>
      ))}
    </div>
  );
}

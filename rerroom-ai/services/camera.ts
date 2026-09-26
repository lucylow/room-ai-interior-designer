import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";

export * from "./cameraCore";
export interface CameraOptions { facing: "front" | "back"; flash: "off" | "on" | "auto"; zoom: number; quality: number; torch: boolean; }
export const cameraDefaults: CameraOptions = { facing: "back", flash: "auto", zoom: 0, quality: 0.92, torch: false };
export async function ensureCameraPermission() { const current = await Camera.getCameraPermissionsAsync(); if (current.granted) return true; return (await Camera.requestCameraPermissionsAsync()).granted; }
export async function ensureLibraryPermission() { const current = await ImagePicker.getMediaLibraryPermissionsAsync(); if (current.granted) return true; return (await ImagePicker.requestMediaLibraryPermissionsAsync()).granted; }
export function openCameraSettings() { return Linking.openSettings(); }

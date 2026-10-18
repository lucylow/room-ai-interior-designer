import { lazy, Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { BottomNav, Modal, type MainTab } from "@/components/ui";
import {
  ARScannerExperience,
  ConstructionExperience,
  DesignStudioExperience,
  ExploreExperience,
  HomeExperience,
  ProductDetail,
  ProfileExperience,
  ProjectsExperience,
  SavedExperience,
  ShopExperience,
  StudioExperience,
  type SecondaryScreen,
} from "@/features/experiences";
import type { FurnitureProduct } from "@/premium/types/models";
import { PrivacyExperience } from "@/features/privacy-experience";
import { privacyStore } from "@/state/domains/privacy-store";

const FAVORITES_KEY = "reroom-premium-favorites";
const DEFAULT_FAVORITES = ["product-001", "product-004"];

type Toast = { message: string; id: number } | null;

const VisualizationExperience = lazy(() => import("@/features/visualization-experience").then((module) => ({ default: module.VisualizationExperience })));
const RecommendationExperience = lazy(() => import("@/features/recommendation-experience").then((module) => ({ default: module.RecommendationExperience })));
let favoritesStorageWarningShown = false;

function loadFavorites(): { values: string[]; writable: boolean } {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved === null) return { values: DEFAULT_FAVORITES, writable: true };
    const value: unknown = JSON.parse(saved);
    if (!Array.isArray(value) || value.length > 500 || !value.every((id) => typeof id === "string" && id.length > 0 && id.length <= 256)) {
      return { values: DEFAULT_FAVORITES, writable: false };
    }
    return { values: [...new Set(value)], writable: true };
  } catch {
    return { values: DEFAULT_FAVORITES, writable: false };
  }
}

export default function App() {
  const privacy = useSyncExternalStore(privacyStore.subscribe, privacyStore.getSnapshot, privacyStore.getSnapshot);
  const localStorageAllowed = privacy.consent.some((decision) => decision.scope === "local-storage" && decision.granted);
  const [tab, setTab] = useState<MainTab>("home");
  const [secondary, setSecondary] = useState<SecondaryScreen>(null);
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const favoriteWritesAllowed = useRef(false);
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const context = useMemo(
    () => ({
      onNavigate: (next: MainTab) => {
        setSecondary(null);
        setTab(next);
      },
      onSecondary: (screen: SecondaryScreen) => setSecondary(screen),
      onSelectProduct: (product: FurnitureProduct) => setSelectedProduct(product),
      favorites,
      onFavorite: (id: string) => {
        favoriteWritesAllowed.current = true;
        setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
      },
      notify: (message: string) => setToast({ message, id: Date.now() }),
    }),
    [favorites],
  );

  useEffect(() => {
    if (!localStorageAllowed || favoritesLoaded) return;
    const loaded = loadFavorites();
    setFavorites(loaded.values);
    favoriteWritesAllowed.current = loaded.writable;
    setFavoritesLoaded(true);
  }, [localStorageAllowed, favoritesLoaded]);

  useEffect(() => {
    if (!localStorageAllowed || !favoritesLoaded || !favoriteWritesAllowed.current) return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      if (!favoritesStorageWarningShown) {
        console.warn("[RE:ROOM] Favorites could not be saved in this browser session.");
        favoritesStorageWarningShown = true;
      }
    }
  }, [favorites, favoritesLoaded, localStorageAllowed]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const content =
    secondary === "design" ? (
      <DesignStudioExperience {...context} />
    ) : secondary === "studio" ? (
      <StudioExperience {...context} />
    ) : secondary === "saved" ? (
      <SavedExperience {...context} />
    ) : secondary === "profile" ? (
      <ProfileExperience {...context} />
    ) : secondary === "privacy" ? (
      <PrivacyExperience onBack={() => setSecondary("profile")} />
    ) : secondary === "recommendations" ? (
      <Suspense fallback={<div style={{ padding: 24 }}>Loading room recommendations…</div>}>
        <RecommendationExperience onBack={() => setSecondary("design")} onPrivacy={() => setSecondary("privacy")} onOpenVisualization={() => setSecondary("visualization")} />
      </Suspense>
    ) : secondary === "visualization" ? (
      <Suspense fallback={<div style={{ padding: 24 }}>Loading room visualization…</div>}>
        <VisualizationExperience onBack={() => setSecondary("studio")} onPrivacy={() => setSecondary("privacy")} />
      </Suspense>
    ) : secondary === "construction" ? (
      <ConstructionExperience {...context} />
    ) : tab === "home" ? (
      <HomeExperience {...context} />
    ) : tab === "explore" ? (
      <ExploreExperience {...context} />
    ) : tab === "ar" ? (
      <ARScannerExperience {...context} />
    ) : tab === "shop" ? (
      <ShopExperience {...context} />
    ) : (
      <ProjectsExperience {...context} />
    );

  const fullBleed = tab === "ar" && !secondary;
  return (
    <main className="app-stage">
      <div className={`phone-shell ${fullBleed ? "ar-shell" : ""}`}>
        <a className="skip-link" href="#app-content">
          Skip to content
        </a>
        <div id="app-content" className="screen-root">
          {content}
        </div>
        {!secondary ? (
          <BottomNav
            active={tab}
            onChange={(next) => {
              setSelectedProduct(null);
              setTab(next);
            }}
            dark={fullBleed}
          />
        ) : null}
        {selectedProduct ? (
          <Modal title={selectedProduct.name} onClose={() => setSelectedProduct(null)}>
            <ProductDetail
              product={selectedProduct}
              favorite={favorites.includes(selectedProduct.id)}
              onFavorite={() => context.onFavorite(selectedProduct.id)}
              onClose={() => setSelectedProduct(null)}
              onNavigate={context.onNavigate}
              notify={context.notify}
            />
          </Modal>
        ) : null}
        {toast ? (
          <div className="toast" key={toast.id} role="status">
            {toast.message}
          </div>
        ) : null}
      </div>
    </main>
  );
}

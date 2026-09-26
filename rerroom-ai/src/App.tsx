import { useEffect, useMemo, useState } from "react";
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

const FAVORITES_KEY = "reroom-premium-favorites";

type Toast = { message: string; id: number } | null;

function loadFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    const value: unknown = saved ? JSON.parse(saved) : ["product-001", "product-004"];
    return Array.isArray(value) && value.every((id) => typeof id === "string")
      ? value
      : ["product-001", "product-004"];
  } catch {
    return ["product-001", "product-004"];
  }
}

export default function App() {
  const [tab, setTab] = useState<MainTab>("home");
  const [secondary, setSecondary] = useState<SecondaryScreen>(null);
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
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
      onFavorite: (id: string) =>
        setFavorites((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        ),
      notify: (message: string) => setToast({ message, id: Date.now() }),
    }),
    [favorites],
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);
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

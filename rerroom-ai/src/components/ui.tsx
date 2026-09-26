import { useEffect, type ReactNode } from "react";

export type IconName =
  | "home"
  | "explore"
  | "scan"
  | "cube"
  | "bag"
  | "plan"
  | "spark"
  | "arrow"
  | "heart"
  | "heartFill"
  | "bell"
  | "camera"
  | "ruler"
  | "layers"
  | "sun"
  | "plus"
  | "minus"
  | "check"
  | "close"
  | "chevron"
  | "share"
  | "save"
  | "rotate"
  | "sliders"
  | "user"
  | "bookmark"
  | "wifiOff"
  | "grid"
  | "clock"
  | "pin"
  | "search"
  | "download"
  | "palette"
  | "lock"
  | "warning"
  | "expand";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  explore: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4M11 8v6M8 11h6" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
      <path d="M7 12h10M12 7v10" />
    </>
  ),
  cube: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
  plan: (
    <>
      <path d="M6 3h12v18H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
      <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </>
  ),
  arrow: <path d="m9 18 6-6-6-6" />,
  heart: (
    <path d="M20.8 5.8a5.3 5.3 0 0 0-7.5 0L12 7.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z" />
  ),
  heartFill: (
    <path d="M20.8 5.8a5.3 5.3 0 0 0-7.5 0L12 7.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z" />
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7h3l2-3h6l2 3h3v13H4z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  ruler: (
    <>
      <path d="m4 17 13-13 3 3L7 20l-3-3Z" />
      <path d="m14 7 3 3M11 10l2 2M8 13l3 3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  share: (
    <>
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="m8 11 8-5M8 13l8 5" />
    </>
  ),
  save: (
    <>
      <path d="M5 3h12l2 2v16H5z" />
      <path d="M8 3v6h8V3M8 21v-7h8v7" />
    </>
  ),
  rotate: (
    <>
      <path d="M20 11a8 8 0 1 1-2.3-5.7" />
      <path d="M20 4v7h-7" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  bookmark: <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z" />,
  wifiOff: (
    <>
      <path d="m2 2 20 20M8.5 8.5A6 6 0 0 1 16.9 10M5 5a11 11 0 0 1 14 1.5M3 14a13 13 0 0 1 2.1-2.5M12 19h.01" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 19v2h16v-2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.7-2.4 1.9 1.9 0 0 1 1.8-2.6H18A6 6 0 0 0 12 3Z" />
      <circle cx="7.5" cy="11" r=".8" />
      <circle cx="10.5" cy="7.5" r=".8" />
      <circle cx="15" cy="8" r=".8" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  warning: (
    <>
      <path d="m12 3 10 18H2L12 3Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  expand: (
    <>
      <path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled || name === "heartFill" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Button({
  children,
  className = "",
  onClick,
  label,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label} disabled={disabled}>
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  onClick,
  className = "",
  active = false,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}) {
  return (
    <Button
      className={`icon-button ${active ? "is-active" : ""} ${className}`}
      label={label}
      onClick={onClick}
    >
      <Icon name={icon} size={19} />
    </Button>
  );
}

export function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action ? (
        <Button className="text-action" onClick={onAction}>
          {action}
        </Button>
      ) : null}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "clay" | "warning";
}) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: IconName;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <section className="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={23} />
      </span>
      <h2>{title}</h2>
      <p>{body}</p>
      {action}
    </section>
  );
}

export function LoadingCard({ label = "Curating your space" }: { label?: string }) {
  return (
    <div className="loading-card" aria-live="polite">
      <span className="shimmer-block hero-shimmer" />
      <span className="shimmer-block line-shimmer" />
      <span className="shimmer-block short-shimmer" />
      <p>{label}</p>
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="bottom-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <header className="sheet-header">
          <div>
            <span className="eyebrow">DESIGN LIBRARY</span>
            <h2 id="sheet-title">{title}</h2>
          </div>
          <IconButton icon="close" label="Close details" onClick={onClose} />
        </header>
        {children}
      </section>
    </div>
  );
}

export type MainTab = "home" | "explore" | "ar" | "shop" | "projects";
const tabs: { id: MainTab; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explore", label: "Explore", icon: "explore" },
  { id: "ar", label: "Scan", icon: "scan" },
  { id: "shop", label: "Shop", icon: "bag" },
  { id: "projects", label: "Projects", icon: "plan" },
];

export function BottomNav({
  active,
  onChange,
  dark = false,
}: {
  active: MainTab;
  onChange: (tab: MainTab) => void;
  dark?: boolean;
}) {
  return (
    <nav className={`bottom-nav ${dark ? "dark" : ""}`} aria-label="Primary navigation">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          label={`Open ${tab.label}`}
          className={`nav-item ${active === tab.id ? "is-active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">
            <Icon name={tab.icon} size={20} />
          </span>
          <span>{tab.label}</span>
        </Button>
      ))}
    </nav>
  );
}

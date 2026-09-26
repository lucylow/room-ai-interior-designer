export const mockPalettes = Array.from({ length: 36 }, (_, i) => ({
  id: `palette-${i + 1}`,
  name: [
    "Warm Oak + Ivory",
    "Sand + Walnut",
    "Olive + Linen",
    "Stone + Charcoal",
    "Clay + Cream",
    "Mist + Maple",
  ][i % 6],
  colors: [
    ["#F4EEE4", "#D8C7B4", "#9D7D60", "#2A2825"],
    ["#ECE3D6", "#B9A58C", "#704E39", "#252422"],
    ["#EAE5D5", "#B3B79D", "#667054", "#31342F"],
    ["#EDEAE3", "#A7A197", "#55504A", "#252321"],
    ["#EFE3D4", "#C88F6A", "#7F5946", "#332B27"],
    ["#EEF1F0", "#D2D9D0", "#9AA88F", "#2A2E2A"],
  ][i % 6],
  usage: 12 + i * 3,
  roomCount: 1 + (i % 5),
  saved: i % 3 === 0,
}));

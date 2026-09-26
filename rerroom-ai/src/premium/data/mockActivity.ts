export const mockActivity = Array.from({ length: 48 }, (_, i) => ({
  id: `activity-${i + 1}`,
  title: [
    "Updated room palette",
    "Moved coffee table",
    "Added product to room",
    "Saved AR snapshot",
    "Changed lighting mood",
    "Completed measurement",
  ][i % 6],
  detail: [
    "Warm Oak + Ivory",
    "12 cm toward sofa",
    "Mika Oak Coffee Table",
    "Scan #12",
    "Golden hour",
    "North wall",
  ][i % 6],
  time: `${i + 1}m ago`,
  type: ["design", "layout", "shopping", "ar", "lighting", "measurement"][i % 6],
}));

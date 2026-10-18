export interface PlanTheme {
  canvas: string;
  roomFill: string;
  wall: string;
  furniture: string;
  selection: string;
  measurement: string;
  grid: string;
  gridMajor: string;
  label: string;
}

export const LIGHT_PLAN_THEME: PlanTheme = {
  canvas: '#F8F8F6',
  roomFill: '#FFFFFF',
  wall: '#17181B',
  furniture: '#DDE1EA',
  selection: '#4F5BFF',
  measurement: '#7067FF',
  grid: '#E8E9ED',
  gridMajor: '#CFD2DA',
  label: '#17181B',
};

export const DARK_PLAN_THEME: PlanTheme = {
  canvas: '#111318',
  roomFill: '#1B1E25',
  wall: '#F2F3F5',
  furniture: '#343A49',
  selection: '#8B91FF',
  measurement: '#B09DFF',
  grid: '#2B303A',
  gridMajor: '#454B58',
  label: '#F2F3F5',
};

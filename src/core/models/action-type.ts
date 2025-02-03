export enum ActionType {
  None = 0,
  Button,
  ToolbarButton,
}

export const actionTypeColors = [
  "#333", // None
  "#2196F3", // Button
  "#ff3474", // ToolbarButton
];

export const fieldTypeToOptions = (): { label: string; value: string }[] => {
  return Object.keys(ActionType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: ActionType[key],
    }));
};

export const fieldTypeToOptionsWithColors = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(ActionType)
    .filter((key) => isNaN(Number(key)))
    .map((key, index) => ({
      label: key,
      value: ActionType[key],
      color: actionTypeColors[index],
    }));
};

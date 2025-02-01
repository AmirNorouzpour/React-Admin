export enum FieldType {
  Object = 0,
  Text,
  Number,
  RichText,
  DateTime,
  Boolean,
  R1N,
  RNN,
  Enum,
  FileList,
  Picture,
  Report,
  Json,
}

export const fieldTypeColors = [
  "#333", // Object
  "#2196F3", // Text
  "#4CAF50", // Number
  "#673AB7", // RichText
  "#FF9800", // DateTime
  "#F44336", // Boolean
  "#00BCD4", // R1N
  "#009688", // RNN
  "#9C27B0", // Enum
  "#795548", // FileList
  "#E91E63", // Picture
  "#607D8B", // Report
  "#3F51B5", // Json
];

export const fieldTypeToOptions = (): { label: string; value: string }[] => {
  return Object.keys(FieldType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: FieldType[key],
    }));
};

export const fieldTypeToOptionsWithColors = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(FieldType)
    .filter((key) => isNaN(Number(key)))
    .map((key, index) => ({
      label: key,
      value: FieldType[key],
      color: fieldTypeColors[index],
    }));
};

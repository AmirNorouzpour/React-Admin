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

export const fieldTypeToOptions = (): { label: string; value: string }[] => {
  return Object.keys(FieldType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: String(FieldType[key]),
    }));
};

export default interface buttonData {
  id: number;
  label: string;
  type: "primary" | "default" | "dashed" | "text" | "link" | "danger";
  hasConfirm?: boolean;
}

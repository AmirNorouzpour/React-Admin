interface ButtonData {
  id: number;
  label: string;
  type: "primary" | "default" | "dashed" | "text" | "link" | "danger";
  hasConfirm: boolean;
}
export default ButtonData;

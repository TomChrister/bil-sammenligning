export interface ToastProps {
  title?: string;
  children?: React.ReactNode;
  tone?: "neutral" | "success" | "danger";
  onClose?: () => void;
  className?: string;
}
export declare function Toast(props: ToastProps): JSX.Element;

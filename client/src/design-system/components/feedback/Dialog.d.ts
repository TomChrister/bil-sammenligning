/**
 * @startingPoint section="Feedback" subtitle="Dialog, toast, tooltip, skeleton" viewport="700x340"
 */
export interface DialogProps {
  open?: boolean;
  title: string;
  /** Lucide icon at 24px, kobolt. */
  icon?: string;
  children: React.ReactNode;
  /** Action row; put the primary Button last. */
  footer?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}
export declare function Dialog(props: DialogProps): JSX.Element;

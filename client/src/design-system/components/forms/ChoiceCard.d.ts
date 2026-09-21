export interface ChoiceCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  /** One short line explaining the consequence of this answer. */
  description?: string;
  /** Lucide icon name at 20px. */
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
}
export declare function ChoiceCard(props: ChoiceCardProps): JSX.Element;

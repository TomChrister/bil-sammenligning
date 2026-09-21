export interface TabItem { value: string; label: string; icon?: string; count?: number }
export interface TabsProps {
  items: TabItem[];
  /** Active tab value. */
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}
export declare function Tabs(props: TabsProps): JSX.Element;

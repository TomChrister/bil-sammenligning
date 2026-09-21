export interface Reason {
  /** pro = green check, con = amber caution. */
  type?: "pro" | "con";
  /** Full sentence drawn from the user's answers or the vehicle data. */
  text: string;
}
export interface ReasonListProps {
  items: Reason[];
  className?: string;
}
export declare function ReasonList(props: ReasonListProps): JSX.Element;

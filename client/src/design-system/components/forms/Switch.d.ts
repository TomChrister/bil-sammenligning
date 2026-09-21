export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}
export declare function Switch(props: SwitchProps): JSX.Element;

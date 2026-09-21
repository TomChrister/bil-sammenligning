export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
}
export declare function Radio(props: RadioProps): JSX.Element;

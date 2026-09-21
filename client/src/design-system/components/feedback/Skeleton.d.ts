export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  /** >1 renders a stack of text lines, the last one short. */
  lines?: number;
  radius?: number | string;
  pulse?: boolean;
  className?: string;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;

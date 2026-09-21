export interface BreadcrumbItem { label: string; href?: string }
export interface BreadcrumbProps {
  /** Last item should omit `href` — it renders as the current page. */
  items: BreadcrumbItem[];
  className?: string;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;

export interface Links {
  href?: string;
  text?: string;
  onClick?: () => void;
  className: string
  isActive: boolean;
}
export interface UserState {
  [x: string]: any;
  firstName?: string | null;
  email?: string | null;
  roll?: string | null;
}

export interface Links {
  href?: string;
  text: string;
  onClick?: () => void | string;
  isLogout?: boolean;
}

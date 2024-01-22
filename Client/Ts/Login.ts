export interface UserState {
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

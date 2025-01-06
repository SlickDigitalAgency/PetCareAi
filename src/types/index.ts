export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
}
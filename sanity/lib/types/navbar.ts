export interface NavBarSubItem {
  _key: string;
  page: string;
  title: string;
}

export interface NavBarItem {
  _key: string;
  page: string;
  title: string;
  subItems?: NavBarSubItem[];
}

export interface NavBar {
  _id: string;
  items: NavBarItem[];
  primaryButton?: {
    title: string;
    url?: string;
  };
}

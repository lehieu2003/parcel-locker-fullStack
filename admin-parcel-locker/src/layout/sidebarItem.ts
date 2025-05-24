import { ReactNode } from 'react';

export interface SidebarItem {
  icon?: ReactNode | string;
  name: string;
  link: string;
  children?: SidebarItem[];
}

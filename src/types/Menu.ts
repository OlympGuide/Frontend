export interface MenuItem {
  icon: string;
  iconClasses?: string;
  link?: string;
  click?: () => void;
  text: string;
  spacer?: boolean;
}

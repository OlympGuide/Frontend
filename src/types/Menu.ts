export interface MenuItem {
  iconImg?: string;
  icon?: string;
  iconClasses?: string;
  link?: string;
  click?: () => void;
  text: string;
  spacer?: boolean;
}

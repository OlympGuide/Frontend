export interface MenuItem {
  id?: string;
  iconImg?: string;
  icon?: string;
  iconClasses?: string;
  link?: string;
  click?: () => void;
  text: string;
  spacer?: boolean;
  hide?: boolean;
  disabled?: boolean;
  visible?: boolean;
  demo?: boolean;
}

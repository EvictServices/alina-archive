import { 
  MdSecurity, 
  MdBuild, 
  MdSettings, 
  MdInfo, 
  MdSportsEsports, 
  MdWavingHand, 
  MdAutoAwesome, 
  MdList 
} from 'react-icons/md';
import { FaLastfm } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const COPY_FEEDBACK_DURATION = 2000;
export const ITEMS_PER_PAGE = 30;

export const CATEGORY_ICONS: Record<string, IconType> = {
  'All': MdList,
  'Config': MdSettings,
  'Fun': MdWavingHand,
  'Information': MdInfo,
  'Lastfm': FaLastfm,
  'Moderation': MdSecurity,
  'Socials': MdSportsEsports,
  'Utility': MdBuild,
};

export const DEFAULT_CATEGORY_ICON = MdAutoAwesome;

export function getCategoryIcon(category: string): IconType {
  return CATEGORY_ICONS[category] || DEFAULT_CATEGORY_ICON;
}

import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { SvgIconComponent } from "@mui/icons-material";

export interface RoomType {
  id: string;
  label: string;
  Icon: SvgIconComponent;
}

export interface StyleOption {
  id: string;
  label: string;
}

export interface PaletteOption {
  id: string;
  label: string;
  swatch: string[];
}

export const ROOM_TYPES: RoomType[] = [
  { id: "bedroom", label: "Bedroom", Icon: KingBedOutlinedIcon },
  { id: "living", label: "Living Room", Icon: WeekendOutlinedIcon },
  { id: "dining", label: "Dining Room", Icon: DinnerDiningOutlinedIcon },
  { id: "office", label: "Home Office", Icon: LaptopMacOutlinedIcon },
  { id: "all", label: "Whole Home", Icon: HomeOutlinedIcon },
];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: "scandinavian", label: "Scandinavian" },
  { id: "minimalist", label: "Minimalist" },
  { id: "bohemian", label: "Bohemian" },
  { id: "industrial", label: "Industrial" },
  { id: "japandi", label: "Japandi" },
  { id: "cottagecore", label: "Cottagecore" },
];

export const COLOR_PALETTES: PaletteOption[] = [
  { id: "warm", label: "Warm Neutrals", swatch: ["#e8ddd0", "#c9b99a", "#8b7355"] },
  { id: "cool", label: "Cool Tones", swatch: ["#d4dde4", "#a8b8c8", "#5c7a8a"] },
  { id: "dark", label: "Bold & Dark", swatch: ["#2a2a2a", "#444", "#666"] },
  { id: "natural", label: "Natural & Green", swatch: ["#d8e4d0", "#a8c090", "#5a7a50"] },
  { id: "white", label: "Pure White", swatch: ["#ffffff", "#f5f5f3", "#e8e8e4"] },
];

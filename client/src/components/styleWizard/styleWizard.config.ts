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
  { id: "white",  label: "White & Off-White", swatch: ["#ffffff", "#f5f5f0", "#e8e8e2"] },
  { id: "beige",  label: "Beige & Warm",      swatch: ["#f0e8d8", "#d4b896", "#b08060"] },
  { id: "grey",   label: "Grey & Cool",       swatch: ["#e4e4e4", "#a8a8a8", "#606060"] },
  { id: "dark",   label: "Black & Dark",      swatch: ["#2a2a2a", "#444444", "#666666"] },
  { id: "oak",    label: "Oak & Natural Wood",swatch: ["#d4aa78", "#b8895a", "#8b6240"] },
  { id: "pine",   label: "Pine & Light Wood", swatch: ["#e8d4b0", "#c8a870", "#a07840"] },
];

import { createContext } from "react";
import type { ImageContextType } from "./types";

const ImageOpen = createContext<ImageContextType | null>(null);

export { ImageOpen };

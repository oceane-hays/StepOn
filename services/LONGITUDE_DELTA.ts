import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {Dimensions} from "react-native";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
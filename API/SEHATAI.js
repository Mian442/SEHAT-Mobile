import axios from "axios";
import { AIUrl } from "../config/Config";

export default axios.create({
  baseURL: AIUrl,
});

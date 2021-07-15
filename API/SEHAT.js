import axios from "axios";
import { Url } from "../config/Config";

export default axios.create({
  baseURL: Url,
});

import axios from "axios";
import {SERVER_URL} from "@/utils/Properties";

const HTTP = axios.create({
    baseURL: SERVER_URL
});
export default HTTP;


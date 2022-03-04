import axios from "axios";
import {SERVER_URL} from "@/utils/Properties";
import {getHeaders} from "@/utils/AuthHeader";

const HTTP = axios.create({
    baseURL: SERVER_URL,
    headers: getHeaders()
});
export default HTTP;


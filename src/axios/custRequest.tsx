import axios, {AxiosInstance} from "axios";
import { HOST } from "./vars";


export const axiosInstance = axios.create(
        {
            baseURL: HOST,
            headers: {
                "Content-Type": "application/json",
            }
        }
)


export const addRequest = async(api:string, data:any, instance: AxiosInstance) =>
    {
        const res = await instance.post<any>(
            api, data
        )
    return res.data;

}

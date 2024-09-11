import axios, {AxiosInstance} from "axios";
const APIURL = "";
const TESTKEY = "supersecrettoken_for_user1";


export const axiosInstance = axios.create(
        {
            baseURL: APIURL,
            headers: {
                "Content-Type": "application/json",
                Authorization : TESTKEY,
                "x-auth" : TESTKEY,
                // token: ""
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

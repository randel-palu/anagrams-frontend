import axios from "axios";
import { CONFIG } from "../../config";

export const Login = async(details) => {
    try {
        const res = await axios.post(CONFIG.LOGIN_ENDPOINT, { email: details.email, password: details.password });

        if(res.status === 200 && res.data.token){
            return {
                'user': {
                    'email': details.email,
                    'token': res.data.token
                },
                'status': true
            }
        }

        return {
            'status': false
        }
    } catch (error) {
        console.log(error);

        return {
            'status': false
        }
    }
};
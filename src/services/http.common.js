import axios from "axios";
export default axios.create({
        baseURL: 'http://190.117.70.171:30000/api',
        //baseURL: 'http://localhost:3000/api',
        headers: {'Content-type': 'application/json'}
    }
)

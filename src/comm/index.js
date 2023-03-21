import axios from 'axios';

const HOST_URL = 'http://localhost:8080'

export async function postData(data = {}, url=''){
    try {
        const response = await axios.post(`${HOST_URL}${url}`, data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

}
     
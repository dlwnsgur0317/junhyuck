import axios from 'axios';
import { createContext } from 'react';

export const AuthContext =createContext()

const HOST_URL = 'http://localhost:8080'

export async function postData(data = {}, url=''){
    try {
        const response = await axios.post(`${HOST_URL}${url}`, data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        console.log('아이디 혹은 비밀번호가 틀립니다')
    }

}

export async function getData(name, url){
    try{
        const response = await axios.get(`${HOST_URL}${url}`, name)
        const cookieValue = response.data["connect.sid"];
        console.log(cookieValue)
    } catch (error) {
        console.error(error)    
    }
}

export async function postId(id, url){
    try{
        const response = await axios.post(`${HOST_URL}${url}`, id)
        return response.data
    } catch (error) {
        console.error(error)    
    }
}
     
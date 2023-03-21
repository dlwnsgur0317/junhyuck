import { postData } from "../comm"


//테스트용
export const test = async (data) => {
    return await postData(data, '/data')
} 

//로그인시
export const postLogin = async(data) => {
    return await postData(data, '/login')
}


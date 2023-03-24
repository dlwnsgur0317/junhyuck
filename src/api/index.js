import { getData, postData } from "../comm"

//테스트용
export const test = async (data) => {
    return await postData(data, '/data')
} 

//로그인시
export const postLogin = async(data) => {
    return await postData(data, '/login')
}

//쿠키 가져오기
export const getCookie = async(name) => {
    return await getData(name, 'api/get-cookie')
}

// 회원가입
export const postMembership = async(data) => {
    return await postData(data, '/joinMember')
}

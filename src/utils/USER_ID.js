import { v4 as uuidv4 } from 'uuid';

export const SET_UERID = ()=>{
    let userId = localStorage.getItem('USERTEMPID');
    if(!userId){
        // 本地没有uuid先生成，并存储在本地
        userId = uuidv4();
        localStorage.setItem('USERTEMPID',userId)
    }
    return userId
}
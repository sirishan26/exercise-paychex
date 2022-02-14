import axios from "axios";
import {User} from '../Interfaces/user'


export function getUsers(){
    return axios({
        method: 'GET',
        url: `http://localhost:8080/api/users`
    })
}

export function getUserByUserName(userName: string){
    return axios({
        method: 'GET',
        url: `http://localhost:8080/api/users/` + userName
    })
}

export function createUSer(userData: User){
    return axios({
        method: 'POST',
        url: `http://localhost:8080/api/users`,
        data: userData
    })
}

export function updateUserShiftStatus(userName: string, status: string){
    return axios({
        method: 'PATCH',
        url: `http://localhost:8080/api/users/${userName}/${status}`
    })
}

export const shiftStatusOptions = {
    IN_SHIFT: 'shift',
    IN_LUNCH: 'lunch',
    IN_BREAK: 'break',
    NOT_IN_SHIFT: 'none'
}
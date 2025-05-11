import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import { authTokens } from "./type";

export function tokenExpiration(authTokens: authTokens){
    if(!authTokens) return true

    // BUG 1. Need to fix the logic at a crictical time
    const user=jwtDecode(authTokens.access)
    const isExpired=user.exp ? dayjs.unix(user.exp).diff(dayjs()) < 40000 : true

    return isExpired
}
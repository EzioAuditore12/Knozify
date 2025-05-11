export type authStoreType={
    authTokens:({
        access:string,
        refresh:string
    } |  null),
    logoutUser:()=>void,
    user:({
        user_id:string 
    } | null),
    tokensReGenerate:()=>Promise<boolean>
    isTokenExpired:()=>boolean
}

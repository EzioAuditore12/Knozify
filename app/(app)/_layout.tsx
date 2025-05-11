import { Redirect, Stack } from "expo-router"
import { authStore } from "@/store"

const Layout = () => {
    const {user}=authStore.getState()
    if(!user){
        return <Redirect href={"/(auth)/login"}/>
    }
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    </Stack>
  )
}

export default Layout
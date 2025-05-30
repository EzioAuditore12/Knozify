import { Text } from "@/components/ui"
import {View} from "react-native"

//component
import { UserNameForm } from "@/modules/auth/register/components/step4UsernameForm"

//hook
import { checkUsernameHook } from '@/modules/auth/register/hooks/checkUsernameHook'

export default function Step4(){
    return <UserNameForm
    handleSubmit={checkUsernameHook}
  />
}
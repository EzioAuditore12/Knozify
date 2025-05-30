import { Text } from "@/components/ui"
import {View} from "react-native"

//component
import { UserDetailForm } from "@/modules/auth/register/components/step3UserDetails"

//hook
import { suggestUsernames } from '@/modules/auth/register/hooks/suggestUsernameHook'

export default function Step3(){
    return <UserDetailForm
  handleSubmit={suggestUsernames}
  />
}
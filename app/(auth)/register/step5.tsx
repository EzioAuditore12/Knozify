import { Text } from "@/components/ui"
import {View} from "react-native"

//component
import { UserCredentialForm } from "@/modules/auth/register/components/step5UserCredentials"

//hook
import { finalizeRegisteration } from '@/modules/auth/register/hooks/finalizeRegister'

export default function Step5(){
   return <UserCredentialForm
  handleSubmit={finalizeRegisteration}
  />
}
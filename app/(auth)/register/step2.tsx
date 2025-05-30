import { Text } from "@/components/ui"
import {View} from "react-native"

//component
import { ValidateOTPForm } from "@/modules/auth/register/components/step2ValidateOTP"

//hook
import { validateOTPHandler } from '@/modules/auth/register/hooks/validateOTPHook'

export default function Step2(){
   return <ValidateOTPForm
        handleSubmit={validateOTPHandler}
  />
}
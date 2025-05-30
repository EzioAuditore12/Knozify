import { Text } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";

//component
import { PhoneNumberForm } from "@/modules/auth/register/components/step1PhoneValidation";

//hook
import { useRegisterFormHook } from '@/modules/auth/register/hooks'

export default function RegisterationStep1(){
   const {sendOTP}=useRegisterFormHook()
  return <PhoneNumberForm
          handleSubmit={sendOTP}
  />
}
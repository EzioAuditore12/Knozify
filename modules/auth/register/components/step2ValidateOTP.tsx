import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { View } from 'react-native';
import { type validateOTPProps } from '../services/validateOTP';
import { registerStateStore } from '../store';
const validateOTPFormSchema=registerSchema.pick({
  otp:true
})

interface ValidateOTPProps{
  handleSubmit:({phone_no,otp}:validateOTPProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function ValidateOTPForm({handleSubmit}:ValidateOTPProps) {

  const [error,setError]=useState<string | undefined>("")

   const phoneNumber=registerStateStore((state)=>state.contact)

  const registerForm = useAppForm({
    defaultValues: {
      otp:""
    },
    validators: {
      onChange: validateOTPFormSchema,
    },
    onSubmit:async({value})=>{
      console.log({
        ...value,
        phoneNumber
      })

  
      const response=await handleSubmit({phone_no:phoneNumber ?? '', otp:value.otp})
      if(!response.status){
        setError(response?.message)
      }
    }
  });

  return (
    <View className='p-2 flex-1 flex-col justify-center items-center'>
      <Text className='mb-5'>OTP Form</Text>
      <View 
      className='flex-1 flex-col gap-y-4 w-full px-5 max-w-[400px]' 
      >
        <registerForm.AppField
          name="otp"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='OTP'
            />
          )}
        />
        <registerForm.AppForm>
          <registerForm.SubmitButton
          title={"Next"}
          className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
        </registerForm.AppForm>
      </View>
      {error && <Text intent={"destructive"}>{error}</Text>}
    </View>
  );
}
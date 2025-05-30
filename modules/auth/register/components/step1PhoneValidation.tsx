import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { View } from 'react-native';
import { sendOTPApiPros} from '../services/sendOTP';
import { registerStateStore } from "../store";

const phoneNumberFormSchema=registerSchema.pick({
  contact:true
})

interface PhoneFormProps{
  handleSubmit:({phone_no}:sendOTPApiPros)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function PhoneNumberForm({handleSubmit}:PhoneFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const {setData}= registerStateStore()

  const registerForm = useAppForm({
    defaultValues: {
      contact: ""
    },
    validators: {
      onChange: phoneNumberFormSchema,
    },
    onSubmit:async({value})=>{
      // TODO:For now made it for indian people , need to change this concept in future
            console.log(value.contact)
      const response=await handleSubmit({phone_no:value.contact})

      if(response.status){
        setData({ contact: value.contact })
      }
      else{
        setError(response?.message)
      }
    }
  });

  return (
    <View className='p-2 flex-1 flex-col justify-center items-center'>
      <Text size={"xl"} className='mb-5'>Phone form</Text>
      <View
      className='flex flex-col gap-y-4 w-full' 
      >
        {/* TODO: Need to add phone input component here*/}
        <registerForm.AppField
          name="contact"
          children={(field) => (
            <field.TextField
            className='w-full rounded-2xl'
            placeholder='Enter your phone number'
            keyboardType="number-pad"
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
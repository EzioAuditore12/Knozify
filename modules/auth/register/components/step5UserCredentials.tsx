import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { View } from 'react-native';
import { type registerAPIProps } from '../services/finalRegister';
import { registerStateStore } from "../store";

const UserCredentialFormSchema=registerSchema.pick({
  password:true
})

interface UserCredentialsFormProps{
  handleSubmit:({username,password,first_name,last_name,contact}:registerAPIProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function UserCredentialForm({handleSubmit}:UserCredentialsFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const userName=registerStateStore((state)=>state.username)
  const phoneNumber=registerStateStore((state)=>state.contact)
  const firstName=registerStateStore((state)=>state.first_name)
  const lastName=registerStateStore((state)=>state.last_name)

  const registerForm = useAppForm({
    defaultValues: {
      password:"",
    },
    validators: {
      onChange: UserCredentialFormSchema,
    },
    onSubmit:async({value})=>{
      console.log(userName,phoneNumber,firstName,lastName,phoneNumber)
      const response=await handleSubmit({
        username:userName ?? "",
        contact:phoneNumber ?? "",
        first_name:firstName ?? "",
        last_name:lastName ?? "",
        password:value.password
      })
      if(!response.status){
          setError(response?.message)
      }
    }
  });

  return (
<View className='p-2 flex-1 flex-col justify-center items-center'>
      <Text className='mb-5'>Phone Form</Text>
      <View
      className='flex-1 flex-col gap-y-4 w-full' 
      >

         <registerForm.AppField
          name="password"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='Password'
              secureTextEntry
            />
          )}
        />
        <registerForm.AppForm>
          <registerForm.SubmitButton
          title={"Register"}
          className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
        </registerForm.AppForm>
      </View>
      {error && <Text intent={"destructive"}>{error}</Text>}
    </View>
  );
}
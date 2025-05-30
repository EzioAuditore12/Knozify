import { useAppForm } from '@/hooks/useFormHook'
import { registerSchema } from '../schema/registerSchema'
import { useState } from 'react';
import { Text } from '@/components/ui';
import { View } from 'react-native';
import { type checkUsernameProps } from '../services/checkUsername';
import { registerStateStore } from "../store";

const UserNameFormSchema=registerSchema.pick({
  username:true,
})

interface UserCredentialsFormProps{
  handleSubmit:({username}:checkUsernameProps)=>Promise<{
    status:boolean,
    message?:string,
  }>
}


export function UserNameForm({handleSubmit}:UserCredentialsFormProps) {

  const [error,setError]=useState<string | undefined>("")

  const {setData}= registerStateStore()

  const registerForm = useAppForm({
    defaultValues: {
      username:"",
    },
    validators: {
      onChange: UserNameFormSchema,
    },
    onSubmit:async({value})=>{
      const response=await handleSubmit({
        username:value.username
      })
      if(response.status){
        setData({
          username:value.username,
        })
      }
      else{
        setError(response?.message)
      }
    }
  });

  return (
<View className='p-2 flex-1 flex-col justify-center items-center'>
      <Text className='mb-5'>Username</Text>
      <View
      className='flex-1 flex-col gap-y-4 w-full' 
      >
        <registerForm.AppField
          name="username"
          children={(field) => (
            <field.TextField
              className='w-full rounded-2xl'
              placeholder='User Name'
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
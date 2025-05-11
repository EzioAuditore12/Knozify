import { View, Text } from 'react-native'
import { useAppForm } from '@/hooks/useFormHook'
import {z} from 'zod'

const UserSchema=z.object({
  name:z
       .string()
       .regex(/^[A-Z]/,"Name must start with a capital letter")
       .min(3,"Name must be 3 characters long"),
  surname:z
       .string()
       .min(3, "Surname must be at least 3 characters long")
       .regex(/^[A-Z]/, "Surname must start with a capital letter"),
  isAcceptingTerms: z.boolean().refine((val) => val, {
        message: "You must accept the terms and conditions",
      }),
  email: z.string().email("Invalid email address")
})

type User=z.infer<typeof UserSchema>

const defaultUser={
  name:"",
  surname:"",
  isAcceptingTerms:false,
  email:""
} as User

const Profile = () => {
  const form=useAppForm({
    defaultValues: defaultUser,
    validators: {
      onChange: UserSchema
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted", value)
    }
  })
  return (
    <View className='flex-col gap-2 w-[400px] p-2'>
      <form.AppField
      name='name'
      children={(field) => (
        <field.TextField
          labelName='Name'
          className='rounded-2xl border-red-500 focus:border-purple-700'
        />
      )}
      />
      <form.AppField
      name='surname'
      children={(field) => (
        <field.TextField
          labelName='Surname'
          className='rounded-2xl border-red-500 focus:border-purple-700'
        />
      )}
      />
      <form.AppField
      name='email'
      children={(field) => (
        <field.TextField
          labelName='Email'
          className='rounded-2xl border-red-500 focus:border-purple-700'
        />
      )}
      />
      
       <form.AppField
        name="isAcceptingTerms"
        children={(field) => (
          <field.CheckBoxField 
          label="I accept the terms and conditions"
          />
        )}
      />
      <form.AppForm>
        <form.SubmitButton
        title={"Submit"}
        className="disabled:bg-gray-600"
        />
      </form.AppForm>

    </View>
  )
}

export default Profile
import { View} from 'react-native'
import { Text,LegendText,Button } from '@/components/ui'

//schema
import { loginSchema } from '../schema/LoginSchema'

//type
import { loginUserObject } from '../types/userLoginType'

//Form Hook
import { useAppForm } from '@/hooks/useFormHook'

//Hello Wave
import { HelloWave } from '@/components/HelloWave'
import { router } from 'expo-router'


type LoginFormProps = {
  onSubmit: (data: { username: string; password: string }) => Promise<void>
  error?: string
}

const LoginForm = ({onSubmit,error}:LoginFormProps) => {
  const loginForm=useAppForm({
    defaultValues:loginUserObject,
    validators:{
      onChange:loginSchema
    },
    onSubmit:async({value})=>{
     await onSubmit({ username: value.username, password: value.password })
    }
  })
  return (
    <View 
    className='flex-1 justify-around rounded-t-3xl
                bg-white dark:bg-gray-900 
                p-2 px-10 gap-y-4 
                '>

      {/* Login Form Header */}
      <View className='flex-col gap-y-2'>           
      <Text
      className='text-3xl font-bold self-start relative'
      style={{
        fontFamily:"MerriWeather"
      }}
      >
        Welcome Back <HelloWave/>
      </Text>
      <Text
      intent={"secondary"}
      className='self-start'
      >
        Fill your identity to login
      </Text>
      </View> 

      {/* Login Form Inputs */}
      <View className='gap-y-5 '>
      <loginForm.AppField
      name="username"
      children={(field) => (
        <field.TextField
        className='w-full'
        placeholder='Username'
        />
      )}
      />

      <loginForm.AppField
      name="password"
      children={(field) => (
        <field.TextField
        placeholder='Password'
        secureTextEntry
        className='w-full'
        />
      )}
      />
      <Text
      className='text-blue-400 dark:text-blue-500 self-end'
      >
        Forget Password ?
      </Text>

      <loginForm.AppForm>
        <loginForm.SubmitButton
        title={"Login"}
        className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
      </loginForm.AppForm>

      </View>

      {error ? <Text intent={"destructive"}>{error}</Text> : null}

      {/* Oauth */}
      <View className='flex-col gap-y-2'>
        <LegendText
        textName='Or login with'
        />

        <View className='flex-row max-w-[250px] gap-x-4 mx-auto'>

          <Button>
            <Text className='text-white'>G</Text>
          </Button>

          <Button>
            <Text className='text-white'>F</Text>
          </Button>

        </View>

        <Button
          className='rounded-md bg-green-500'
          onPress={()=>{
            router.push("/(auth)/register")
          }}
          >
            <Text>Go to registeration</Text>
        </Button>

      </View>


    </View>
  )
}

export default LoginForm
// TODO : Need to head login header here
import { View, Text, ViewProps } from 'react-native'
import { cn } from '@/utils/tailwind-cn'

type LoginHeaderProps ={
  className:string,
} & ViewProps



const LoginHeader = ({
  className,
  ...props
}:LoginHeaderProps) => {
  return (
    <View className={cn('bg-red-500',className)}
    {...props}
    >
      
    </View>
  )
}

export default LoginHeader
import { View, Text,TouchableOpacity, TextInput } from 'react-native'
import {useState} from 'react'
import { authStore } from '@/store'
import { router } from 'expo-router'
import { LoginUser } from '@/modules/auth/login/hooks/loginUser'

const SignIn = () => {
    const [username,setUsername]=useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');

    const {user}=authStore.getState()
    
    const handleSubmit=async()=>{
        const result = await LoginUser(username, password);
    
        if (result.success) {
          router.replace('/')
        } 
        else{
          setError(result.message || '')
        }
      }

  return (
    <View style={{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white',fontSize:30}}>{user ? "Auth" : "No auth"}</Text>
      {error ? <Text style={{color:'yellow'}}>{error}</Text> : null}
      <Text>{user?.user_id}</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: 'white',
          color: 'black',
          width: 250,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: 'white',
          color: 'black',
          width: 250,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={{marginTop:10,backgroundColor:'blue',borderRadius:40,padding:20}}
        onPress={handleSubmit}
      >
        <Text style={{color:'white'}}>Click me to true</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn
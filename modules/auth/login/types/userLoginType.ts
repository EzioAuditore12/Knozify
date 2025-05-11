import {z} from 'zod'
import { loginSchema } from '../schema/LoginSchema'

type loginUserObjectProps=z.infer<typeof loginSchema>

export const loginUserObject={
    username:"",
    password:""
} as loginUserObjectProps
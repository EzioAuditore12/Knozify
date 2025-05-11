import {z} from 'zod'

export const loginSchema=z.object({
    username:z
             .string()
             .regex(
             /^[^ ,]+$/,
            "Username must not contain spaces or comma or be blank"
             ),
    password:z
             .string()
             /*
             .regex(
             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
             "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
             )*/
})
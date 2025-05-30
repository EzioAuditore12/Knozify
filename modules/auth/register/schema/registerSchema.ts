import {z} from 'zod'

//TODO: Need to add better regex in registeration
export const registerSchema=z.object({
    username:z
             .string()
             .regex(
             /^[^ ,]+$/,
            "Username must not contain spaces or comma or be blank"
             ),
    password:z
             .string()
             .regex(
             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
             "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
             ),
    first_name:z
               .string()
               .regex(
                /^[A-Z][a-zA-Z]*$/,
                "First name must start with a capital letter and contain only letters"
               ),
    last_name:z
              .string()
              .regex(
                /^[A-Z][a-zA-Z]*$/,
                "Last name must start with a capital letter and contain only letters"
              ),
    contact:z
            .string()
            .nonempty(),
         
    birth_date:z
               .string(),
    otp:z.string()
})

export type registerSchemaType=z.infer<typeof registerSchema>
import { z } from "zod"

const passwordValidation = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
)

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation, {
        message: 'Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special and be 8-16 characters'
    })
})

export type registerSchema = z.infer<typeof registerSchema>
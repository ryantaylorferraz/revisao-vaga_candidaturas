import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(8)
})

export type TUser = z.infer<typeof userSchema>

export const userRegisterBodySchema = userSchema.omit({id: true})

export type TUserRegisterBody = z.infer<typeof userRegisterBodySchema>

export const userLoginBodySchema = userRegisterBodySchema.omit({name: true})

export type TUserLoginBodySchema = z.infer<typeof userLoginBodySchema>

export const userReturnSchema = userSchema.omit({password: true})

export type TUserReturnSchema = z.infer<typeof userReturnSchema>

export type TUserLoginReturn = {
    accessToken: string,
    user: TUserReturnSchema
}
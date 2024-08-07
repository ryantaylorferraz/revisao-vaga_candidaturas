import { injectable } from "tsyringe";
import {
  TUserLoginBodySchema,
  TUserLoginReturn,
  TUserRegisterBody,
  TUserReturnSchema,
  userReturnSchema,
} from "../schemas/userSchema";
import { compare, hash } from "bcrypt";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices {
  public register = async (
    body: TUserRegisterBody
  ): Promise<TUserReturnSchema> => {
    const hashPassword = await hash(body.password, 10);
    const newUser = {
      ...body,
      password: hashPassword,
    };
    const data = await prisma.user.create({
      data: newUser,
    });

    return userReturnSchema.parse(data);
  };

  public login = async (body: TUserLoginBodySchema): Promise<TUserLoginReturn> => {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!user) {
      throw new AppError(404, "User not registered.");
    }
    const comparePassword = await compare(body.password, user.password);
    if (!comparePassword) {
      throw new AppError(404, "Email and Password doesn't match.");
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.EXPIRES_IN,
        subject: user.id.toString()
    })

    return {accessToken: token, user: userReturnSchema.parse(user)};
  };

  public getUser = async (id: number): Promise<TUserReturnSchema> => {
    const user = await prisma.user.findFirst({
        where: {id}
    })
    return userReturnSchema.parse(user)
  };
}

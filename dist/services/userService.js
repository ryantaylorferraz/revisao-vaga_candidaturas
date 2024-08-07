"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const tsyringe_1 = require("tsyringe");
const userSchema_1 = require("../schemas/userSchema");
const bcrypt_1 = require("bcrypt");
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserServices = class UserServices {
    constructor() {
        this.register = (body) => __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield (0, bcrypt_1.hash)(body.password, 10);
            const newUser = Object.assign(Object.assign({}, body), { password: hashPassword });
            const data = yield prisma_1.prisma.user.create({
                data: newUser,
            });
            return userSchema_1.userReturnSchema.parse(data);
        });
        this.login = (body) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({
                where: { email: body.email },
            });
            if (!user) {
                throw new appError_1.AppError(404, "User not registered.");
            }
            const comparePassword = yield (0, bcrypt_1.compare)(body.password, user.password);
            if (!comparePassword) {
                throw new appError_1.AppError(404, "Email and Password doesn't match.");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.EXPIRES_IN,
                subject: user.id.toString()
            });
            return { accessToken: token, user: userSchema_1.userReturnSchema.parse(user) };
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({
                where: { id }
            });
            return userSchema_1.userReturnSchema.parse(user);
        });
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);

import { Schema,model } from 'mongoose'

export interface IUser{
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    role: string
}

const userSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: 'user'}
})

export default model<IUser>('User', userSchema)
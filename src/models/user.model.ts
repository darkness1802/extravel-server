import { Schema, model, connect } from 'mongoose';

export interface IUser {
  username: string
  password: string
  email: string

}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = model<IUser>('User', userSchema);

export default User
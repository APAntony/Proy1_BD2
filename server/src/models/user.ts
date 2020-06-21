import {model, Schema, Document} from 'mongoose'
import { type } from 'os'
import bcrypt from 'bcrypt';

export interface UserInterface extends Document{
    email: string,
    password: string
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

//metodo que cifra el password de un nuevo usuario
userSchema.pre<UserInterface>('save', async function(next){
    const newUser = this;
    if(!newUser.isModified('password'))  return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt)
    newUser.password = hashedPassword;
    next();
});

//compara la contraseña ingresada con la guardada
userSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
   return  await bcrypt.compare(password, this.password);
} 

export default model<UserInterface>('User',userSchema);
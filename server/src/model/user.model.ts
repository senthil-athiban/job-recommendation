import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value: string) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

userSchema.methods.isPasswordMatch = async function (password: string) {
    const user = this;
    return bcryptjs.compare(password, user.password);
  };

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
})
const User = model('User', userSchema);
export default User;
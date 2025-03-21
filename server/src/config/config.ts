import { config } from 'dotenv';
config();

export const PORT = process.env.PORT!;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const emailConfig = {
    from : process.env.EMAIL_FROM!
}

export const domains = {
    backend: process.env.BACKEND_DOMAIN!,
    client: process.env.CLIENT_DOMAIN!
}
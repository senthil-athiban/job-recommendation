console.log('process.env.BACKEND_DOMAIN:', process.env.NEXT_PUBLIC_BACKEND_DOMAIN)
export const domains = {
    BACKEND: process.env.NEXT_PUBLIC_BACKEND_DOMAIN!,
    CLIENT: process.env.NEXT_PUBLIC_CLIENT_DOMAIN!,
}
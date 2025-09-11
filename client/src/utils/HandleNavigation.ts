import { decodeToken } from "./DecodedToken"

export function handleNavigate(token: string): string {
   const isAdmin = decodeToken(token)
    if (isAdmin) {
        return "/admin"
    }
    else {
        return "/"
    }
}
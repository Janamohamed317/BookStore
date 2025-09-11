import { jwtDecode } from "jwt-decode";
import type { decodedToken } from "../types/ProtectedRoutes";

export function decodeToken(token: string): boolean {
  const decoded = jwtDecode<decodedToken>(token)

  if (decoded.isAdmin) {
    return true
  }
  else {
    return false
  }
}
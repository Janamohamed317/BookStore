import type { JSX } from "react"

export interface decodedToken {
    isAdmin: boolean
}

export interface ProtectedRoutesProps {
    children: JSX.Element
}
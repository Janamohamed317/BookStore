
export function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("cart")

}
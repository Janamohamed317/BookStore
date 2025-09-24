import axios from "axios"
import type { Signin, Signup, UpdatedUser, User } from "../types/User"
import { validateData } from "../utils/SignUpValidation"



export const deleteUser = async (userId: string) => {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:5000/api/users/remove/${userId}`,
        {
            headers:
            {
                token: token
            }
        }
    )
}

export const blockOrUnblockUser = async (user: User) => {
    const token = localStorage.getItem("token")
    if (user.blocked) {
        await axios.put(`http://localhost:5000/api/users/unblock/${user._id}`,
            {},
            { headers: { token } }
        )
    }
    else {
        await axios.put(`http://localhost:5000/api/users/block/${user._id}`,
            {},
            { headers: { token } }
        )
    }
}

export const fetchUsers = async (blocked: string) => {
    const token = localStorage.getItem("token")
    const url = blocked === " " ? "http://localhost:5000/api/users" : `http://localhost:5000/api/users?blocked=${blocked}`
    const { data } = await axios.get<User[]>(url,
        {
            headers:
            {
                token: token
            }
        }
    );
    return data;
};

export const getUserInfo = async () => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`
        , {
            headers: {
                token: token
            }
        })
    return res.data
}

export const updateUserInfo = async (updatedData: UpdatedUser) => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    return await axios.put(`http://localhost:5000/api/users/edit/${userId}`,
        updatedData,
        {
            headers:
            {
                token: token
            }
        }
    )
}


export const signin = async (formData: Signin) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
    });
    return res.data;
}

export const signup = async (formData: Signup) => {
    if (validateData(formData)) {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        });
        return res.data;
    }
}

export const resetPassword = async (id: string, password: string, token: string) => {
    return await axios.post(
        `http://localhost:5000/api/password/reset-password/${id}/${token}`,
        { password }
    );
}

export const verifyLink = async (id: string, setInvalid: any, token: string) => {
    try {
        await axios.get(`http://localhost:5000/api/password/reset-password/${id}/${token}`);
    } catch {
        setInvalid(true)
        console.log(token);

    }
}

export const forgetPassword = async (email: string) => {
    return await axios.post(
        "http://localhost:5000/api/password/forgot-password",
        { email }
    );
}

export const searchForUser = (searchedUser: string, data?: User[]) => {
    if (!data) {
        return []
    }
    if (searchedUser.trim() === "") {
        return data
    }
    searchedUser.toLowerCase()
    return data.filter((user) => user.username.toLowerCase().includes(`${searchedUser}`))
}
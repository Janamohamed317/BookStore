import axios from "axios"
import type { Signin, Signup, User } from "../types/User"
import { validateData } from "../utils/SignUpValidation"

const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")

export const deleteUser = async (userId: string) => {
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
    if (user.blocked) {
        await axios.put(`http://localhost:5000/api/users/unblock/${userId}`,
            {},
            { headers: { token } }
        )
    }
    else {
        await axios.put(`http://localhost:5000/api/users/block/${userId}`,
            {},
            { headers: { token } }
        )
    }
}

export const fetchUsers = async () => {
    const { data } = await axios.get<User[]>("http://localhost:5000/api/users",
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
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`
        , {
            headers: {
                token: token
            }
        })
    return res.data
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



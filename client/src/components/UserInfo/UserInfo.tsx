import useGetUserInfo from '../../hooks/users/useGetUserInfo'


const UserInfo = () => {

    const { data } = useGetUserInfo()
    
    return (
        <div className="flex p-5">
            <div className="text-white flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Profile Information</h1>
                <div className="flex justify-between">
                    <p>{data?.username}</p>
                    <button className='bg-amber-500 p-2 rounded-2xl'>edit</button>
                </div>
                <div className="flex justify-between">
                    <p>{data?.email}</p>
                    <button className='bg-amber-500 p-2 rounded-2xl'>edit</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
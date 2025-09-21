import PastOrders from "../../components/PastOrders/PastOrders"
import UserInfo from "../../components/UserInfo/UserInfo"


const UserProfile = () => {

    return (
        <>
            <UserInfo />
            <hr className="m-5 border-t border-white" />
            <PastOrders />
        </>
    )
}

export default UserProfile
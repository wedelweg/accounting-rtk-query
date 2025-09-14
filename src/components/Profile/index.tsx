import ProfileData from "./ProfileData";
import UpdateData from "./UpdateData";
import { useAppDispatch } from "../../app/hooks";
import { clearAuth } from "../../app/store";

const Profile = () => {
    const dispatch = useAppDispatch();

    const handleClickLogOut = () => {
        dispatch(clearAuth());
        localStorage.removeItem("state");
    };

    return (
        <div>
            <ProfileData />
            <button onClick={handleClickLogOut}>LogOut</button>
            <UpdateData />
        </div>
    );
};

export default Profile;

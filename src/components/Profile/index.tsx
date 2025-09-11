import ProfileData from "./ProfileData.tsx";
import UpdateData from "./UpdateData.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {clearToken} from "../../features/token/tokenSlice.ts";
import {clearUser} from "../../features/user/userSlice.ts";

const Profile = () => {
    const dispatch = useAppDispatch();

    const handleClickLogOut = () => {
        dispatch(clearUser());
        dispatch(clearToken());
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogOut}>LogOut</button>
            <UpdateData/>
        </div>
    );
};

export default Profile;
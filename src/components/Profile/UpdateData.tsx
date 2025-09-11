import {useState} from "react";
import {UpdateMode} from "../../utils/types";
import EditProfile from "./EditProfile.tsx";

const UpdateData = () => {
    const [updateMode, setUpdateMode] = useState(UpdateMode.DEFAULT);

    switch (updateMode) {
        case UpdateMode.EDIT_PROFILE:
            return <EditProfile close={()=> setUpdateMode(UpdateMode.DEFAULT)}/>;
        case UpdateMode.CHANGE_PASSWORD:
            return;
        default:
            return (
                <div>
                    <button onClick={() => setUpdateMode(UpdateMode.EDIT_PROFILE)}>
                        Edit profile
                    </button>
                    <button onClick={() => setUpdateMode(UpdateMode.CHANGE_PASSWORD)}>
                        Edit password
                    </button>
                </div>
            )
    }

};

export default UpdateData;
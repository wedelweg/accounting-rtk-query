import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {updateUser} from "../../features/api/accountApi.ts";

interface EditProfileProps {
    close: () => void
}

const EditProfile = ({close}: EditProfileProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        dispatch(updateUser({firstName, lastName}));
        close();
    }
    const handleClickClear = () => {
        setLastName("");
        setFirstName("");
    }

    return (
        <div>
            <label>FirstName:
                <input type={'text'}
                       onChange={e => setFirstName(e.target.value)}
                       value={firstName}/>
            </label>
            <label>LastName:
                <input type={'text'}
                       onChange={e => setLastName(e.target.value)}
                       value={lastName}/>
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default EditProfile;
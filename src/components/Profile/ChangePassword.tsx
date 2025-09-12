import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface ChangePasswordProps {
    close: () => void
}

const ChangePassword = ({close}: ChangePasswordProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        if (newPassword === confirmPassword) {
            dispatch(changePassword({oldPassword, newPassword}));
            close();
        } else {
            alert("New Password do not match");
        }

    }
    const handleClickClear = () => {
        setNewPassword("");
        setOldPassword("");
        setConfirmPassword("");
    }

    return (
        <div>
            <label>Old password:
                <input type={'password'}
                       onChange={e => setOldPassword(e.target.value)}
                       value={oldPassword}/>
            </label>
            <label>New password:
                <input type={'password'}
                       onChange={e => setNewPassword(e.target.value)}
                       value={newPassword}/>
            </label>
            <label>Confirm Password:
                <input type={'password'}
                       onChange={e => setConfirmPassword(e.target.value)}
                       value={confirmPassword}/>
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default ChangePassword;
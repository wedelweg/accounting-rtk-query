import { useState } from "react";
import { useChangePasswordMutation } from "../../features/api/accountApi";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAuth } from "../../app/store";

interface ChangePasswordProps {
    close: () => void;
}

const ChangePassword = ({ close }: ChangePasswordProps) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePassword, { isLoading, error }] = useChangePasswordMutation();

    const auth = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();

    const handleClickSave = async () => {
        if (!auth?.user?.login) return;

        if (newPassword !== confirmPassword) {
            alert("New Passwords do not match");
            return;
        }

        try {
            const token = await changePassword({
                login: auth.user.login,
                oldPassword,
                newPassword,
            }).unwrap();

            dispatch(setAuth({ ...auth, token }));

            close();
        } catch (e) {
            console.error("Password change failed", e);
        }
    };

    const handleClickClear = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div>
            <label>
                Old password:
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </label>
            <label>
                New password:
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button onClick={handleClickSave} disabled={isLoading}>
                Save and Close
            </button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
            {error && <p style={{ color: "red" }}>Change failed</p>}
        </div>
    );
};

export default ChangePassword;

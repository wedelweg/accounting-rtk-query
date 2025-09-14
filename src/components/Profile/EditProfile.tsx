import { useState } from "react";
import { useUpdateUserMutation } from "../../features/api/accountApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAuth } from "../../app/store";

interface EditProfileProps {
    close: () => void;
}

const EditProfile = ({ close }: EditProfileProps) => {
    const auth = useAppSelector((s) => s.auth);

    const [firstName, setFirstName] = useState(auth.user?.firstName ?? "");
    const [lastName, setLastName] = useState(auth.user?.lastName ?? "");

    const [updateUser, { isLoading, error }] = useUpdateUserMutation();
    const dispatch = useAppDispatch();

    const handleClickSave = async () => {
        if (!auth?.user?.login) return;

        try {
            const updated = await updateUser({
                login: auth.user.login,
                firstName,
                lastName,
            }).unwrap();

            dispatch(
                setAuth({
                    ...auth,
                    user: {
                        ...auth.user,
                        firstName: updated.firstName,
                        lastName: updated.lastName,
                    },
                })
            );

            close();
        } catch (e) {
            console.error("Update failed", e);
        }
    };

    const handleClickClear = () => {
        setFirstName("");
        setLastName("");
    };

    return (
        <div>
            <label>
                FirstName:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                LastName:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave} disabled={isLoading}>
                Save and Close
            </button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
            {error && <p style={{ color: "red" }}>Update failed</p>}
        </div>
    );
};

export default EditProfile;

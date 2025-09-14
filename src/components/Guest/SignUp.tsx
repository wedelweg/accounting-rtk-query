import { useState } from "react";
import { useRegisterUserMutation } from "../../features/api/accountApi";
import { useAppDispatch } from "../../app/hooks";
import { setAuth } from "../../app/store";

const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();
    const dispatch = useAppDispatch();

    const handleClickSignUp = async () => {
        try {
            const { user, token } = await registerUser({ login, password, firstName, lastName }).unwrap();
            dispatch(setAuth({ user, token }));
        } catch (e) {
            console.error("Registration failed", e);
        }
    };

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };

    return (
        <div>
            <label>Login:<input type="text" value={login} onChange={(e) => setLogin(e.target.value)} /></label>
            <label>Password:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <label>FirstName:<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
            <label>LastName:<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></label>
            <button onClick={handleClickSignUp} disabled={isLoading}>
                {isLoading ? "Registering..." : "Sign Up"}
            </button>
            <button onClick={handleClickClear}>Clear</button>
            {error && <p style={{ color: "red" }}>Registration failed</p>}
        </div>
    );
};

export default SignUp;

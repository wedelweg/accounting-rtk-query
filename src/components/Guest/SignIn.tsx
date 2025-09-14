import { useState } from "react";
import { useLoginUserMutation } from "../../features/api/accountApi";
import { useAppDispatch } from "../../app/hooks";
import { setAuth } from "../../app/store";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const dispatch = useAppDispatch();

    const handleClickSignIn = async () => {
        try {
            const { user, token } = await loginUser({ login, password }).unwrap();
            dispatch(setAuth({ user, token }));
        } catch (e) {
            console.error("Login failed", e);
        }
    };

    const handleClickClear = () => {
        setLogin("");
        setPassword("");
    };

    return (
        <div>
            <label>
                Login:
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleClickSignIn} disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
            <button onClick={handleClickClear}>Clear</button>
            {error && <p style={{ color: "red" }}>Login failed</p>}
        </div>
    );
};

export default SignIn;

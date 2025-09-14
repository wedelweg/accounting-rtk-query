import { Navigate, Route, Routes } from "react-router";
import Guest from "./components/Guest";
import Profile from "./components/Profile";
import { useAppSelector } from "./app/hooks";

const App = () => {
    const token = useAppSelector((s) => s.auth.token);

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/profile" /> : <Guest />} />
            <Route path="/profile" element={!token ? <Navigate to="/" /> : <Profile />} />
        </Routes>
    );
};

export default App;

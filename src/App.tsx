import {Navigate, Route, Routes} from "react-router";
import Guest from "./components/Guest";
import {useAppSelector} from "./app/hooks.ts";
import Profile from "./components/Profile";

const App = () => {
    const token = useAppSelector(state => state.token);

    return (
        <Routes>
            <Route path={'/'} element={token ? <Navigate to={"/profile"}/> : <Guest/>}/>
            <Route path={'/profile'} element={!token ? <Navigate to={"/"}/> : <Profile/>}/>
        </Routes>
    );
};

export default App;
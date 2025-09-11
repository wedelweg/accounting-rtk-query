import {Route, Routes} from "react-router";
import Guest from "./components/Guest";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Guest/>}/>
            <Route path={'/profile'}/>
        </Routes>
    );
};

export default App;
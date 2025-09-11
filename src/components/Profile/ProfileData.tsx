import {useAppSelector} from "../../app/hooks.ts";

const ProfileData = () => {

    const {firstName, lastName, login, roles} = useAppSelector(state => state.user);

    return (
        <div>
            <p>FirstName: {firstName}</p>
            <p>LastName: {lastName}</p>
            <p>Login: {login}</p>
            <ul>Roles:
                {roles.map(role => <li key={role}>{role}</li>)}
            </ul>
        </div>
    );
};

export default ProfileData;
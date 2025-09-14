import { useAppSelector } from "../../app/hooks";

const ProfileData = () => {
    const user = useAppSelector((s) => s.auth.user);

    if (!user) return <p>No profile loaded</p>;

    const { firstName, lastName, login, roles = [] } = user;

    return (
        <div>
            <p>FirstName: {firstName}</p>
            <p>LastName: {lastName}</p>
            <p>Login: {login}</p>
            <ul>
                Roles:
                {roles.map((role) => (
                    <li key={role}>{role}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileData;

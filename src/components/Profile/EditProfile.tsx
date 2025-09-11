interface EditProfileProps {
    close: () => void
}

const EditProfile = ({close}: EditProfileProps) => {
    //use dispatch

    return (
        <div>
            <label>FirstName:
                <input type={'text'}/>
            </label>
            <label>LastName:
                <input type={'text'}/>
            </label>
            <button>Save and Close</button>
            <button>Close without Save</button>
            <button>Clear</button>
        </div>
    );
};

export default EditProfile;
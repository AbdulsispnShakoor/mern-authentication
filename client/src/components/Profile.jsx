import NewPassword from "./NewPassword"


const Profile = () => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
        <p><b>Name</b> :Abdul Shakoor</p> <br />
        <p><b>Email</b> :abdul@gmail.com</p>
        <NewPassword dashboard={"dashboard"}/>

    </div>
  )
}

export default Profile
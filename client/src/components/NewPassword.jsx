import { useState } from "react";
import { useNavigate } from "react-router-dom";


const NewPassword = ({dashboard}) => {
    const [newPassword, setNewPassword] = useState(null);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== null){
            console.log(newPassword);
            setNewPassword(null);
            alert("password changed");
            navigate("/signin");
        }else{
            setNewPassword(null);
            alert("Please enter your new password");
        }
       
    }
  return (
    <div className="flex items-center justify-center flex-col gap-5">
        {
            dashboard ? " ":<h1>Enter New Password</h1>
        }
        
        <form onSubmit={handleSubmit}>
            <input className="px-4 py-3 bg-slate-100 " type="password" placeholder="Enter your new password" name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/>
            <input className="bg-blue-600 text-white px-6 py-3 rounded-md " type="submit" value="Save" />
        </form>
        {/* {sendEmail && <p>Email Sent</p>} */}
    </div>
  )
}

export default NewPassword
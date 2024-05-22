import { useState } from "react"


const PasswordReset = () => {
    const [sendEmail, setSendEmail] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(sendEmail !== null){
            console.log(sendEmail);
            setSendEmail(null);
            alert("Email Sent");
        }else{
            setSendEmail(null);
            alert("Please enter your email");
        }
       
    }
    
  return (
    <div className="flex items-center justify-center flex-col min-h-[80vh] gap-5">
        <h1>Password Reset</h1>
        <form onSubmit={handleSubmit}>
            <input className="px-4 py-3 bg-slate-100 " type="email" placeholder="Enter your email" name="sendEmail" onChange={(e) => setSendEmail(e.target.value)}/>
            <input className="bg-blue-600 text-white px-6 py-3 rounded-md " type="submit" value="Send Email" />
        </form>
        {/* {sendEmail && <p>Email Sent</p>} */}
    </div>
  )
}

export default PasswordReset
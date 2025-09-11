import axios from "axios"
import { useState } from "react"

function ResetPassword() {
  const [email, setEmail] = useState<string>('')

  const handleEmailSubmission = async () =>
  {
    const res = await axios.post("http://localhost:5000/api/password/forgot-password",
      {
        email,
      }
    )
    console.log(res);
    
  }
  return (
    <div className="flex flex-col">
      <label htmlFor="email">Enter Your Email</label>
      <input type="text"
        id="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleEmailSubmission}>Send Email</button>
    </div>
  )
}

export default ResetPassword
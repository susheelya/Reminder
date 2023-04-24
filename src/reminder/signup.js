import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "./firebaseconf.js";
import "./signup.css"


const Signup = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    if(password==confirmpassword){
         // Create the user with the email and password
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user", user)
      alert("You have registered successfully!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode)
      console.log("errormeesage", errorMessage)
    });
    }
    else{
      alert("PASSWORD IS NOT MATCHING")
    }
   
  }

  

  return (
    <div>
      <form onSubmit={handleSignup} className="signupform">
        <h3>SIGN UP</h3>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password</label>
        <input type="password"  value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
        <button type="submit" className="btn signupbtn">Sign up</button>
      </form>
    </div>
  )
}

export default Signup;
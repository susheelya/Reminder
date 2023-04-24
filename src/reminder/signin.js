import { useState, useEffect } from "react";
import { getAuth ,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "./firebaseconf.js";
import Signup from "./signup.js";
import Reminderinput from "./input.js";
import "./signin.css";


const Signin = (props) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUser,setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
      }
      else{
        setUser(null);
      }
    })
  },[]);

  const signout = ()=>{
    signOut(auth);
  }



  const handleSignIn = (event) => {
    event.preventDefault();
    // Create the user with the email and password
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user",user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode)
    });
  }



 
  return (
    isUser?
    <>  <button onClick={signout} className='btn logoutbtn'>Logout</button>
    <Reminderinput user={isUser}></Reminderinput>
     </>:
    <div className="displaybox">
    <div>
      <form onSubmit={handleSignIn} className="loginform">
        <h3>SIGN IN</h3>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" id="btn">Sign In</button>
      </form>
    </div>
    <Signup ></Signup>
    </div>
  )
}

export default Signin;
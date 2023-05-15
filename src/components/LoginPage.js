import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const LoginPage = ({isEmployer}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, login } = useAuth()
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate();

  const handleSwipe = () => {
    setIsActive(!isActive)
}
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    
      try {
        await signup(email, password)
        toast.success("Signed up Successfully")
        
        if (isEmployer) {
          navigate("/employer-home-page");
        } else {
         navigate("/employee-home-page");
       }
       
        console.log(isEmployer);
      } catch(error) {
        toast.error("An Error Occured")
        console.error(error)
      }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await login(email, password)
      toast.success("Logged in Successfully")
      
      if (isEmployer) {
        navigate("/employer-home-page");
      } else {
       navigate("/employee-home-page");
     }
     
    } catch(error) {
      console.error(error)
      toast.error("An Error Occured")
      
    }
  }

  
    
    return (
        <div className='main-container-new'>
        <div className={`container2 ${ isActive ? 'right-panel-active' : ''}`}>
	<div className="container__form container--signup">
		<form action="#" className="form" id="form1" onSubmit={handleSignUp}>
			<h2 className="form__title">Sign Up</h2>
			<input type="text" placeholder="User" className="input" value={name} onChange={(event) => setName(event.target.value)} />
			<input type="email" placeholder="Email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} required />
			<input type="password" placeholder="Password" className="input" value={password} onChange={(event) => setPassword(event.target.value)} required />
			<button  type="submit" className="btn">Sign Up</button>
		</form>
	</div>

	<div className="container__form container--signin">
		<form action="#" className="form" id="form2" onSubmit={handleSignIn}>
			<h2 className="form__title">Sign In</h2>
			<input type="email" placeholder="Email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} required />
			<input type="password" placeholder="Password" className="input" value={password} onChange={(event) => setPassword(event.target.value)} required />
			<button type="submit" className="btn">Sign In</button>
		</form>
	</div>
	<div className="container__overlay">
		<div className="overlay">
			<div className="overlay__panel overlay--left">
				<button className="btn nicebtn" id="signIn" onClick={handleSwipe}>Sign In</button>
			</div>
			<div className="overlay__panel overlay--right">
				<button className="btn nicebtn" id="signUp" onClick={handleSwipe}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>
    )
};


  
export default LoginPage;

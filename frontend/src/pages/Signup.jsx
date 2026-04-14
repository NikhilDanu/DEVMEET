import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import {signup} from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await signup({name , email , password});
      alert("you register succefully");
      navigate("/login");
    }catch(error){
      console.log("error" , error);
       alert(error.response?.data?.message);
    };
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>
        <p>Create your account 🚀</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">Signup</button>
        </form>

        <p className="switch">
          Already have account?
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
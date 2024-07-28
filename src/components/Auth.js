import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Register
        console.log(createUserWithEmailAndPassword)
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registration successful");
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert(`Authentication error: ${error.message}`);
    }
  };

  return (
    <>
      <div>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
          <button type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Auth;

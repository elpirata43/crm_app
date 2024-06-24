import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";

// import styled from "styled-components";
// import { useHistory } from 'react-router';
// useNavigate - react-router-dom

// const LogBox = styled.div`
//   display: grid;
//   justify-content: space-evenly;
//   border: solid black;
//   padding: 20px;
//   margin: 20px;
// `;


// function getXsrfToken() {
//   const cookieArray = document.cookie.split(';');
//   const xsrfCookie = cookieArray.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
//   if (xsrfCookie) {
//     return xsrfCookie.split('=')[1];
//   }
//   return null;
// }

// function SignUp() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
// const navigate = useNavigate()

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   console.log(email, userName, password);
//   const newUser = {
//     email: email,
//     userName: userName,
//     password: password,
//   };
//   const response = await fetch("http://localhost:8000/api/users/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newUser),
//   });
//   const result = await response.json();
//   console.log(result);
//   localStorage.setItem("jsonwebtoken", result.jwt);
// navigate('/')
//   // Show success message if signup was successful
//   if (response.ok) {
//     alert("Signup success! "); // Display the alert message
//   }
// };
  
  
 
  

//   const handleChange = (e) => {
//     if (e.target.name === "email") {
//       setEmail(e.target.value);
//     } else if (e.target.name === "user") {
//       setUserName(e.target.value);
//     } else {
//       setPassword(e.target.value);
//     }
//   };

//   return (
//     <div>
//       <LogBox>
//         <h1>Sign Up</h1>

//         <form
//           style={{
//             display: "grid",
//             border: "solid black",
//             padding: "10px",
//             margin: "10px",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             value={email}
//             name="email"
//             placeholder="email"
//             onChange={handleChange}
//           />
//           <br />

//           <input
//             type="text"
//             value={userName}
//             name="user"
//             placeholder="username"
//             onChange={handleChange}
//           />
//           <br />
//           <input
//             type="password"
//             value={password}
//             name="password"
//             placeholder="password"
//             onChange={handleChange}
//           />
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </LogBox>
//     </div>
//   );
// }

function SignUp(){
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  let isButtonDisabled;
  if (username.length < 4 || password.length < 6) {
    isButtonDisabled = true;
  } else if (
    !email.length ||
    !confirmPassword.length
  ) {
    isButtonDisabled = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
        })
      )
        // .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="input-field">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="input-field">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        {/* <label className="input-field">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
        <label className="input-field">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label> */}
        {/* {errors.lastName && <p className="error-message">{errors.lastName}</p>} */}
        <label className="input-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <label className="input-field">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        <button
          className="form-button"
          disabled={isButtonDisabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUp;
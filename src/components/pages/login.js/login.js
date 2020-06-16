import React, { useState } from 'react'
import firebase from '../../utils/firebase'
import {  useHistory } from 'react-router-dom';
export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    console.log("email", email)
    console.log("password", password)
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      alert("Logged In.");
      // const { pathname } = Router
      // if (pathname == '/Login') {
      history.push('/dashboard')
      // }
    }).catch((e) => { alert(e.message) })
  }
  return (
    <div>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head> */}

      <h2 className=" text-4xl text-center p- font-bold" >Login Form</h2>
      {/* <form action="/action_page" method="post"> */}
      {/* <form action="/dashboard" > */}
      <div className=" flex justify-center mt-5 ">
        <img src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
          alt="Avatar" className="avatar"
          style={{ width: 60 }}
        />
      </div>

      <div className="container">
        <label htmlFor="uname"><b>Email</b></label>
        <input type="email" placeholder="Enter Email" name="uname" required onChange={(event) => { setEmail(event.target.value) }} />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required onChange={(event) => { setPassword(event.target.value) }} />

        {/* <button href="/dashboard" type="submit">Login</button> */}
        <button onClick={() => { login() }} >Login</button>
        <label>
          <input type="checkbox" name="remember" /> Remember me
                    </label>
      </div>
      <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
        <button type="button" className="cancelbtn">Cancel</button>
        <span className="psw">Forgot <a href="/login">password?</a></span>
      </div>
      <style jsx="true">{
        `
body {font-family: Arial, Helvetica, sans-serif;}
form {border: 3px solid #f1f1f1;}

input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
`}
      </style>

    </div>
  )
}
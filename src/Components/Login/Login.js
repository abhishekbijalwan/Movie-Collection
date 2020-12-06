import React, { useState } from "react";
import "./Login.css";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    if (userName && password) {
      props.setToggleCompFunc(true);
    }
  }

  function onChangeHandler(type, value) {
    type == "userName" ? setUserName(value) : setPassword(value);
  }

  return (

    <div className='form'>
    <div className="form-containers">
      <div class="form-structor">
        <div class="signup">
          <h2 class="form-title" id="signup">
            Login
          </h2>
          <div class="form-holder">
            <input
              type="email"
              class="input"
              placeholder="Email"
              onChange={(e) => onChangeHandler("userName", e.target.value)}
            />
            <input
              type="password"
              class="input"
              placeholder="Password"
              onChange={(e) => onChangeHandler("password", e.target.value)}
            />
          </div>
          <button class="submit-btn" onClick={loginHandler}>
             Your Movies
          </button>
        </div>
        <div class="login slide-up">
          <div class="center">
            <h2 class="form-title" id="login">
              Login to see your collection
            </h2>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;

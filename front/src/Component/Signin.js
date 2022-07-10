import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = user;
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      window.alert("Invalid login");
      console.log("Invalid login");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Successfull login");
      console.log("Successfull login");
      history.push("/about");
    }
  };
  return (
    <div className="cover">
      <div className="cover2">
        <form method="POST" className="main">
          <p class="sign" align="center">
            Sign in
          </p>
          <div className="form-group">
            <input
              className="un"
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              className="un"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputs}
              placeholder="Enter your password"
            />
          </div>

          <button className="submit" onClick={PostData}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // Tranfering data from front end  to database
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // converts data into String
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json(); // all data is fetched in data
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Successfull Registration");
      console.log("Successfull Registration");

      history.push("/login"); // This method pushes to login page
    }
  };
  return (
    <div>
      <form method="POST" className="main">
        <p class="sign" align="center">
          Sign up
        </p>
        <div className="form-group ">
          <input
            className="un"
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleInputs}
            placeholder="Enter your name"
          />
        </div>
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
            type="phone"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleInputs}
            placeholder="Enter your phone"
          />
        </div>
        <div className="form-group">
          <input
            className="un"
            type="text"
            name="work"
            id="work"
            value={user.work}
            onChange={handleInputs}
            placeholder="Enter your work"
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
        <div className="form-group">
          <input
            className="un"
            type="password"
            name="cpassword"
            id="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
            placeholder="Confirm your password"
          />
        </div>
        <button className="submit" onClick={PostData}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;

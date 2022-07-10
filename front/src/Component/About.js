import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pic from "../My_photo.jpg";

const About = () => {
  const history = useHistory();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      history.push("/signin");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div className="about-paige">
        <img className="image" src={pic} />

        <div className="about-heading">
          <h5>About</h5>
          <ul>
            <li className="list">id: #1232625254</li>
            <li className="list">Phone: 9351616171</li>
            <li className="list">Email: yaniket333@gmail.com</li>
            <li className="list">Name: Aniket Yadav</li>
            <li className="list">Profession: Software Engineer</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;

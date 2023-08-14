import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let session = localStorage.getItem("session");
  const navigate = useNavigate();

  // Set up the headers with the session ID
  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };

  function checkHeader(e) {
    e.preventDefault();
    axios
      .get("http://localhost:8080/checkHeader", {headers})
      .then((result) => {
        if (result.status === 200) {
          console.log("Success auth");
        } else {
          console.log("data failed");
        }
      });
  }

  function check(e) {
    e.preventDefault();
    axios
      .get("http://localhost:8080/check", { headers })
      .then((result) => {
        if (result.status === 200) {
          console.log("Success auth");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Authentication failed. Please login Again");
        navigate("/login");
      });
  }

  useEffect(() => {
    axios
      .post("http://localhost:8080/dashboard", { session })
      .then((result) => {
        if (result.status === 200) {
          console.log("Success check");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Authentication failed. Please login Again");
        navigate("/login");
      });
  }, [session]);

  return (
    <div className="dashboard" style={{ marginTop: "200px" }}>
      <button onClick={check}>check</button>
      <button onClick={checkHeader}>Check header</button>
    </div>
  );
}

export default Dashboard;

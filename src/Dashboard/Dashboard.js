import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"

function Dashboard() {
  let session = localStorage.getItem("session");
  const [dashboardData, setDashboardData] = useState({});
  const navigate = useNavigate();


  // Set up the headers with the session ID
  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };


//------------------------------GET ALL LIKED BOOKS----------------------//
  function likedBooks(){
    axios.get("http://localhost:8080/getAllLikedBooks", { headers })
    .then((result) => {  
        console.log("Success check");
        console.log(result.data)
    })
  }




   
//-----------------------VERIFYING IS USER AUTHORISED OR NOT-------------------
  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard", { headers })
      .then((result) => {
        if (result.status === 200) {
          setDashboardData(result.data);
          console.log("Success check");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
        // alert("Authentication failed. Please login Again");
        console.log(err);
      });
  }, [session]);

 

  return (
    <div className="dashboard" style={{ marginTop: "200px" }}>
      <div className="dashboardCont">

        {(dashboardData.username)? 
          <div className="left">
          <h3>{dashboardData.username}</h3>
          <div className="log">
            <h4>READING LOG </h4>
            <p>Currently Reading  <span>{(dashboardData.currentRead.length === 1) ? 0 : dashboardData.currentRead.length - 1}</span> </p>
            <p onClick={likedBooks}>Liked Books    <span>{(dashboardData.likedBooks.length === 1) ? 0 : dashboardData.likedBooks.length - 1}</span></p>
            <p>Already Read    <span>{(dashboardData.completedReadBooks.length === 1) ? 0 : dashboardData.completedReadBooks.length - 1}</span></p>
            <p>My Reviews    <span>{(dashboardData.comentedBooks.length === 1) ? 0 : dashboardData.comentedBooks.length - 1}</span></p>
          </div> 
          </div>
          : ""}
          
        <div className="right">
          <h3>My Books</h3>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

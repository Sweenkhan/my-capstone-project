import React, { useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";



function Dashboard() {
  let session = localStorage.getItem("session");
  const navigate = useNavigate()
   

  useEffect(() => {
    axios.post("http://localhost:8080/dashboard", { session })
    .then((result) =>{
           if(result.data === "success auth"){
            console.log("Success auth") 
           } else {
            navigate("/login")
           }
    })
  }, []);



  function hanleClick(e){
       e.preventDefault();
       axios.post("http://localhost:8080/check", { session })
    .then((result) =>{
           if(result.status === 200){
            console.log("Success auth") 
           } else {
            navigate("/login")
           }
    })

  }


  return (
    <div className="dashboard" style={{ marginTop: "200px" }}>
      <button onClick={hanleClick}>set data</button>
      
    </div>
  );
}

export default Dashboard;

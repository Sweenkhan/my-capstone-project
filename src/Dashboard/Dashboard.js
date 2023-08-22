import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./Dashboard.css";

function Dashboard() {
  let session = localStorage.getItem("session");

  const [dashboardData, setDashboardData] = useState({});
  const [allLikedBooks, setAllLikedBooks] = useState([]);
  const [showLiked, setShowLiked] = useState(false)
  const navigate = useNavigate();

  let name;
  if (dashboardData.username) name = dashboardData.username.toUpperCase();


  // Set up the headers with the session ID
  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };


  //----------------------------GET ALL RATED BOOKS---------------------------//
  function rated() {
    axios
      .get("http://localhost:8080/getAllRatedBooks", { headers })
      .then((result) => {
        console.log("Success check");
        console.log(result.data);
        setShowLiked(false)
        setAllLikedBooks(result.data);
      });
  }

  //-----------------------------GET ALL COMPLETE READ BOOKS-------------------//
  function completed() {
    axios
      .get("http://localhost:8080/getAllCompletedBooks", { headers })
      .then((result) => { 
        setShowLiked(false);
        console.log(result.data);
        setAllLikedBooks(result.data);
      });
  }

  
  //-----------------------------GET ALL RATED BOOKS-----------------------//
  function current() {
    axios
      .get("http://localhost:8080/getAllReadBooks", { headers })
      .then((result) => { 
        console.log(result.data);
        setShowLiked(false)
        setAllLikedBooks(result.data);
      });
  }


  //------------------------------GET ALL LIKED BOOKS----------------------//
  function likedBooks() {
    axios
      .get("http://localhost:8080/getAllLikedBooks", { headers })
      .then((result) => {
        console.log("Success check");
        console.log(result.data);
        setAllLikedBooks(result.data);
        setShowLiked(true)
      });
  }


  //-----------------------VERIFYING IS USER AUTHORISED OR NOT-------------------
  useEffect(() => {
    if(session){
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
    } else {
      navigate("/login");
    }
     
  }, [session]);

  return (
    <div className="dashboard" style={{ marginTop: "60px" }}>
      <div className="dashboardCont">
        {dashboardData.username ? (
          <div className="left">
            <h3>{name}</h3>
            <div className="log">
              <h4>READING LOG </h4>
              <p onClick={current}>
                Currently Reading{" "}
                <span>
                  {dashboardData.currentRead.length === 1
                    ? 0
                    : dashboardData.currentRead.length - 1}
                </span>{" "}
              </p>
              <p onClick={likedBooks}>
                Liked Books{" "}
                <span>
                  {dashboardData.likedBooks.length === 1
                    ? 0
                    : dashboardData.likedBooks.length - 1}
                </span>
              </p>
              <p onClick={completed}>
                Already Read{" "}
                <span>
                  {dashboardData.completedReadBooks.length === 1
                    ? 0
                    : dashboardData.completedReadBooks.length - 1}
                </span>
              </p>
              <p onClick={rated}>
                Rated Books{" "}
                <span>
                  {dashboardData.ratingBooks.length === 1
                    ? 0
                    : dashboardData.ratingBooks.length - 1}
                </span>
              </p>
              <p>
                My Reviews{" "}
                <span>
                  {dashboardData.comentedBooks.length === 1
                    ? 0
                    : dashboardData.comentedBooks.length - 1}
                </span>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="right">
          <h3>My Books</h3>
          <div className="liked-books">

            {allLikedBooks.map((boks) => {
              return (
                <div className="liked-book">
                  <h4>{boks.title}</h4>
                  <img src={boks.image} alt="liked book"></img>
                  {(showLiked) ? <p><FavoriteIcon /></p> : ""}

                  {(boks.rating) ? <p style={{fontSize:"24px", margin: "0"}}> {  [1, 2, 3, 4, 5].map((star) => (
                <span
                  style={{textAlign: "center"}}
                  key={star}
                  className={`star ${boks.rating >= star ? "active" : ""}`} >
                  &#9733;
                </span>
              ))}</p> 
              : ""}

                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

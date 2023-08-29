import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./Dashboard.css"; 
import { porturl } from "../url/porturl"; 

 
function Dashboard() {
  let session = localStorage.getItem("session");

  const [dashboardData, setDashboardData] = useState({});
  const [allLikedBooks, setAllLikedBooks] = useState([]);
  const [showLiked, setShowLiked] = useState(false)
  const navigate = useNavigate();

  let name = "USER"
  if (dashboardData.username) {
  name = dashboardData.username.toUpperCase();
  }

//----------------------------GET ALL COMMENTED BOOKS----------------------  
  function commented(){
     axios.get(`${porturl}/getAllCommentedBooks/${session}`)
       .then((result) =>{
         console.log(result.data.collectData)
         setAllLikedBooks(result.data.collectData);
       })
  }


  //----------------------------GET ALL RATED BOOKS---------------------------//
  function rated() {
    axios
      .get(`${porturl}/getAllRatedBooks/${session}`)
      .then((result) => {
        console.log("Success check");
        console.log(result.data.collectData);
        setShowLiked(false)
        setAllLikedBooks(result.data.collectData);
      });
  }


  //-----------------------------GET ALL COMPLETE READ BOOKS-------------------//
  function completed() {
    axios
      .get(`${porturl}/getAllCompletedBooks/${session}`)
      .then((result) => { 
        setShowLiked(false);
        console.log(result.data.collectData);
        setAllLikedBooks(result.data.collectData);
      });
  }

  
  //-----------------------------GET ALL READ BOOKS-----------------------//
  function current() {
    axios
      .get(`${porturl}/getAllReadBooks/${session}`)
      .then((result) => { 
        console.log(result.data.collectData);
        setShowLiked(false)
        setAllLikedBooks(result.data.collectData);
      });
  }


  //------------------------------GET ALL LIKED BOOKS----------------------//
  function likedBooks() {
    axios
      .get(`${porturl}/getAllLikedBooks/${session}`)
      .then((result) => {
        console.log("Success check");
        // console.log(result.data.collectData);
        setAllLikedBooks(result.data.collectData);
        setShowLiked(true)
      });
  }


  //-----------------------VERIFYING IS USER AUTHORISED OR NOT--------------------------------------
  useEffect(() => {
    if(session){
      axios
      .get(`${porturl}/dashboard/${session}` )
      .then((result) => { 
        if (result.data.status === 200) { 
          // console.log(result.data.userdata)
          console.log("Success check");
          setDashboardData(result.data.userdata);
           
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login"); 
        console.log(err);
      });
    } 
    else { 
      // alert("You are not logged in.")
        navigate("/login"); 
    }
     
  }, [session]);


 
  return ( 
      <div className="dashboardCont" style={{ marginTop: "60px" }}>
         {(dashboardData.username) ? (
          <div className="left">
            <h3>{name}</h3> 
             <div className="log">
              <h4>READING LOG </h4>
              <p onClick={current}>
                Currently Reading{" "}
                <span>
                   {dashboardData.currentRead.length - 1}
                </span>{" "}
              </p>
              <p onClick={likedBooks}>
                Liked Books{" "}
                <span>
                  {dashboardData.likedBooks.length - 1}
                </span>
              </p>
              <p onClick={completed}>
                Already Read{" "}
                <span>
                  {dashboardData.completedReadBooks.length - 1}
                </span>
              </p>
              <p onClick={rated}>
                Rated Books{" "}
                <span>
                  {dashboardData.ratingBooks.length - 1}
                </span>
              </p>
              <p onClick={commented}>
                My Reviews{" "}
                <span>
                  {dashboardData.comentedBooks.length - 1}
                </span>
              </p>
            </div>
          </div>
        ) : (
          ""
        )} 

        <div className="right"> 
        <h3>My Books </h3>
          <h2 data-text="Welcome to Bookshelf">Welcome to Bookshelf</h2>
     
           
          <div className="liked-books">
            {allLikedBooks.map((boks) => {
              return (
                <div className="liked-book">
                  <h4>{boks.title}</h4>
                  <img src={boks.image} alt="liked book"></img> 

                 {/* checking liked request */} 
                {(showLiked) ? <p><FavoriteIcon /></p> : ""}  


                 {/* checking comment request */}
                {(boks.comment)? <div className="review">
                <h5>Reviews</h5>
                <h4>{boks.comment}</h4>
                </div> :" "}
                  {/* checking rating request    */}
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
  );
}

export default Dashboard;

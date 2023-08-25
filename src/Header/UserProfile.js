import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile(props) {
  const [hasfriend, setHasFriend] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({})
  
  const navigate = useNavigate();
  const session = localStorage.getItem("session");

  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };

  let name;
  if(userProfile.name){name = userProfile.name.toUpperCase()}

  //----------------------------HANDLE LOGOUT REQUEST------------------------------//
  function handlLogout(e) {
    e.preventDefault();
    props.show(false)
    localStorage.setItem("session", "");
    navigate("/");
    console.log("user has logged out");
  }

  //-------------------------GET ALL USERS-----------------------------------------//
  function getUsers(e) {
    e.preventDefault();
    console.log(session);
    axios.get("https://bookshelf-server-1lpi.onrender.com/allusers",{ }, { headers })
    .then((result) => {
      setAllUsers(result.data.getAllUsers);
      console.log(result.data.getAllUsers);
      setHasFriend(true);
    });
  }


  //--------------------SENDING FRIEND REQUEST------------------------------------// 
  // function sendRequest(e, friendUsername) {
  //   e.preventDefault();
  //   axios
  //     .patch("https://bookshelf-server-1lpi.onrender.com/friendRequest", { session, friendUsername })
  //     .then((result) => {
  //       console.log(result.data);
  //       console.log("request send from frontEnd")
  //     });
  // }


  //------------------------------GET ORIGINAL USER--------------------------------//
    useEffect(() => {
      console.log(session)
      axios.get("https://bookshelf-server-1lpi.onrender.com/originalUser",{ }, {headers})
      .then((result) =>{
           console.log(result.data.userData)
           setUserProfile(result.data.userData)
      })
    },[session])


 console.log(userProfile)
  return (
    <div className="userProfile">
      <div className="userCnt">
        <p className="user-name">{name}</p>
        <p>PROFILE</p>
        <p onClick={getUsers} >
          FRIENDS
        </p>

        {hasfriend && session ? (
          <ul className="drop-down-friendlist">
            <li onClick={(e) => setHasFriend(false)}>X</li>
            {allUsers.map((usr, index) => {
              return (
                <li key={index}>
                  {usr.username}
                  <span
                    style={{ backgroundColor: "red", fontSize: "8px" }}
                    // onClick={(e) => sendRequest(e, usr.username)}
                  >
                    {" "}
                    sending
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
        <div className="userProfile-btn"> 
        <button onClick={handlLogout}>Logout</button>   
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

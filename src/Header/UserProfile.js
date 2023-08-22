import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile(props) {
  const [hasfriend, setHasFriend] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const session = localStorage.getItem("session");

  const headers = {
    "Content-Type": "application/json",
    authorization: session,
  };

  //----------------------------HANDLE LOGOUT REQUEST------------------------------//
  function handlLogout(e) {
    e.preventDefault();

    localStorage.setItem("session", "");
    props.show(false)
    navigate("/");
    console.log("user has logged out");
  }

  //-------------------------GET ALL USERS-----------------------------------------//
  function getUsers(e) {
    e.preventDefault();
    console.log(session);
    axios.get("http://localhost:8080/allusers", { headers }).then((result) => {
      setAllUsers(result.data);
      console.log(result.data);
      setHasFriend(true);
    });
  }

  //--------------------SENDING FRIEND REQUEST------------------------------------//

  function sendRequest(e, friendUsername) {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/frienRequest", { session, friendUsername })
      .then((result) => {
        console.log(result.data);
      });
  }


  return (
    <div className="userProfile">
      <div className="userCnt">
        <p onClick={getUsers} >
          Friends
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
                    onClick={(e) => sendRequest(e, usr.username)}
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
        <button onClick={e=>{props.show(false)}}>Close</button>  
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

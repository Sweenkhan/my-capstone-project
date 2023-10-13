import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"; 
import { porturl } from "../url/porturl";
import {ToastContainer, toast} from "react-toastify";
import { searchedContext } from "../App/App";
import ProfileUpdate from "./ProfileUpdate";
// import CancelIcon from '@mui/icons-material/Cancel';

 
function UserProfile(props) {

  const {setUserLikedBooks} = useContext(searchedContext)

  const [hasfriend, setHasFriend] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({})
  const [showProfile, setShowProfile] = useState(false)

  const navigate = useNavigate();
  const session = localStorage.getItem("session");
 
  let name;
  if(userProfile.name){
    name = userProfile.name.toUpperCase()
  }

  //----------------------------HANDLE LOGOUT REQUEST------------------------------//
  function handlLogout(e) {
    e.preventDefault();
    toast.success("Succesfully Logged Out")

    setTimeout(( ) => {
      props.show(false)
      localStorage.setItem("session", "");
      navigate("/");
    },2000);
    setUserLikedBooks("")
    console.log("user has logged out");
  }


  //-------------------------GET ALL USERS-----------------------------------------//
   
  function getUsers(e) {
    e.preventDefault(); 
    axios.get(`${porturl}/allusers/${session}`)
    .then((result) => {

      let allusers = result.data.getAllUsers
      const filter =  allusers.filter((usr) =>{
        return usr.name !== userProfile.name
      })  
        setAllUsers(filter);
      setHasFriend(true);
    });
  }


  //--------------------SENDING FRIEND REQUEST------------------------------------// 
  // function sendRequest(e, friendUsername) {
  //   e.preventDefault();
  //   axios
  //     .patch(`${porturl}/friendRequest/${session}`, {friendUsername })
  //     .then((result) => {
  //       console.log(result.data);
  //       console.log("request send from frontEnd")
  //     });
  // }


  //------------------------------GET ORIGINAL USER--------------------------------//
    useEffect(() => { 
      axios.get(`${porturl}/originalUser/${session}` )
      .then((result) =>{
           console.log(result.data.userData)
           setUserProfile(result.data.userData)
      })
    },[session])

 
  return (
    <>
    <div className="userProfile">
      <div className="userCnt">
        <p className="user-name">{name}</p>
        <p onClick={() => {setShowProfile((showProfile) ? false : true)}}>PROFILE</p>
        {/* { (showProfile) && <ProfileUpdate name={userProfile.name} username={userProfile.username} 
          phone={userProfile.phone} password={userProfile.password} email={userProfile.email} closing={() => {setShowProfile()}}
        />} */}
        { (showProfile) && <ProfileUpdate userProfile={userProfile} closing={() => {setShowProfile()}}
        />}
        <p onClick={getUsers} >
          FRIENDS 
        </p>
        
        {hasfriend && session ? (
          <ul className="drop-down-friendlist">
            <span onClick={(e) => setHasFriend(false)}> </span>
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
        <button className="logout-btn" onClick={handlLogout}>Logout</button>  
        <button className="close-btn" onClick={e =>{props.show(false)}}>Close</button>
        </div>
      </div> 
      <ToastContainer position='top-center' autoClose={2000} theme='light'/>
      </div>
    </>
  );
}

export default UserProfile;

import React,{useState} from 'react'
import axios from 'axios';
import { porturl } from '../url/porturl';
import { toast } from 'react-toastify';


function ProfileUpdate(props) {

    const prop = props.userProfile;
    const session = localStorage.getItem("session")

    const [showPassword, setShowPassword] = useState(false)
    const [edit, setEdit] = useState(false)

    const [username, setUserName] = useState(prop.username)
    const [name, setName] = useState(prop.name)
    const [email, setEmail] = useState(prop.email)
    const [phone, setPhone] = useState(prop.phone)
    const [password, setPassword] = useState(prop.originalPassword)
    
    console.log(edit)
    function handleSubmit(e){ 
         e.preventDefault()

      if(edit){
        axios.put(`${porturl}/editUserProfile/${session}`, {name, email, phone, username, password})
        .then((result) => {
            toast.success("Profile update successfully!")
           console.log(result.data.message)
        }).catch((err) => {
           console.log(err)
        })
      } else {
        toast.info("nothing has changed")
      }

    }


    function handlOnblur(){

    }
    

  return (
    <div className='updateProfile'>
    <h2>USER PROFILE</h2>
         <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input value={username} onChange={(e) => setUserName(e.target.value)}
             type='text' id='username' disabled />

            <label htmlFor="name">Name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type='text' 
            id='name' disabled={(!edit) ? true : false} />

            <label htmlFor="mobile">Phone </label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number'
             id='mobile' disabled={(!edit) ? true : false} />

            <label htmlFor="email">Email </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email'
             id='email' disabled />
            
            <label htmlFor="password" className='password'>Password:  
            <span className="showPassword" onClick={() => {setShowPassword((!showPassword) ? true : false)}}>Show</span></label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={(showPassword) ? "text" : "password" } 
            id='password' disabled={(!edit) ? true : false} />
            
            <label htmlFor="password" className='password'>Password:  
            <span className="showPassword" onClick={() => {setShowPassword((!showPassword) ? true : false)}}>Show</span></label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={(showPassword) ? "text" : "password" } 
            id='password' disabled={(!edit) ? true : false} />

            <button type='submit'>Save</button>
        </form>

        <div className='buttons'> 
        <button onClick={()=> {setEdit((!edit) ? true : false)}}>Edit</button>
        <button onClick={() => props.closing(false)}>Close</button>
        </div>

    </div>
  )
}

export default ProfileUpdate
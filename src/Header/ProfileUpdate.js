import React from 'react'

function ProfileUpdate(props) {

  return (
    <div className='updateProfile'>
    <h2>this is profile page </h2>
         <form>
            <label for="username">Username: </label>
            <input value={props.username} type='text' id='username'/>

            <label for="name">Name </label>
            <input value={props.name} type='text' id='name'/>

            <label for="mobile">Phone </label>
            <input value={props.phone} type='number' id='mobile'/>

            <label for="email">Email </label>
            <input value={props.email} type='email' id='email' readOnly/>
            
            <label for="password">Password: </label>
            <input value={props.password} type='password' id='password' readOnly/>

            <button type='submit'>Save</button>
        </form>
        <div className='buttons'> 
        <button>Edit</button>
        <button onClick={() => props.closing(false)}>Close</button>
        </div>
    </div>
  )
}

export default ProfileUpdate
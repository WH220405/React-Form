import {useState} from 'react'

export default function Authenticate({token}){
 const [successMessage, setSuccessMessage] = useState(null);
 const [error, setError] = useState(null);
 const [username, setUsername] = useState(null)
 
    
   async function handleClick(){
      try{
        const response = await fetch(
            "https://fsa-jwt-practice.herokuapp.com/authenticate", 
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
        );
        const result = await response.json();
        //console.log(result);
        setSuccessMessage(result.message);
        setUsername(result.data.username)
      }catch(error){
         setError(error.message)
      }
   };
    

  return (
   <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Logged-in User: {username}</p>} {/* Display the username */}
      {error && <p>{error}</p>}
       <button onClick={handleClick}>Authenticate Token!</button>
   </div>
 );
}
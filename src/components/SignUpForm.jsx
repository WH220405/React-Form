import { useState } from 'react'
import './SignUpForm.module.css'

export default function SignUpForm({ setToken }){
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
// struggling with received a token back form the API
// You now have access to the token and can pass it along to the /authenticate API endpoint.


async function handleSubmit(e){
    e.preventdefault();

    if(userName.length < 8) {
        setError("Username mube be at least eight characters.");
        return;
    }
    
    try{
        const response = await fetch(
            "https://fsa-jwt-practice.herokuapp.com/signup",
             {
               method: 'POST',
               header: {
                  'Content-Type': "application/json",
            },
            body:JSON.stringify({userName, password})
       }
     );
       console.log(response);
        const result = await response.json();
        console.log(result);
        setToken(result.token);

    }catch(error){
        setError(error.message)
    }
}
  //setUserName();
return (
<div className="setup"> 
<h2>SignUp Form</h2>
{error && <p>{error}</p>}
<form onSubmit={handleSubmit}>

 <label>
    User Name: <input type="text" name="username" id="username" value={userName}  autoComplete="userName" required 
    onChange={(e) => setUserName(e.target.value)} />
 </label>
 <label>
    Password: <input type="password" name="password" id="password" value={password} autoComplete="current-password" required 
    onChange={(e) => setPassword(e.target.value)} />
 </label>
 <button >Submit</button>
</form>

</div>
  )
}

// note: form using autocompleate attributes saving user forn accidentally saving or autofill the worng data. 


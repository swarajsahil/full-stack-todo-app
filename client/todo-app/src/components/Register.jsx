import { useState } from "react";
import axios from "axios";
const Register=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const registerDetail=async(e)=>{
        e.preventDefault();
        const data={
            name,email,password
        }
        console.log(data);
        try {
            // const response=await fetch("https://todo-app-ovj3.onrender.com/api/v1/users/register",{
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json",
            //     },
            //     body:JSON.stringify(data)
            // });
            const response = await axios.post(
              'https://todo-app-ovj3.onrender.com/api/v1/users/register', // Replace with your API endpoint
              data,
              {
                headers: {
                  'Content-Type': 'application/json', // Set the Content-Type header
                },
              }
            );
            if (response.status === 200) {
                setRegistrationStatus('success');
              } else {
                setRegistrationStatus('error');
              }
            } catch (error) {
              setRegistrationStatus('error');
            }
    }
    if (registrationStatus === 'success') {
        return <div>Registration Successful! You can now log in.</div>;
      } else if (registrationStatus === 'error') {
        return <div>Registration failed. Please try again later.</div>;
      }

    return(
       <div className="w-screen h-screen flex justify-center items-center">
         <form onSubmit={registerDetail} className=" w-80 h-80 bg-green-400 flex justify-center items-center flex-col gap-5">
            <div className="gap-11 flex">
                <label>NAME</label>
                <input type="text" name="username" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="gap-11 flex">
                <label>EMAIL</label>
                <input type="email" name="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="gap-3 flex">
                <label>PASSWORD</label>
                <input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded-md">REGISTER</button>
        </form>
       </div>
    )
}

export default Register;
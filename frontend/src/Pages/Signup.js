import React, { useState, useEffect} from "react"
import Input from "../Components/Input.js"
import Button from "../Components/Button.js"
import { Outlet, Link, useNavigate} from "react-router-dom";
import axois from "../axiost"
import { setCookie  } from "../CookieHandler"
import { changeUrl } from "../global_func.js";
import swish from "../swish.png"

export default function Signup(props){
  
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");
  const [page,setPage] = useState(0)
  const navigate = useNavigate();

  const signup = () =>{
    axois.post("identification/create_user/",{
      username:username,
      password:password,
      phonenumber:phonenumber,
    })
      .then(r=>{
        setPage(1)
      })
      .catch(error=>{
        setError(error.response.data.code)
      });
  }

  const page1 = (
    <React.Fragment>
        <img src="./logo.png" className="w-[80px]" />
        <div className="flex flex-col items-start w-full">
          <h1 className="text-[#727272] text-2xl" >Ditt recepts letade börjar nu</h1>
          <h1 className="text-[#727272]" >Gör ditt köksliv lättare och registrera dig nu</h1>
        </div>
        <Input placeholder="Username"                         value={username} onChange={setUsername}/>
        <Input placeholder="Phonenumber"                      value={phonenumber} onChange={setPhonenumber} type="number"/>
        <Input placeholder="Password"        type="password"  value={password1} onChange={setPassword1}/>
        <Input placeholder="Retype Password" type="password"  value={password} onChange={setPassword}/>
        <h1 className="text-red-400" >{error}</h1>
        <div className="flex flex-row gap-2 items-start" >
          <h1 className="text-[#727272]" >Already have an accound?</h1>
          <Link to="/" className="duration-100 cursor-pointer hover:text-[#8176ee] text-[#7165ff]" >Sign in instead</Link>
        </div>
        <Button onClick={signup} >SIGN UP</Button>
    </React.Fragment>
  )

  const page2 = (
    <React.Fragment className="" >
      <img src="./logo.png" className="w-[80px]" />
      <h1>
        Det som återstår är att betala en engångs avgift för att skapa kontot.
        Efter det kommer ditt konto att låsas upp av våran support.
      </h1>
      <img src={swish} />
      <Button onClick={()=>navigate("/user/home")} >Logga in</Button>
    </React.Fragment>
  )

  return (
    <div className=" flex justify-center items-center bg-[#F4F4F8] w-screen h-screen " >
      <div className={`flex flex-col w-[90%] sm:w-1/2 xl:w-1/4 items-center gap-4 bg-[#fefefe] p-8 rounded-xl shadow-lg text-[#727272] `} >
        {page===0?page1:page2}
      </div>
    </div>
  );
}



import React, {useState,useEffect} from "react"
import axiost from "../axiost"
import Button from "../Components/Button"


export default function Activate(props){

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    axiost.get("/identification/get_users")
          .then(r=>{
            setUsers(r.data.filter((user)=>user.has_paid===false))
          })
          .catch(r=>{})
  },[refresh])

  const hasPaid = (user) =>{
    axiost.post("/identification/set_has_paid/",{id:user.id})
          .then(r=>{
            alert(r.data)
            setRefresh(!refresh)
          })
          .catch(err=>{
            setRefresh(!refresh)
          })
  }

  return (
    <div className="flex flex-col gap-2 items-center w-screen" >
      <h1>Users som inte är upplåsta </h1>
      <h2>Kolla om ni har fått swish, isf tryck på har betalat</h2>
      <div className="rounded-lg flex flex-col p-4 items-center w-1/2 bg-slate-200 gap-3" >
        {users.map((user,i)=>
        <div className="rounded-lg bg-white flex flex-row gap-2 p-2" >
          <h1>{user.username}</h1>
          <h1>{user.phonenumber}</h1>
          <Button onClick={()=>hasPaid(user)} >Har betalat</Button>
        </div>
        )}
      </div>
    </div>
  );
}

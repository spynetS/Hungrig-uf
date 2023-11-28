import React, {useState, useEffect} from "react"

import {getCookie,setCookie} from "../CookieHandler.js"
import axiost from "../axiost"
import Input from "../Components/Input"
import Loading from "../Components/Loading"
import Button from "../Components/Button"
import { AiFillDelete } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import Recipe from "../Components/Recipe"

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const link = "http://localhost:8000/media/"


export default function(props){

  const [recipes,setRecipes] = useState([])
  const [refresh,setRefresh] = useState(false)
  const [user, setUser] = useState("")
  const [category,type] = useOutletContext();

  useEffect(()=>{
    axiost.post("/recipe/get_recipes/",{category:category,type:type})
          .then(r=>{
            setRecipes(r.data)
          })
    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            setUser(r.data)
          })
  },[refresh,category,type])

  return (
    <div className="flex flex-col gap-4 w-full max-h-full" >
    {recipes.map((recipe,i)=>
      <Recipe user={user} reload={()=>setRefresh(!refresh)} recipe={recipe} key={i}/>
    )}
    </div>
  )
}

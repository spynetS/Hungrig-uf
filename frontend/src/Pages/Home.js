import React, {useState, useEffect} from "react"

import {getCookie,setCookie} from "../CookieHandler.js"
import axiost from "../axiost"
import Input from "../Components/Input"
import Loading from "../Components/Loading"
import Button from "../Components/Button"
import { AiFillDelete } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import Recipe from "../Components/Recipe"

import { useLocation, useNavigate } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import FlatList from "flatlist-react/lib"

const link = "http://localhost:8000/media/"

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function(props){

  const [recipes,setRecipes] = useState([])
  const [refresh,setRefresh] = useState(false)
  const [user, setUser] = useState("")
  const [category,type] = useOutletContext();
  let query = useQuery();

  useEffect(()=>{
    axiost.post("/recipe/get_recipes/",{category:category,type:type})
          .then(r=>{
            let arr = r.data
            setRecipes(arr)
          })
    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            setUser(r.data)
          })
  },[refresh,category,type])


  const renderItem = (item,idx) =>{
    return <Recipe user={user} reload={()=>setRefresh(!refresh)} recipe={item} key={idx}/>
  }
  const getRecipe = (id) =>{
    for(let i = 0; i < recipes.length; i ++){
      if(recipes[i].id == id) return recipes[i]
    }
    return null;
  }

  return (
    <div>
      <div className={`${query.get("recipe")!==null?"hidden":""}`}>
        <FlatList
            list={recipes}
            renderItem={renderItem}
            initialNumToRender={10} />
      </div>
      <div className={`${query.get("recipe")===null?"hidden":""}`}>
        <Recipe user={user} reload={()=>setRefresh(!refresh)} recipe={getRecipe(query.get("recipe"))} />
      </div>
    </div>
  )
}

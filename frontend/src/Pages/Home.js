import React, {useState, useEffect} from "react"
import {getCookie,setCookie} from "../CookieHandler.js"
import axiost from "../axiost"
import Input from "../Components/Input"
import Loading from "../Components/Loading"
import Button from "../Components/Button"
import { AiFillDelete } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const link = "http://localhost:8000/media/"

function Comment(props){
  const removeComment = () =>{
    props.loading(true)
    axiost.post("/recipe/remove_comment/",{
      id:props.comment.id,
    })
          .then(r=>{
            props.loading(false)
            props.reload()
          })
  }
  return (
    <div className="bg-[#FF65DC] rounded-md bg-opacity-25 px-2 py-1" >
      <div className="flex flex-row gap-3 justify-between" >
        <div className="flex flex-row gap-2 items-center" >
            <img className=" flex flex-col justify-end items-center bg-gray-200 h-[30px] w-[30px] font-semibold rounded-full "  src={`${link}${props.comment.auther.picture}`}/>
            <h1 className="italic text-lg" >{props.comment.auther.username}</h1>
            <h1 className="italic text-sm text-gray-500" >{new Date(props.comment.created*1000).toLocaleString("sv-SE")}</h1>
        </div>
    <AiFillDelete onClick={removeComment} className={`text-red-500 hover:cursor-pointer ${props.username===props.comment.auther.username?"":"hidden"}`}/>

      </div>
      <div>
        <p>{props.comment.content}</p>
      </div>
    </div>
  );
}

function Recipe(props){

  const [comment,setComment] = useState("")
  const [loading,setLoading] = useState(false)

  const ingridents = props.recipe.ingredients.map((ing,i)=>
    <li>{ing.amount} {ing.name}</li>
  )
  const instructions = props.recipe.instructions.map((ing,i)=>
    <li key={i}>{i+1}.  {ing}</li>
  )

  const comments = props.recipe.comments.map((comment,i)=>
    <Comment key={i} loading={setLoading} reload={props.reload} username={props.user.username} comment={comment}/>
  )

  const uploadComment  = (recipe) =>{
    if(comment !== ""){
        setLoading(true)
        axiost.post("/recipe/post_comment/",{
        "recipe":recipe.id,
        "content":comment})
            .then(r=>{
                setComment("")
                setLoading(false)
                props.reload()
            })
            .catch(err=>{
                setComment("")
                setLoading(false)
                props.reload()
            })
    }
    else{
      alert("Du måste skriva något")
    }
  }

  const setToFavorit = (add) => {
    let body = {}
    if(add){
        body = {
            add_fav:props.recipe.id
        }
    }else{
        body = {
            del_fav:props.recipe.id
        }
    }
    setLoading(true)
    axiost.post("/identification/set_favorit_recipe/",body)
          .then(r=>{
            setLoading(false)
            props.reload()

          })
          .catch(err=>{
            setLoading(false)
            props.reload()

          })
  }

  const isFav=()=>{
    try{
        for(let rec of props.user.favorit_recipes){
          if (props.recipe.id == rec.id) return true
        }
      return false
    }
    catch(err){
      return false
    }
  }

  return (
    <>
      <Loading on={loading} />
        <div className="flex flex-row items-end gap-4" >
          <img className=" flex flex-col justify-end items-center bg-gray-200 h-[60px] w-[60px] font-semibold rounded-full " alt={""}  src={`http://localhost:8000/media/${props.recipe.auther.picture}`}/>
          <h1 className="italic text-2xl" >{props.recipe.title}, {props.recipe.servings} portioner</h1>
          {!isFav()?
           (<FaRegStar onClick={()=>setToFavorit(true)} className="mb-2 hover:scale-125 duration-75 text-yellow-400 hover:cursor-pointer " />):
           <FaStar onClick={()=>setToFavorit(false)}    className="mb-2 hover:scale-125 duration-75 text-yellow-400 hover:cursor-pointer " />}
        </div>
        <h1 className="italic text-lg" >{props.recipe.description}</h1>
      <h1 className="italic text-sm" >{new Date(props.recipe.created*1000).toLocaleString("sv-SE")}</h1>

      <div className="grid md:grid-cols-4 md:grid-rows-1 grid-cols-3 grid-rows-2" >
            <div className="flex flex-col col-span-2 pr-2 w-full" >
              <img alt={"Bild Saknas"} className="flex items-center justify-center text-3xl text-gray-600 italic bg-gray-200 rounded-md w-full aspect-video" src={`${link}${props.recipe.image}`} />

              <h1 className="text-[#FFA6DC] font-semibold " >Rakning: {props.recipe.reviews}</h1>
              <div>
                <div className="flex flex-row gap-3 items-end" >
                  <h1 className="text-3xl font-semibold" >Metod:</h1>
                  <h1> Runt {props.recipe.cooking_time} min</h1>
                </div>
                <hr className="border-[#FFA6DC] "/>
                <ol className="my-5" >
                    {instructions}
                </ol>
              </div>
            </div>


            <div className="flex flex-col w-full p-4 " >
                <h1 className="font-semibold italic" >Ingredienser</h1>
                <hr className="border-[#FFA6DC]"/>

                 <ul>
                   {ingridents}
                </ul>

            </div>
        <div className="flex flex-col p-4  gap-2 w-full md:col-span-1 col-span-3" >
                <h1 className="font-semibold italic" >Kommentarer</h1>
                <hr className="border-[#FFA6DC]"/>
                <div>
                  <Input placeholder="Kommentera något" value={comment} onChange={setComment} trigger={()=>uploadComment(props.recipe)} />
                  <Button  onClick={()=>uploadComment(props.recipe)} >Publicera</Button>
                </div>
                {comments}
            </div>
        </div>
    </>
  );
}


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
    axiost.post("/identification/get_user_info/")
          .then(r=>{
            setUser(r.data)
          })
  },[refresh,category,type])

  return (
    <div className="flex flex-col gap-2 w-full" >
    {recipes.map((recipe,i)=>
      <Recipe user={user} reload={()=>setRefresh(!refresh)} recipe={recipe} key={i}/>
    )}
    </div>
  )
}

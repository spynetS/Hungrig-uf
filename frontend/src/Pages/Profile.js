import React,{useState,useEffect} from "react"
import axiost, {link} from "../axiost"
import { IoAddOutline } from "react-icons/io5";
import Recipe from "../Components/Recipe"
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Components/Button"
import Loading from "../Components/Loading"
//
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function Profile(props){

  const [recipes,setRecipes] = useState([])
  const [me,setMe] = useState({following:[]})
  const [user,setUser] = useState({following:[]})

  const [refresh,setRefresh] = useState(false)
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  let query = useQuery();

  useEffect(()=>{
    const username = query.get("username")
    if(username!=null){
      axiost.post("/identification/get_user_info/",{username:username})
            .then(r=>{
                setUser(r.data)
            })
      axiost.post("/recipe/get_user_recipes/",{username:username})
          .then(r=>{
            setRecipes(r.data)
          })
    }
    else{
    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            setUser(r.data)
          })
      axiost.post("/recipe/get_user_recipes/",{})
          .then(r=>{
            setRecipes(r.data)
          })
    }

    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            setMe(r.data)
          })

  },[refresh])
  const upload = (e,r) => {
    setLoading(true)
    var formData = new FormData();
    formData.append("file", e.target.files[0]);

    axiost.post("/identification/upload_profile_picture/",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(r=>{
        // download the compressed file
        setRefresh(!refresh)
        setLoading(false)
      })
      .catch(error=>{
        alert(error.response.code)

        setLoading(false)
      })
  }

  const removeRecipe = (recipe) =>{
    setLoading(true)
    axiost.post("/recipe/remove/",{id:recipe.id})
          .then(r=>{
            setLoading(false)
            setRefresh(!refresh)
          })
          .catch(error=>{
            setLoading(false)
          })
  }

  const toggleFollow = () =>{
    axiost.post("/identification/toggle_follow/",{id:user.id})
          .then(r=>{
            setRefresh(!refresh)
          })
  }

  const hideNotMe = user.id===me.id?"":"hidden"
  const showNotMe = user.id!==me.id?"":"hidden"

  const followText =()=>{
    for(let i = 0; i < me.following.length; i ++){
      if (me.following[i].id === (user.id))
        return "Avfölj"
    }
    return "Följ"
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      <Loading on={loading}/>
      <div className="flex flex-row justify-between items-end" >
        <div className="flex flex-row gap-2 items-end  ">
          <div className={`relative flex flex-row items-center hover:scale-105 duration-75 cursor-pointer justify-center`}>
            <img className=" flex flex-col justify-end items-center bg-gray-200 h-[120px] w-[120px] font-semibold rounded-full " alt={""}  src={`${link}${user.picture}`}/>
            <input type="file" onChange={ upload } className={`display-none absolute overflow-hidden w-full ${hideNotMe} `}/>
            {/* <h1 className={`absolute italic ${user.picture===""?"text-black":"text-gray-200"}  font-semibold`} >Ändra bild</h1> */}
          </div>
          <h1 className="italic text-2xl  text-[#ffa6dc] " >{user.username}</h1>
        </div>
        <div onClick={()=>navigate("/user/add_recipe")} className={`${hideNotMe} flex flex-col items-center hover:bg-slate-200 cursor-pointer duration-100 rounded-lg p-2 `} >
          <IoAddOutline size={75} className="text-[#ffa6dc]"/>
          <h1 className="italic text-2xl  text-[#ffa6dc] " >Nytt recept</h1>
        </div>
        <div className={`${showNotMe} w-[100px]`}>
          <Button onClick={toggleFollow} className={` w-[100px] h-10`} >{followText()}</Button>
        </div>
      </div>
    <h1 className="mt-12 font-semibold text-3xl italic" >Alla dina recept</h1>
    <hr className="border-[#FFA6DC] "/>
    {recipes.map((recipe,i)=>
      <div>
        <Recipe user={user} reload={()=>setRefresh(!refresh)} recipe={recipe} key={i}/>
      <div className={`flex flex-row gap-2 ${hideNotMe} `} >
          <Button>Redigera</Button>
          <Button onClick={()=>removeRecipe(recipe)} >Tabort</Button>
        </div>
      </div>
    )}
    </div>
  );
}

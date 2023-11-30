import React, {useState,useEffect} from "react"
import Button from "../Components/Button"
import Input from "../Components/Input"
import axiost from "../axiost"
import Loading from "../Components/Loading"
import Checkbox from "../Components/Checkbox"
import { useNavigate } from "react-router-dom"


export default function AddRecipe(props){

  const [user,setUser] = useState({})
  const [refresh,setRefresh] = useState(false)
  const [loading,setLoading] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [ingBuffer,setIngBuffer] = useState("")
  const [ingAmount, setIngAmount] = useState("")
  const [title,setTitle] = useState("")

  const [method, setMethod] = useState([])
  const [methodBuffer, setMethodBuffer] = useState("")

  const [category,setCategory] = useState("")
  const [image,setImage] = useState(null)
  const [imagePath,setImagePath] = useState("")

  const [description, setDescription] = useState("")

  const navigate = useNavigate();

  useEffect(()=>{
    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            setUser(r.data)
          })
  },[])

  const upload = () => {
    setLoading(true)
    var formData = new FormData();
    formData.append("category",category)
    formData.append("title",title)
    formData.append("description",description)
    formData.append("ingredients",JSON.stringify(ingredients))
    formData.append("method",JSON.stringify(method))
    formData.append("auther_id",user.id)
    formData.append("file", image);

    axiost.post("/recipe/upload_recipe/",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(r=>{
        // download the compressed file
        setRefresh(!refresh)
        setLoading(false)
        alert("Uploaded sucessfully")
        navigate("/user/profile")
      })
      .catch(error=>{
        alert(error.response.data)

        setLoading(false)
      })
  }


  const addCategory =(e,path)=>{
    let cat = category;
    if(e){
      cat+=","+path
    }else{
      cat = cat.replace(","+path,"")
    }
    setCategory(cat)
  }

  const categorys = [
    "Vegitariskt",
    "Lunch",
    "Middag",
    "Frukost",
    "Drinkar",
    "Snack",
    "Bakelser"].map((path,i)=>
    <li>
      <Checkbox onChange={e=>addCategory(e,path)} label={path}/>
    </li>
  )


const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImagePath(URL.createObjectURL(event.target.files[0]));
 }
}
  return (
    <div className="w-full flex flex-col items-center">
      <Loading on={loading}/>
      <h1 className="text-4xl font-semibold italic mb-2">Lägg till ett nytt recept</h1>
      <div className="px-5 md:w-1/2 flex flex-col gap-3" >
        <Input value={title} onChange={setTitle}  placeholder={"Rubrik"}/>
        <Input value={description} onChange={setDescription}  placeholder={"Beskrivning"}/>
        <h1 className="font-semibold italic text-xl" >Bild:</h1>
        <div className="relative flex flex-row items-center hover:scale-105 duration-75 cursor-pointer justify-center">
          <img className=" bg-gray-200 w-full h-[300px] rounded-md flex text-gray-600 text-2xl italic font-bold items-center justify-center" alt={"Lägg till bild"}  src={imagePath}/>
          <input type="file" onChange={e=> {setImage(e.target.files[0]); onImageChange(e)} } className="display-none absolute overflow-hidden w-full"/>
        </div>

        <h1 className="font-semibold italic text-xl" >Ingredienser:</h1>
        <div className="grid grid-cols-5 w-full gap-2" >
          <Input placeholder={"Mägnd (2dl, 2 gram, 1 matsked)"} onChange={setIngAmount} value={ingAmount} className="col-span-2" />
          <Input placeholder={"Namn"} onChange={setIngBuffer} value={ingBuffer} className="col-span-2" />
          <Button onClick={()=>{ingredients.push({amount:ingAmount,name:ingBuffer});setIngAmount("");setIngBuffer("")}} >Lägg till</Button>
        </div>
        <ul className={"text-xl rounded-lg bg-slate-200 p-4"}>
          {ingredients.map((ing,i)=>
            <li key={i} >{ing.amount} {ing.name}</li>
          )}
        </ul>

        <h1 className="font-semibold italic text-xl" >Metod:</h1>
        <div className="grid grid-cols-5 w-full gap-2" >
          <Input placeholder={"Skriv metoden"} onChange={setMethodBuffer} value={methodBuffer} className="col-span-4" />
          <Button onClick={()=>{method.push(methodBuffer);setMethodBuffer("")}} >Lägg till</Button>
        </div>
        <ol className={"text-xl rounded-lg bg-slate-200 p-4"}>
          {method.map((method,i)=>
            <li key={i} >{method}</li>
          )}
        </ol>

        <h1 className="font-semibold italic text-xl" >Vilka/vilken katigori passar rätten in på?</h1>
        <ol  >
          {categorys}
        </ol>
        <Button onClick={upload} className="mb-5 mt-2" >Ladda upp</Button>


      </div>
    </div>
  );
}

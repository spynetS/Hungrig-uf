import { Outlet, Link, useNavigate} from "react-router-dom";
import React,{useState, useEffect} from "react"
import logo from '../logo.png';
import Button from "../Components/Button"
import Input from "../Components/Input"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import axiost from "../axiost"

const Layout = () => {

  const [category,setCategoryState] = useState("alla")
  const [type,setTypeState] = useState("feed")

  const classname = " text-2xl italic  "
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("")
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    axiost.post("/identification/get_user_info/",{})
          .then(r=>{
            if(!r.data.has_paid){
              navigate("/hasnotpaid")

            }
            setUser(r.data)
          })
          .catch(err=>{
            navigate("/")
          })
  },[])

  useEffect(()=>{
    setOpen(false)
  },[refresh])

  const setType = (e)=>{
    setRefresh(!refresh)
    setTypeState(e)
  }
  const setCategory = (e)=>{
    setRefresh(!refresh)
    setCategoryState(e)
  }

  const paths = [
    "Alla",
    "Vegitariskt",
    "Lunch",
    "Middag",
    "Frukost",
    "Drinkar",
    "Snack",
    "Bakelser"].map((path,i)=>
      <Link className={`${classname} ${category==path.toLocaleLowerCase()?"font-bold":""}`} key={i} onClick={()=>setCategory(path.toLocaleLowerCase())} to="/user/home">{path}</Link>
  )

  return (
    <div className="flex col w-screen h-screen bg-[#fefefe]" >
      <div className=" w-full h-full" >
        <div className="flex flex-row gap-4  md:justify-between items-end " >
          <div className="flex flex-row gap-4 items-center p-2 shadow-lg w-full" >
            <GiHamburgerMenu onClick={()=>setOpen(true)} className="md:hidden text-[#FF60dc]" size={40} />
            <img className="hidden md:block w-[100px]" src={logo}/>
            <h1 className="text-6xl font-bold italic font-Inter text-[#FFA6DC]" >Hungrig UF</h1>
          </div>
          {/* <Button onClick={()=>navigate("/user/create_recipe")} className="w-32 h-10" >Nytt recept</Button> */}
        </div>
        <nav  className={`h-screen w-screen md:hidden z-40 bg-slate-100 right-0 p-4 fixed duration-[500ms]  ${open?" top-0":" -top-[100%]"} `} >
          <div className="flex flex-row gap-2 items-center" >
            <IoClose onClick={()=>setOpen(false)} className="" size={75} />
            <h1 className="text-6xl font-bold italic font-Inter text-[#FFA6DC]" >Hungrig UF</h1>
          </div>
            <div className="w-full list-none flex flex-row justify-center gap-2 overflow-scroll w-full"  >
              <div className="flex flex-col" >
                {paths}
              </div>
              <div className="flex flex-col" >
                <Link className={`${classname} ${type==="feed"?"font-bold":""}`} onClick={()=>setType("feed")} to="/user/home">Flöde</Link>
                <Link className={`${classname} ${type==="follow"?"font-bold":""}`} onClick={()=>setType("follow")} to="/user/home">Följer</Link>
                <Link className={`${classname} ${type==="favorites"?"font-bold":""}`} onClick={()=>setType("favorites")} to="/user/home">Favoriter</Link>
                <Link className={`${classname} ${type==="popular"?"font-bold":""}`} onClick={()=>setType("popular")} to="/user/home">Populära</Link>
                <div className="flex flex-col" >
                  <Link className={`${classname} ${type==="profile"?"font-bold":""}`} onClick={()=>setType("profile")} to={`/user/profile?username=${user.username}`}>Min profil</Link>
                  <Link className={`${classname}`} to={`/logout`}>Logga ut</Link>
                </div>
              </div>
            </div>
        </nav>

        <div className="flex flex-row max-h-[85%] gap-3">
          <nav className="md:flex hidden px-3 mt-10 w-1/6 " >
            <div className="list-none flex flex-col gap-3 h-full"  >
              <Input placeholder="Sök"/>
              {paths}
              <hr className="border-[#FFA6DC] "/>
                <Link className={`${classname} ${type==="feed"?"font-bold":""}`} onClick={()=>setType("feed")} to="/user/home">Flöde</Link>
                <Link className={`${classname} ${type==="follow"?"font-bold":""}`} onClick={()=>setType("follow")} to="/user/home">Följer</Link>
                <Link className={`${classname} ${type==="favorites"?"font-bold":""}`} onClick={()=>setType("favorites")} to="/user/home">Favoriter</Link>
                <Link className={`${classname} ${type==="popular"?"font-bold":""}`} onClick={()=>setType("popular")} to="/user/home">Populära</Link>
              <hr className="border-[#FFA6DC] "/>
              <div className="flex flex-col" >
                  <Link className={`${classname} ${type==="profile"?"font-bold":""}`} onClick={()=>setType("profile")} to={`/user/profile?username=${user.username}`}>Min profil</Link>
                  <Link className={`${classname} `} to={`/logout`}>Logga ut</Link>
              </div>
            </div>
          </nav>
          <div className="w-full max-h-full  overflow-auto" >
            <Outlet context={[category,type]} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Layout;

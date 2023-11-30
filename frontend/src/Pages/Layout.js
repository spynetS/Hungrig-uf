import { Outlet, Link, useNavigate} from "react-router-dom";
import React,{useState, useEffect} from "react"
import logo from '../logo.png';
import Button from "../Components/Button"
import Input from "../Components/Input"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Layout = () => {

  const [category,setCategory] = useState("alla")
  const [type,setType] = useState("feed")

  const classname = " text-2xl italic  "
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setOpen(false)
  },[type,category])

  const paths = [
    "Alla",
    "Vegitariskt",
    "Lunch",
    "Middag",
    "Frukost",
    "Drinkar",
    "Snack",
    "Bakelser"].map((path,i)=>
    <li>
      <Link className={`${classname} ${category==path.toLocaleLowerCase()?"font-bold":""}`} key={i} onClick={()=>setCategory(path.toLocaleLowerCase())} to="/user/home">{path}</Link>
    </li>
  )

  return (
    <div className="flex col w-screen h-screen bg-[#EFEFEF]" >
      <div className=" w-full h-full" >
        <div className="flex flex-row gap-4  md:justify-between items-end " >
          <div className="flex flex-row gap-4 items-center p-2 shadow-lg w-full" >
            <GiHamburgerMenu onClick={()=>setOpen(true)} className="md:hidden text-[#FF60dc]" size={40} />
            <img className="hidden md:block w-[100px]" src={logo}/>
            <h1 className="text-6xl font-bold italic font-Inter text-[#FFA6DC]" >Hungrig UF</h1>
          </div>
          {/* <Button onClick={()=>navigate("/user/create_recipe")} className="w-32 h-10" >Nytt recept</Button> */}
        </div>
        <nav  className={`h-screen w-screen md:hidden z-40 bg-slate-100 top-0 right-0 p-4 fixed ${open?"":"hidden"} `} >
          <div className="flex flex-row gap-2 items-center" >
            <IoClose onClick={()=>setOpen(false)} className="" size={75} />
            <h1 className="text-6xl font-bold italic font-Inter text-[#FFA6DC]" >Hungrig UF</h1>
          </div>
            <ul className="w-full list-none flex flex-col items-center gap-3 h-full"  >
              <Input placeholder="Sök"/>
              {paths}
              <hr className="border-[#FFA6DC] "/>
              <li>
                <Link className={`${classname} ${type==="feed"?"font-bold":""}`} onClick={()=>setType("feed")} to="/user/home">Flöde</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="follow"?"font-bold":""}`} onClick={()=>setType("follow")} to="/user/home">Följer</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="favorites"?"font-bold":""}`} onClick={()=>setType("favorites")} to="/user/home">Favoriter</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="popular"?"font-bold":""}`} onClick={()=>setType("popular")} to="/user/home">Populära</Link>
              </li>
              <hr className="border-[#FFA6DC] "/>
              <div className="flex flex-row items-end " >
                <Link className={classname} to="/user/profile">Min profil</Link>
              </div>
            </ul>
        </nav>

        <div className="flex flex-row max-h-[85%] gap-3">
          <nav className="md:flex hidden px-3 mt-10 w-1/6 " >
            <ul className="list-none flex flex-col gap-3 h-full"  >
              <Input placeholder="Sök"/>
              {paths}
              <hr className="border-[#FFA6DC] "/>
              <li>
                <Link className={`${classname} ${type==="feed"?"font-bold":""}`} onClick={()=>setType("feed")} to="/user/home">Flöde</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="follow"?"font-bold":""}`} onClick={()=>setType("follow")} to="/user/home">Följer</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="favorites"?"font-bold":""}`} onClick={()=>setType("favorites")} to="/user/home">Favoriter</Link>
              </li>
              <li>
                <Link className={`${classname} ${type==="popular"?"font-bold":""}`} onClick={()=>setType("popular")} to="/user/home">Populära</Link>
              </li>
              <hr className="border-[#FFA6DC] "/>
              <div className="flex flex-row items-end " >
                <Link className={classname} to="/user/profile">Min profil</Link>
              </div>
            </ul>
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

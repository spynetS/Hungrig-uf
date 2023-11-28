import React from "react"
import PacmanLoader from "react-spinners/PacmanLoader"

export default function Loading(props){

  if(props.on){
    return(
      <div className="flex items-center justify-center fixed top-0 left-0 bg-opacity-50 w-screen h-screen z-40 bg-white" >
        <PacmanLoader color={"#FF60DC"}  loading={true}/>
      </div>
    )
  }
  return null
}

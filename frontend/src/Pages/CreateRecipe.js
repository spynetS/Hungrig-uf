import React from "react"
import Input from "../Components/Input"


export default function CreateRecipe(props){


  return (
    <div className="flex items-center justify-center" >
      <div className="shadow-lg p-4 grid grid-cols-3 gap-3 " >
        <Input placeholder="Rubrik" />
        <Input placeholder="Beskrivning" />
        <Input placeholder="Tillagnings tid" type="number" />
        <Input placeholder="Serveringar (portioner)" type="number" />
        <Input placeholder="Svårhetsgrad 1-5" type="number" />
        <Input placeholder="Category"  />
        <Input placeholder="Notes"  />
      </div>
    </div>
  );
}

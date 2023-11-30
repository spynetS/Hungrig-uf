import React from "react"
import Button from "../Components/Button"
import {changeUrl} from "../global_func"
import {setCookie} from "../CookieHandler"

export default function HasNotPaid(props){


  return (
    <div className="flex flex-row justify-center w-screen" >
      <div className="flex flex-col w-1/2 h-screen gap-3 justify-center items-center">
        <h1 className="text-center text-lg font-semibold">
          Ditt konto har inte blivit aktiverat ännu.
          Vänta någon minut eller kontakta oss gärna på
          PHONENUMBER
        </h1>
        <Button
          variant="contained"
          onClick={() => {
            changeUrl("/user/home");
          }}
        >
          Testa igen
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCookie("sessionKey","")
              changeUrl("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
    );
}

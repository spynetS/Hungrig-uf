import axios from 'axios';
import {getCookie} from "./CookieHandler.js"

let path = window.location.hostname;

export function getBaseURL(){
  let baseUrl = "http://localhost:8000"
  if (path === "www.techpology.com") {
    baseUrl = "https://cross.techpology.com";
  } else {
    baseUrl = "http://localhost:8000";
  }
  return baseUrl;
}

const instance = axios.create({
  //baseURL: 'http://localhost:8000', // Replace with your API base URL
  baseURL: getBaseURL(), // Replace with your API base URL
  headers: {
    'sessionKey': getCookie("sessionKey"),
    // Add any other default headers you need here
  },
});

export default instance;

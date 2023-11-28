import logo from './logo.svg';
import './App.css';
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import CreateRecipe from "./Pages/CreateRecipe"
import Layout from "./Pages/Layout.js"
import Logout from "./Pages/Logout"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="create_recipe" element={<CreateRecipe />} />
        </Route>
        <Route exact path="logout"     element={<Logout />}></Route>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

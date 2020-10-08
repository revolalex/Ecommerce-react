import React from "react";
import "./App.css";
import LoginComponent from "./Components/Login";
import SignupComponent from "./Components/Signup";
import AddingProductComponent from "./Components/AddingProductComponent"
import { BrowserRouter, Route, Link, Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <AddingProductComponent/> */}
      <SignupComponent />
      {/* <BrowserRouter>
        <Route path="/signup" element={<SignupComponent/>} />
        <Route path="/signin" element={<LoginComponent/>}>
          <Route path="/addproduct" element={<AddingProductComponent  />} />
        </Route>
    </BrowserRouter> */}
    </div>
  );
}

export default App;

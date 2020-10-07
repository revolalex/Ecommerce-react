import React from "react";
import "./App.css";
import LoginComponent from "./Components/Login";
import SignupComponent from "./Components/Signup";
import AddingProductComponent from "./Components/AddingProductComponent"

function App() {
  return (
    <div className="App">
      {/* <LoginComponent/> */}
      <SignupComponent />
      {/* <AddingProductComponent/> */}
    </div>
  );
}

export default App;

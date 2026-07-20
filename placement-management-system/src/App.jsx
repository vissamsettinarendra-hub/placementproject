// import { useState } from 'react';
// import './App.css';
// import Dashboard from './components/Dashboard/Dashboard';
// import Footer from './components/Footer/Footer';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar/sidebar';
// import Home from './pages/Home';
// import Yesbar from './components/Yesbar';
// import Student from './components/student';
//App.jsx  The root component
//Initially everything is displayed from app.jsx
//JSX:

//creating a root component
//js  ---HTML---> JSX
//JSX --- Browser
//Bable --> help to convrt to js
// const NavBar = function(){
//   return(
//     <h1>Placement Management System</h1>
//   )
// }
// const YesBar = function(){
//   const name = "Narendra"
//   return(
//     //can write js in html
//     <div>
//     <h2>Welcome {name}</h2>
//     <p>Visit Our College. Have a Nice Day!</p>
//     </div> 
//   )
// }

//Root Component
// function App(){
//   return(
    //fragement <> </> it is also a div tag
  // <div>
  //   <Navbar />
    /*{<Yesbar
      name= "Narendra"
      year = {2027}/>
    <h1>Welcome To Chalapathi</h1>
    <p>Learn Today and Lead Tomorrow</p>
    <h3>Admissions Are Opened</h3>
    <p>Empower Your Child's Future with Quality Education at Chalapathi.</p>
    <Student 
      name = "Bala Reddy"
      rollno = {"23ht1a05i2"}
      branch = "CSE"
      year = {"4th"} /> }*/
    
    // <Sidebar />
    // <Dashboard /> 
    // <Footer />
    // {/* <Home /> }*/
    
  // </div>
  // )
// }

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Students from "./pages/Student/Student";
import StudentTable from "./pages/Students/StudentTable";
import StudentDetails from "./components/StudentDetails";
import Company from "./pages/Companies/Company";
import NotFound from "./pages/Notfound/NotFound";

function App() {

    const [students] = useState([]);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return (

        <Routes>

            {/* Default Route */}

            <Route
                path="/"
                element={
                    isLoggedIn
                        ? <Navigate to="/Dashboard" />
                        : <Navigate to="/Login" />
                }
            />

            {/* Public Routes */}

            <Route
                path="/Login"
                element={
                    isLoggedIn
                        ? <Navigate to="/Dashboard" />
                        : <Login />
                }
            />

            <Route
                path="/Register"
                element={<Register />}
            />
            <Route path="/Register/:id" element={<Register />} />

            {/* Protected Routes */}

            <Route
                element={
                    isLoggedIn
                        ? <Layout />
                        : <Navigate to="/Login" />
                }
            >

                <Route
                    path="/Dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/Home"
                    element={<Home />}
                />

                <Route
                    path="/Student"
                    element={<Students />}
                />

                <Route
                    path="/StudentTable"
                    element={<StudentTable students={students} />}
                />

                <Route
                    path="/Students/:id"
                    element={<StudentDetails />}
                />

                <Route
                    path="/Companies"
                    element={<Company />}
                />

            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );
}

export default App;
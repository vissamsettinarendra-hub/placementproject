import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import Authentication from "./pages/Authentication/Authentication";

// import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layouts/Layout";

import Home from "./pages/Home";
import Students from "./pages/Student/Student";
import Company from "./pages/Companies/Company";
import EditStudent from "./pages/EditStudent/EditStudents";
import StudentDetails from "./components/StudentDetails";
import NotFound from "./pages/Notfound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
//import ProtectedRoute from "./pages/Students/Protected.Routejsx";

function App() {

    return (

        <Routes>

            {/* Authentication */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/auth/register"
                element={<Authentication />}
            />

            {/* Student Registration */}

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/register/:id"
                element={<Register />}
            />

            <Route
                path="/editstudent/:id"
                element={<EditStudent />}
            />

            {/* Dashboard */}

            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={
                    // <ProtectedRoute>
                        <Dashboard />
                    //</ProtectedRoute> 
                    }
                />
                <Route
                    path="/"
                    element={
                    // <ProtectedRoute>
                        <Dashboard />
                    //</ProtectedRoute> 
                    }
                />

                

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/student"
                    element={<Students />}
                />

                <Route
                    path="/companies"
                    element={<Company />}
                />

                <Route
                    path="/students/:id"
                    element={<StudentDetails />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />
            

        </Routes>

    );

}

export default App;
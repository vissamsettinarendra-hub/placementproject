import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Students from "./pages/Student/Student";
import Company from "./pages/Companies/Company";
import EditStudent from "./pages/EditStudent/EditStudents";
import NotFound from "./pages/Notfound/NotFound";
import StudentDetails from "./components/StudentDetails";

function App() {
    return (
        <Routes>

            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Register/:id" element={<Register />} />
            <Route path="/EditStudent/:id" element={<EditStudent />} />

            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Student" element={<Students />} />
                <Route path="/Companies" element={<Company />} />
                <Route path="/Students/:id" element={<StudentDetails />}/>
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;
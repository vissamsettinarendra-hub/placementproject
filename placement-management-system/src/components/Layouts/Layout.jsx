import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

function Layout() {
    return (
        <>
        <div className="body">
            <Navbar />

            <div className="main">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>

            <Footer />
            </div>
        </>
    );
}

export default Layout;
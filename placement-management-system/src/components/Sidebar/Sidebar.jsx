import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("isLoggedIn");

        window.location.href = "/Login" ;
    }

    return (

        <aside className="sidebar">

            <ul>

                <NavLink to="/Dashboard">
                    <li>🏠 Dashboard</li>
                </NavLink>

                <NavLink to="/Student">
                    <li>🎓 Students</li>
                </NavLink>

                <NavLink to="/Companies">
                    <li>🏢 Companies</li>
                </NavLink>

                <NavLink to="/Placements">
                    <li>💼 Placements</li>
                </NavLink>

                <NavLink to="/Reports">
                    <li>📊 Reports</li>
                </NavLink>

                <NavLink to="/Settings">
                    <li>⚙️ Settings</li>
                </NavLink>

                <li
                    className="logout"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </li>

            </ul>

        </aside>

    );
}

export default Sidebar;
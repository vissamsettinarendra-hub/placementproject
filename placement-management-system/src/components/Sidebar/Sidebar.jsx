import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";


function Sidebar(){


    const navigate = useNavigate();



    function handleLogout(){


        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );


        if(!confirmLogout)
            return;



        localStorage.removeItem("token");

        localStorage.removeItem("user");



        navigate("/Login");


    }



    return (

        <aside className="sidebar">


            <div className="sidebar-logo">

                <h2>
                    🎓 PMS
                </h2>

            </div>



            <ul className="sidebar-menu">


                <NavLink
                to="/Dashboard"
                className={({isActive}) =>
                    isActive ? "active-link" : ""
                }
                >

                    <li>
                        🏠 Dashboard
                    </li>


                </NavLink>




                <NavLink
                to="/Student"
                className={({isActive}) =>
                    isActive ? "active-link" : ""
                }
                >

                    <li>
                        🎓 Students
                    </li>

                </NavLink>




                <NavLink
                to="/Companies"
                className={({isActive}) =>
                    isActive ? "active-link" : ""
                }
                >

                    <li>
                        🏢 Companies
                    </li>


                </NavLink>




                <li
                className="logout-btn"
                onClick={handleLogout}
                >

                    🚪 Logout

                </li>


            </ul>


        </aside>

    );

}


export default Sidebar;
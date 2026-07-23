import "./Navbar.css";

function Navbar({ name = "Admin" }) {

    return (

        <nav className="navbar">


            <div className="logo">

                <h1>
                    Placement Management System
                </h1>

            </div>


            <div className="profile">

                <span>
                    👋 Welcome, {name}
                </span>

            </div>


        </nav>

    );

}

export default Navbar;
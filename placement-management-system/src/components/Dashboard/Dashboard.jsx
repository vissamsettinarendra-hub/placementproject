import { useEffect, useState } from "react";
import api from "../../api/api";
import Clock from "../Clock/Clock";
import "./Dashboard.css";

function Dashboard() {

    const [name, setName] = useState("Student");
    const [newName, setNewName] = useState("");

    const [dashboard, setDashboard] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        eligibleStudents: 0,
        averageCGPA: 0,
    });

    const [loading, setLoading] = useState(true);

    function changeName() {
        if (!newName.trim()) {
            alert("Please enter your name.");
            return;
        }

        setName(newName);
        setNewName("");
    }

    useEffect(() => {

        async function fetchDashboard() {

            try {

                const response = await api.get("/dashboard");

                setDashboard(response.data.dashboard);

            } catch (error) {

                console.log(error);

                alert("Failed to load Dashboard");

            } finally {

                setLoading(false);

            }

        }

        fetchDashboard();

    }, []);

    if (loading) {
        return <h2>Loading Dashboard...</h2>;
    }

    return (
        <div className="dashboard">

            <h1>
                Welcome Back {name} 👋
            </h1>

            <Clock />

            <div className="welcome-box">

                <input
                    className="name-input"
                    placeholder="Enter Your Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <button
                    className="name-btn"
                    onClick={changeName}
                >
                    Change Name
                </button>

            </div>

            <div className="cards">

                <div className="card students">
                    <h2>{dashboard.totalStudents}</h2>
                    <p>Total Students</p>
                </div>

                <div className="card companies">
                    <h2>{dashboard.totalCompanies}</h2>
                    <p>Total Companies</p>
                </div>

                <div className="card placed">
                    <h2>{dashboard.eligibleStudents}</h2>
                    <p>Eligible Students</p>
                </div>

                <div className="card pending">
                    <h2>{dashboard.averageCGPA}</h2>
                    <p>Average CGPA</p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;
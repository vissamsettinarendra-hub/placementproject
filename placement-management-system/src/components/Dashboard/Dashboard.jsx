import Clock from "../Clock/Clock";
import "./Dashboard.css";
import { useState,useEffect } from "react";

function Dashboard() {

  // Welcome Name
  const [name, setName] = useState("Student");
  const [newName, setNewName] = useState("");

  // Dashboard Counts
  const [students, setStudents] = useState(250);
  const [companies, setCompanies] = useState(35);
  const [placed, setPlaced] = useState(180);
  const [pending, setPending] = useState(70);

  // Change Welcome Name
  function changeName() {

    if (newName.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    setName(newName);
    setNewName("");
  }
  useEffect(()=>{
    const loginStatus = localStorage.getItem("isLoggedIn");
    console.log(loginStatus)
  },[]);

  return (
    <div className="dashboard">

      <h1>
        Welcome Back {name} <span className="wave">👋</span>
      </h1>
      <Clock />

      <div className="welcome-box">

        <input
          type="text"
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

        {/* Students */}
        <div className="card students">

          <h2>{students}</h2>
          <p>Total Students</p>

          <div className="btn-group">

            <button
              className="sub"
              onClick={() => setStudents((prev) => Math.max(prev - 1, 0))}
            >
              - Remove
            </button>

            <button
              className="add"
              onClick={() => setStudents((prev) => prev + 1)}
            >
              + Add
            </button>

          </div>

        </div>

        {/* Companies */}
        <div className="card companies">

          <h2>{companies}</h2>
          <p>Companies</p>

          <div className="btn-group">

            <button
              className="sub"
              onClick={() => setCompanies((prev) => Math.max(prev - 1, 0))}
            >
              - Remove
            </button>

            <button
              className="add"
              onClick={() => setCompanies((prev) => prev + 1)}
            >
              + Add
            </button>

          </div>

        </div>

        {/* Placed Students */}
        <div className="card placed">

          <h2>{placed}</h2>
          <p>Placed Students</p>

          <div className="btn-group">

            <button
              className="sub"
              onClick={() => setPlaced((prev) => Math.max(prev - 1, 0))}
            >
              - Remove
            </button>

            <button
              className="add"
              onClick={() => setPlaced((prev) => prev + 1)}
            >
              + Add
            </button>

          </div>

        </div>

        {/* Pending Students */}
        <div className="card pending">

          <h2>{pending}</h2>
          <p>Pending Students</p>

          <div className="btn-group">

            <button
              className="sub"
              onClick={() => setPending((prev) => Math.max(prev - 1, 0))}
            >
              - Remove
            </button>

            <button
              className="add"
              onClick={() => setPending((prev) => prev + 1)}
            >
              + Add
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
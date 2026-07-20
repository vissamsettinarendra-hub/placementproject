import { Link, useNavigate, useParams } from "react-router-dom";
import "./Register.css";
import { useState, useEffect } from "react";
import api from "../../api/api";

function Register() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [studentName, setStudentName] = useState("");
    const [rollno, setRollno] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [year, setYear] = useState("");

    const [errors, setErrors] = useState({});

    // Load Student for Edit
    useEffect(() => {

        if (id) {
            getStudent();
        }

    }, [id]);

    async function getStudent() {

        try {

            const response = await api.get(`/students/${id}`);

            const student = response.data;

            setStudentName(student.studentName);
            setRollno(student.rollno);
            setEmail(student.email);
            setPhone(student.phone);
            setBranch(student.branch);
            setCgpa(student.cgpa);
            setYear(student.year);

        } catch (error) {

            console.log(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const student = {
            studentName,
            rollno: Number(rollno),
            email,
            phone,
            branch,
            cgpa: Number(cgpa),
            year: Number(year)
        };

        try {

            if (id) {

                const response = await api.put(`/students/${id}`, student);

                alert(response.data.message);

            }
            else {

                const response = await api.post("/students", student);

                alert(response.data.message);

            }

            navigate("/Student");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");

        }

    }

    function handleReset() {

        setStudentName("");
        setRollno("");
        setEmail("");
        setPhone("");
        setBranch("");
        setCgpa("");
        setYear("");
        setErrors({});

    }

    return (

        <div className="register">

            <h1>
                {id ? "Edit Student" : "Student Registration"}
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Roll Number"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >

                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="CSE-AI">CSE-AI</option>
                    <option value="CSE-DS">CSE-DS</option>
                    <option value="CSE-CS">CSE-CS</option>
                    <option value="ECE">ECE</option>

                </select>

                <input
                    type="number"
                    placeholder="CGPA"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    step="0.01"
                    min="0"
                    max="10"
                />

                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >

                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>

                </select>

                <div className="buttons">

                    <button type="submit">

                        {id ? "Update Student" : "Register"}

                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                    >

                        Reset

                    </button>

                </div>

            </form>

            <Link to="/Login">

                Already have an account? Login

            </Link>

        </div>

    );

}

export default Register;
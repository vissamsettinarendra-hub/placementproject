import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./Register.css";

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

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (id) {
            fetchStudent();
        }

    }, [id]);

    async function fetchStudent() {

        try {

            const response = await api.get(`/students/${id}`);

            const student = response.data.student;

            setStudentName(student.studentName);
            setRollno(student.rollno);
            setEmail(student.email);
            setPhone(student.phone);
            setBranch(student.branch);
            setCgpa(student.cgpa);
            setYear(student.year);

        } catch (error) {

            console.log(error);

            alert("Failed to load student");

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (
            !studentName ||
            !rollno ||
            !email ||
            !phone ||
            !branch ||
            !cgpa ||
            !year
        ) {
            alert("Please fill all fields");
            return;
        }

        const student = {
            studentName,
            rollno: Number(rollno),
            email,
            phone,
            branch,
            cgpa: Number(cgpa),
            year: Number(year),
        };

        try {

            setLoading(true);

            if (id) {

                const response = await api.put(`/students/${id}`, student);

                alert(response.data.message);

            } else {

                const response = await api.post("/students", student);

                alert(response.data.message);

            }

            navigate("/Student");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

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

    }

    return (

        <div className="register">

            <h1>
                {id ? "Update Student" : "Student Registration"}
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) =>
                        setStudentName(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Roll Number"
                    value={rollno}
                    onChange={(e) =>
                        setRollno(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

                <select
                    value={branch}
                    onChange={(e) =>
                        setBranch(e.target.value)
                    }
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
                    step="0.01"
                    placeholder="CGPA"
                    value={cgpa}
                    onChange={(e) =>
                        setCgpa(e.target.value)
                    }
                />

                <select
                    value={year}
                    onChange={(e) =>
                        setYear(e.target.value)
                    }
                >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>

                <div className="buttons">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please Wait..."
                            : id
                                ? "Update Student"
                                : "Register Student"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                </div>

            </form>

        </div>

    );

}

export default Register;
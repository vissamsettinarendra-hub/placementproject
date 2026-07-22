import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();
    const { id } = useParams();

    const fileRef = useRef(null);

    const [student, setStudent] = useState(null);

    const [studentName, setStudentName] = useState("");
    const [rollno, setRollno] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [year, setYear] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, [id]);

    async function fetchStudent() {

        try {

            const response = await api.get(`/students/${id}`);

            const data = response.data.student;

            setStudent(data);

            setStudentName(data.studentName);
            setRollno(data.rollno);
            setEmail(data.email);
            setPhone(data.phone);
            setBranch(data.branch);
            setCgpa(data.cgpa);
            setYear(data.year);

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

        const formData = new FormData();

        formData.append("studentName", studentName);
        formData.append("rollno", rollno);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("branch", branch);
        formData.append("cgpa", cgpa);
        formData.append("year", year);

        if (image) {
            formData.append("image", image);
        }

        try {

            setLoading(true);

            let response;

            if (id) {

                response = await api.put(
                    `/students/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            } else {

                response = await api.post(
                    "/students",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            }

            alert(response.data.message);

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
        setImage(null);

        if (fileRef.current) {
            fileRef.current.value = "";
        }

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
                    step="0.01"
                    placeholder="CGPA"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
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

                {id && student?.image && (
                    <div className="preview-image">
                        <p>Current Image</p>

                        <img
                            src={`http://localhost:8000/uploads/${student.image}`}
                            alt="Student"
                            width="120"
                        />
                    </div>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

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
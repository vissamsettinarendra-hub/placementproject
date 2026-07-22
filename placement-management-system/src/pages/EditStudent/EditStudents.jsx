import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../Registration/Register.css";

function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [studentName, setStudentName] = useState("");
    const [rollno, setRollno] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [year, setYear] = useState("");

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStudent();
    }, []);

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

            if (student.image) {
                setPreview(
                    `http://localhost:8000/uploads/${student.image}`
                );
            }

        } catch (error) {

            console.log(error);
            alert("Failed to load student");

        }

    }

    async function handleUpdate(e) {

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

        try {

            setLoading(true);

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

            const response = await api.put(
                `/students/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message);

            navigate("/Student");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="register">

            <h1>Edit Student</h1>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    value={studentName}
                    placeholder="Student Name"
                    onChange={(e) => setStudentName(e.target.value)}
                />

                <input
                    type="number"
                    value={rollno}
                    placeholder="Roll Number"
                    onChange={(e) => setRollno(e.target.value)}
                />

                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    value={phone}
                    placeholder="Phone"
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
                    value={cgpa}
                    placeholder="CGPA"
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

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        width="120"
                        height="120"
                        style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "10px",
                        }}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                        const file = e.target.files[0];

                        setImage(file);

                        if (file) {
                            setPreview(URL.createObjectURL(file));
                        }

                    }}
                />

                <div className="buttons">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Student"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/Student")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );
}

export default EditStudent;
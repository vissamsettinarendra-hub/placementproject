import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./StudentDetails.css";

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudent();
    }, [id]);

    async function fetchStudent() {
        try {
            const response = await api.get(`/students/${id}`);
            setStudent(response.data.student);
        } catch (error) {
            console.log(error);
            alert("Failed to load student");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Loading Student...</h2>;
    }

    if (!student) {
        return <h2>Student Not Found</h2>;
    }

    return (
        <div className="student-details">

            <h1>Student Details</h1>

            {student.image && (
                <div className="student-image">
                    <img
                        src={`http://localhost:8000/uploads/${student.image}`}
                        alt={student.studentName}
                    />
                </div>
            )}

            <div className="details-card">

                <p><strong>Name:</strong> {student.studentName}</p>

                <p><strong>Roll No:</strong> {student.rollno}</p>

                <p><strong>Email:</strong> {student.email}</p>

                <p><strong>Phone:</strong> {student.phone}</p>

                <p><strong>Branch:</strong> {student.branch}</p>

                <p><strong>CGPA:</strong> {student.cgpa}</p>

                <p><strong>Year:</strong> {student.year}</p>

            </div>

            <button
                className="back-btn"
                onClick={() => navigate("/Student")}
            >
                ← Back
            </button>

        </div>
    );
}

export default StudentDetails;
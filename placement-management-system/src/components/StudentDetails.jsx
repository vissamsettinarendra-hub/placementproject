import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function StudentDetails() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchStudent();
    }, []);

    async function fetchStudent() {

        try {

            const response = await api.get(`/students/${id}`);

            setStudent(response.data.student);

        } catch (error) {

            console.log(error);

            alert("Failed to load student");

        }

    }

    if (!student) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="student-details">

            <h1>Student Details</h1>

            <p><strong>Name:</strong> {student.studentName}</p>
            <p><strong>Roll No:</strong> {student.rollno}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>CGPA:</strong> {student.cgpa}</p>
            <p><strong>Year:</strong> {student.year}</p>

        </div>
    );
}

export default StudentDetails;
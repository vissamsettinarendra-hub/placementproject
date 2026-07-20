import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentTable from "../Students/StudentTable";
import "./Student.css";
import api from "../../api/api";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    
    async function fetchStudents() {

        try {

            setLoading(true);

            const response = await api.get("/students");

            setStudents(response.data.students);

        } catch (error) {

            console.log(error);

            alert("Failed to fetch students.");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchStudents();

    }, []);

   
    async function deleteStudent(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            const response = await api.delete(`/students/${id}`);

            alert(response.data.message);

            fetchStudents();

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Delete Failed");

        }

    }

    const filteredStudents = students.filter((student) => {

        return (

            student.studentName
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            student.rollno
                .toString()
                .includes(search) ||

            student.email
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            student.branch
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });
    async function fetchStudent(){
        try{
            const response = await api.get(`/students/${id}`);
            const student =  response.data.student;
            setStudentName(student.studentName);
            setEmail(student.email);
            setBranch(student.branch);
            setCgpa(student.cgpa);
        }
        catch(error){
            console.log(error)
        }
        useEffect(()=>{
            updateStudent
        },[])
    }
        
    

    async function updateStudent(e) {

    e.preventDefault();

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

        alert(error.response?.data?.message || "Something went wrong");

    }

}

    if (loading) {

        return <h2>Loading Students...</h2>;

    }
    
    return (

        <div className="student-page">

            <h1>Student Management</h1>

            <p>Manage all registered students here.</p>

            <div className="student-header">

                <Link to="/Register">

                    <button className="add-btn">

                        + Add New Student

                    </button>

                </Link>

                <input
                    type="text"
                    className="search-bar"
                    placeholder="🔍 Search by Name, Roll No, Email, Branch"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <StudentTable
                students={filteredStudents}
                deleteStudent={deleteStudent}
            />

        </div>

    );

}

export default Students;
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentTable from "../Students/StudentTable";
import api from "../../api/api";
import "./Student.css";

function Student() {
    const [sortField,setSortField] = useState("studentname")
    const [order,setOrder]=useState("asc");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");

    const limit = 5;

    useEffect(() => {
        fetchStudents(1);
    }, []);

    async function fetchStudents(pageNumber = 1) {

        try {

            setLoading(true);

            const response = await api.get(
                `/students?page=${pageNumber}&limit=${limit}&sort=${sortField}&order=${order}`);

            setStudents(response.data.students);
            setPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.log(error);
            alert("Failed to fetch students");

        } finally {

            setLoading(false);

        }

    }

    async function searchStudents(value) {

        setSearch(value);

        if (value.trim() === "") {

            fetchStudents(1);
            return;

        }

        try {

            const response = await api.get(
                `/students/search?q=${value}`
            );

            setStudents(response.data.students);

        } catch (error) {

            console.log(error);

        }

    }

    async function deleteStudent(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            const response = await api.delete(`/students/${id}`);

            alert(response.data.message);

            fetchStudents(page);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    }

    if (loading) {
        return <h2>Loading Students...</h2>;
    }

    return (

        <div className="student-page">

            <div className="student-header">

                <div>
                    <h1>Student Management</h1>
                    <p>Manage all registered students.</p>
                </div>

                <Link to="/Register">
                    <button className="add-btn">
                        + Add Student
                    </button>
                </Link>

            </div>

            <input
                type="text"
                className="search-bar"
                placeholder="Search Student..."
                value={search}
                onChange={(e) => searchStudents(e.target.value)}
            />

            <StudentTable
                students={students}
                deleteStudent={deleteStudent}
            />

            {/* Pagination */}

            {search === "" && (
                <div className="pagination">

                    <button
                        disabled={page === 1}
                        onClick={() => fetchStudents(page - 1)}
                    >
                        ◀ Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => fetchStudents(page + 1)}
                    >
                        Next ▶
                    </button>

                </div>
            )}

        </div>

    );
}

export default Student;
import { Link } from "react-router-dom";
import "./StudentTable.css";

function StudentTable({ students, deleteStudent }) {

    return (
        students.length === 0 ? (

            <h3 className="no-data">No Students Registered</h3>

        ) : (

            <table className="student-table">

                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map((student, _id) => (

                        <tr key={student._id}>

                            <td>{student._id + 1}</td>
                            <td>{student.studentName}</td>
                            <td>{student.rollNo}</td>
                            <td>{student.email}</td>
                            <td>{student.password}</td>
                            <td>{student.branch}</td>
                            <td>{student.cgpa}</td>
                            <td>{student.year}</td>

                            <td className="action-buttons">

                                <Link to={`/Students/${student._id}`}>
                                    <button className="view-btn">
                                        View
                                    </button>
                                </Link>

                                <Link to={`/Register/${student._id}`}>
                                    <button className="edit-btn">
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you want to delete this student?"
                                            )
                                        ) {
                                            deleteStudent(student._id);
                                        }
                                    }}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        )
    );
}

export default StudentTable;
import { Link } from "react-router-dom";
import "./StudentTable.css";

function StudentTable({
    students,
    deleteStudent,
    page = 1,
    limit = 5,
}) {

    if (!students || students.length === 0) {
        return <h2 className="no-data">No Students Found</h2>;
    }

    return (
        <div className="table-container">

            <table className="student-table">

                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map((student, index) => (

                        <tr key={student._id}>

                            <td>{(page - 1) * limit + index + 1}</td>

                            <td>
                                <img
                                    src={`http://localhost:8000/uploads/${student.image}`}
                                    alt={student.studentName}
                                    className="student-image"
                                />
                            </td>

                            <td>{student.studentName}</td>
                            <td>{student.rollno}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.branch}</td>
                            <td>{student.cgpa}</td>
                            <td>{student.year}</td>

                            <td className="action-buttons">

                                <Link to={`/Students/${student._id}`}>
                                    <button className="view-btn">
                                        View
                                    </button>
                                </Link>

                                <Link to={`/EditStudent/${student._id}`}>
                                    <button className="edit-btn">
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteStudent(student._id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default StudentTable;
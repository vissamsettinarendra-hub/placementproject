import "./StudentDetails.css";
import { useParams } from "react-router-dom"
function StudentDetails() {
    const {id} = useParams();
    return(
        <div>
            <h1>Student Details</h1>
            <hr />
            <h2>Student Id: {id}</h2>
          
        </div>
    )
}
export default StudentDetails;
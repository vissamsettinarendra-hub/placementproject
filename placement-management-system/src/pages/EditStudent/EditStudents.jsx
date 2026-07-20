import { useState } from "react";
import { useParams } from "react-router-dom";

function EditStudent({students,setstudents}){
    const {id} = useParams();
    const student = students.find((s)=>s.id === Number(id));
    const [name,setName] = useState(student?.name || "");
    const [email,setEmail] = useState(student?.email || "");
    return(
        <div>
        <h1>Do you want to edit me?</h1>
        <form>
            <input  value={name} 
            onChange={(e)=>setName(e.target.value)}
            />
            <input  value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            />
        </form>
        </div>

    )
}
export default EditStudent ;
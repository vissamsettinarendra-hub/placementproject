import { useState } from "react";
import { useState } from "react";
function authRegister(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState(null);
    return(
        <form>
            <input
            type ="text"
            placeholder ="Full Name"
            value={name}
            onChange={()=>setName(e.target.value)}

            />
             <input
            type ="text"
            placeholder ="Full Name"
            value={name}
            onChange={()=>setEmail(e.target.value)}
            
            />
            <input
            type ="text"
            placeholder ="Full Name"
            value={name}
            onChange={()=>setPassword(e.target.value)}
            
            />
            <select value="role"
            onChange={(e)=>setRole(e.target.value)}>
                <option>Admin</option>
                <option>Student</option>

            </select>
        </form>
    )

    

}
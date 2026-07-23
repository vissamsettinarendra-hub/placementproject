import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginAdmin } from "../../api/api";

import "./Login.css";


function Login() {


    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        email: "",
        password: "",

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };




    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            const response = await loginAdmin(formData);



            if(response.data.success){


                // Store JWT Token

                localStorage.setItem(
                    "token",
                    response.data.token
                );



                // Store Admin Details

                localStorage.setItem(
                    "admin",
                    JSON.stringify(response.data.admin)
                );



                alert(
                    "Login Successful"
                );



                navigate("/dashboard");


            }



        }
        catch(error){


            alert(

                error.response?.data?.message ||
                "Login Failed"

            );


        }


    };




    return (

        <div className="login-container">


            <div className="login-box">


                <h2>
                    Admin Login
                </h2>




                <form onSubmit={handleSubmit}>


                    <input

                        type="email"

                        name="email"

                        placeholder="Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />



                    <input

                        type="password"

                        name="password"

                        placeholder="Enter Password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />



                    <button type="submit">

                        Login

                    </button>



                    <p>

                        Don't have an account?


                        <Link to="/auth/register">

                            Create Account

                        </Link>


                    </p>



                </form>


            </div>


        </div>

    );

}


export default Login;
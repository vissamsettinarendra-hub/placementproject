import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {registerUser} from "../../api/api";

function Authentication() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            const response = await registerUser({

            name,

            email,

            password,

            role

            });

            alert(response.data.message);

            setName("");
            setEmail("");
            setPassword("");
            setRole("student");

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="auth-register">

            <h2>User Registration</h2>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                >
                    <option value="student">
                        Student
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Registering..."
                        : "Register"}
                </button>

            </form>

            <p>

                Already have an account?{" "}

                <Link to="/login">
                    Login
                </Link>

            </p>

        </div>

    );

}

export default Authentication;
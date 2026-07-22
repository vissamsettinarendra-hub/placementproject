import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter Email and Password");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/admin/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLoggedIn", "true");

            alert(response.data.message || "Login Successful");

            navigate("/Dashboard", { replace: true });

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <form
                className="login-form"
                onSubmit={handleLogin}
            >
                <h2>Admin Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging In..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
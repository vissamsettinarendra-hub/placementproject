import "./Home.css";

function Home() {
    return (
        <div className="home">

            <h1>Welcome to Placement Management System</h1>

            <p>
                Manage students, companies, placements, and reports
                efficiently through a single platform.
            </p>

            <div className="home-cards">

                <div className="home-card">
                    <h2>🎓 Students</h2>
                    <p>View and manage all registered students.</p>
                </div>

                <div className="home-card">
                    <h2>🏢 Companies</h2>
                    <p>Manage companies visiting the campus.</p>
                </div>

                <div className="home-card">
                    <h2>💼 Placements</h2>
                    <p>Track placement activities and results.</p>
                </div>

                <div className="home-card">
                    <h2>📊 Reports</h2>
                    <p>Generate placement statistics and reports.</p>
                </div>

            </div>

        </div>
    );
}

export default Home;
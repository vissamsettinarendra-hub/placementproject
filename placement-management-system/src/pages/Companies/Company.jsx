import CompanyTable from "./CompanyTable";

function Company() {

    const companies = [
        {
            id: 1,
            companyName: "Google",
            ctc: "20 LPA",
            placedStudents: 2
        },
        {
            id: 2,
            companyName: "Microsoft" ,
            ctc: "18 LPA",
            placedStudents: 4
        },
        {
            id: 3,
            companyName: "Amazon",
            ctc: "22 LPA",
            placedStudents: 3
        },
        {
            id: 4,
            companyName: "TCS",
            ctc: "7 LPA",
            placedStudents: 12
        }
    ];

    return (
        <>
            <h1>Company Management</h1>
            <p>Manage all recruiting companies here.</p>

            <table border="1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th>CTC</th>
                        <th>Placed Students</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        companies.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.companyName}</td>
                                <td>{company.ctc}</td>
                                <td>{company.placedStudents}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <CompanyTable companies={companies} />
        </>
        
    );
}

export default Company;
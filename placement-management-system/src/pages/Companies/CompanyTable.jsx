import "./CompanyTable.css";

function CompanyTable({ companies }) {

    return (

        companies.length === 0 ? (

            <h3>No Companies Available</h3>

        ) : (

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

        )

    ) ;
}

export default CompanyTable;
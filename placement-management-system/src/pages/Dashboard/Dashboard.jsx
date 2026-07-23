import { useEffect, useState } from "react";

import { getDashboard } from "../../api/api";

import "./Dashboard.css";


function Dashboard() {


    const [data,setData] = useState({

        totalStudents:0,

        totalCompanies:0,

        eligibleStudents:0,

        averageCGPA:0,

    });



    useEffect(()=>{

        fetchDashboard();

    },[]);



    async function fetchDashboard(){

        try{

            const response = await getDashboard();


            console.log(response.data);



            if(response.data.success){

                setData(
                    response.data.dashboard
                );

            }


        }
        catch(error){

            console.log(error);

        }

    }



    return(

        <div className="dashboard">


            <h1>
                Admin Dashboard
            </h1>



            <div className="card-container">


                <div className="card">

                    <h3>
                        Total Students
                    </h3>

                    <p>
                        {data.totalStudents}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        Total Companies
                    </h3>

                    <p>
                        {data.totalCompanies}
                    </p>

                </div>




                <div className="card">

                    <h3>
                        Eligible Students
                    </h3>

                    <p>
                        {data.eligibleStudents}
                    </p>

                </div>




                <div className="card">

                    <h3>
                        Average CGPA
                    </h3>

                    <p>
                        {data.averageCGPA}
                    </p>

                </div>



            </div>


        </div>

    );

}


export default Dashboard;
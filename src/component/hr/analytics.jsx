// // // import React, { Component } from "react";
// // // import { Form, Button, Col, Row } from "react-bootstrap";
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   PieChart,
// // //   Pie,
// // // } from "recharts";
// // //
// // // class analytics extends Component {
// // //
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       data: [
//         { x: "A", y: 10 },
//         { x: "B", y: 20 },
//         { x: "C", y: 30 },
//         { x: "D", y: 40 }
//       ]
//     };
//   }
// // //
// // // ///analytics/employee-gender-count
// // //
// getData = () => {
//        axios
//           .get(process.env.REACT_APP_API_URL + "/analytics/employee-gender-count", {
//             headers: {
//               authorization: localStorage.getItem("token") || ""
//             }
//           })
//           .then(response => {
//             console.log("response : ",response.data);
//             this.setState({data : response.data});
//             console.log(this.state.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
// }
// // //
//   componentDidMount() {
//     this.animate();
//     this.getData();
//   }
// // //
// // //   animate() {
// // //     const newData = [
// // //       { x: "A", y: 20 },
// // //       { x: "B", y: 30 },
// // //       { x: "C", y: 40 },
// // //       { x: "D", y: 50 }
// // //     ];
// // //     this.setState({ data: newData });
// // //   }
// // //
// // //   render() {
// // //     return (
// // //       <React.Fragment>
// // //         <h2 id="role-title">Analytics</h2>
// // // {/*         <BarChart */}
// // // {/*           width={520} */}
// // // {/*           height={300} */}
// // // {/*           data={this.state.data} */}
// // // {/*           margin={{ */}
// // // {/*             top: 5, */}
// // // {/*             right: 30, */}
// // // {/*             left: 20, */}
// // // {/*             bottom: 5, */}
// // // {/*           }} */}
// // // {/*           barSize={20} */}
// // // {/*         > */}
// // // {/*           <XAxis dataKey="count" scale="point" padding={{ left: 10, right: 10 }} /> */}
// // // {/*           <YAxis /> */}
// // // {/*           <Tooltip /> */}
// // // {/*           <Legend /> */}
// // // {/*           <CartesianGrid strokeDasharray="3 3" /> */}
// // // {/*           <Bar */}
// // // {/*             dataKey="gender" */}
// // // {/*             fill="rgb(88 99 161)" */}
// // // {/*             background={{ fill: "#eee" }} */}
// // // {/*           /> */}
// // // {/*         </BarChart> */}
// // //
// // // <div>
// // // <h5 id="role-title"> Male to Female Ratio</h5>
// // //
// // // <PieChart width={300} height={300}>
// // //   <Pie
// // //     dataKey="count"
// // //     isAnimationActive={true}
// // //     data={this.state.data}
// // //     cx="50%"
// // //     cy="50%"
// // //     outerRadius={90}
// // //     fill="rgb(88 99 161)"
// // //     label={(entry) => entry.gender}
// // //   />
// // //   <Tooltip />
// // // </PieChart>
// // // </div>
// // //
// // //       </React.Fragment>
// // //     );
// // //   }
// // // }
// // //
// // // export default analytics;
// //
// //
// // import React, { Component } from "react";
// // import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
// //
// // class analytics extends Component {
// //   render() {
// //     return (
// //       <VictoryChart
// //         domainPadding={30}
// //         animate={{ duration: 1000 }}
// //         height={400}
// //       >
// //         <VictoryAxis
// //           tickValues={[1, 2, 3, 4]}
// //           tickFormat={["Category 1", "Category 2", "Category 3", "Category 4"]}
// //         />
// //         <VictoryAxis dependentAxis />
// //         <VictoryBar
// //           data={[
// //             { x: 1, y: 10 },
// //             { x: 2, y: 15 },
// //             { x: 3, y: 20 },
// //             { x: 4, y: 25 },
// //           ]}
// //           style={{
// //             data: {
// //               fill: "rgb(88, 99, 161)",
// //               width: 25,
// //             },
// //           }}
// //           labels={({ datum }) => datum.y}
// //           labelComponent={<VictoryLabel dy={-10} />}
// //         />
// //       </VictoryChart>
// //     );
// //   }
// // }
// //
// // export default analytics;
//
// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
//
// function SalaryGraph() {
//   const [employees, setEmployees] = useState([]);
//   const [salaryData, setSalaryData] = useState({});
//
//   useEffect(() => {
//     // Fetch all employees and their associated salaries from the server
//     axios.get('/api/employeeSalary')
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);
//
//   useEffect(() => {
//     if (employees.length > 0) {
//       // Calculate the average salary for each role
//       const roles = Array.from(new Set(employees.map(employee => employee.role)));
//       const roleSalaries = roles.map(role => {
//         const filteredEmployees = employees.filter(employee => employee.role === role);
//         const totalSalary = filteredEmployees.reduce((sum, employee) => {
//           return sum + employee.salary.amount;
//         }, 0);
//         const averageSalary = totalSalary / filteredEmployees.length;
//         return averageSalary;
//       });
//
//       // Set the salary data state
//       setSalaryData({
//         labels: roles,
//         datasets: [
//           {
//             label: 'Average Salary',
//             data: roleSalaries,
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           }
//         ]
//       });
//     }
//   }, [employees]);
//
//   return (
//     <div>
//       <h2>Salary Graph</h2>
//       {salaryData.labels &&
//         <Line data={salaryData} />
//       }
//     </div>
//   );
// }
//
// export default SalaryGraph;

import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictorySharedEvents, VictoryPie  } from 'victory';

class ChartComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

    getData = () => {
           axios
              .get(process.env.REACT_APP_API_URL + "/department-salary", {
                headers: {
                  authorization: localStorage.getItem("token") || ""
                }
              })
              .then(response => {
                console.log("response : ",response.data);
                this.setState({data : response.data});
                console.log(this.state.data);
              })
              .catch(error => {
                console.log(error);
              });
    }
      componentDidMount() {
        this.getData();
      }

  render() {
    const data = [      { department: 'Department 1', salary: 50000 },      { department: 'Department 2', salary: 52000 },      { department: 'Department 3', salary: 55000 },      { department: 'Department 4', salary: 56000 },      { department: 'Department 5', salary: 58000 },    ];

    return (
      <div>
        <h2>Salary vs Department</h2>
        <svg viewBox="0 0 700 700">
          <VictorySharedEvents
            events={[{              childName: ["pie", "bar"],
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [{                    childName: ["pie", "bar"],
                    mutation: (props) => {
                      return {
                        style: Object.assign({}, props.style, {fill: "tomato"})
                      };
                    }
                  }];
                },
                onMouseOut: () => {
                  return [{                    childName: ["pie", "bar"],
                    mutation: () => {
                      return null;
                    }
                  }];
                }
              }
            }]}
          >
            <g transform={"translate(300, 0)"}>
              <VictoryBar name="bar"
                width={300}
                standalone={false}
                style={{
                  data: { width: 20 },
                  labels: {fontSize: 25}
                }}
                data={[                  {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}                ]}
                labels={["a", "b", "c", "d"]}
                labelComponent={<VictoryLabel y={290}/>}
              />
            </g>
            <g transform={"translate(0, -75)"}>
              <VictoryPie name="pie"
                width={250}
                standalone={false}
                style={{ labels: {fontSize: 25, padding: 10}}}
                data={[                  {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}                ]}
              />
            </g>
          </VictorySharedEvents>
        </svg>
      </div>
    );
  }
}

export default ChartComponent;


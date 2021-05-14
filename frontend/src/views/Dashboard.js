/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import swal from 'sweetalert';


// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

const Dashboard = (props) => {
  // const [bigChartData, setbigChartData] = React.useState("data1");
  // const setBgChartData = (name) => {
  //   setbigChartData(name);
  // };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [alert, setAlert] = useState(null);
  const [taskList, setTaskList] = useState(['Wash Dishes']);
  const [timeList, setTimeList] = useState(['Tuesday 3pm']);
  const [currentTask, setCurrentTask] = useState('');
  const hideAlert = () => {
    setAlert(null)
  }
  const toggleAlert = async () => {

    let value = await swal({
      content: "input",
    })
    console.log(value)

    let newTaskList = taskList;
    let newTimeList = timeList;

    //create the standard format date 
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    var dateTime =  day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    if (value != '') {
      newTaskList.push(value);
      newTimeList.push(dateTime);
    }




    await setTaskList([...newTaskList]);
    await setTimeList([...newTimeList]);
    console.log(taskList);


  }
  useEffect(() => {
    setTaskList([]);
    setTimeList([])
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">

          </Col>
        </Row>
        <Row>
          <Col lg="4">

          </Col>
          <Col lg="4">

          </Col>
          <Col lg="4">

          </Col>
        </Row>
        <Row>

          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Entry list</CardTitle>
              </CardHeader>
              <CardBody>
                <Button className="btn-fill" color="primary" type=" button" onClick={toggleAlert}>
                  Add Entry
                </Button>


                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Entry</th>
                      <th></th>
                      <th>Time added</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskList.map((task, index) => (
                      <tr key={index} id={index}>
                        <td>{task}</td>
                        <td></td>
                        <td>{timeList[index]}</td>
                        <td className="text-center"> <Button
                          color="link"
                          id="tooltip457194718"
                          title=""
                          type="button"
                        ><i className="tim-icons icon-pencil" /> </Button></td>
                      </tr>
                    ))}


                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>

      </div>
    </>
  );
}

export default Dashboard;

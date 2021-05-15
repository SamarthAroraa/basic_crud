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
import { useHistory } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import qs from 'qs';


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
import auth from 'utils/auth'


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
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const [alert, setAlert] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const hideAlert = () => {
    setAlert(null)
  }
  const toggleAlert = async () => {

    let value = await swal({
      content: "input",
    })
    // console.log(value)

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

    var dateTime = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    //create item
    if (value != '') {
      newTaskList.push(value);
      newTimeList.push(dateTime);
      var data = qs.stringify({
        'title': `${value}`,
        'timeAdded': `${dateTime}`
      });
      var config = {
        method: 'post',
        url: process.env.REACT_APP_API_URI+'entries',
        headers: {
          'Authorization': `Bearer ${auth.getToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    await setTaskList([...newTaskList]);
    await setTimeList([...newTimeList]);
    // console.log(taskList);
  }

  const editItem = async (idx) => {
    let value = await swal({
      content: "input",
    })
    let old = taskList;
    old[idx] = value;
    setTaskList([...old]);
    var data = qs.stringify({
      'title': `${value}`,
      'timeAdded': 'Saturday 7:32am 15 May 2021'
    });
    var config = {
      method: 'put',
      url: process.env.REACT_APP_API_URI+`entries/${idList[idx]}`,
      headers: {
        'Authorization':  `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteItem = (idx) => {
    let newTasks = taskList.filter((item) => item != taskList[idx]);
    setTaskList([...newTasks]);
    let newTimes = timeList.filter((time, index) => (index !== idx))
    setTimeList([...newTimes])

    var config = {
      method: 'delete',
      url: process.env.REACT_APP_API_URI+`${idList[idx]}`,
      headers: {
        'Authorization':  `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },

    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }



  useEffect(() => {
    if (!auth.getToken()) {
      history.push("/auth/login");
    }
    var data = qs.stringify({
      'title': 'test',
      'timeAdded': 'Saturday 7:32am 15 May 2021'
    });
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_URI+'entries',
      headers: {
        'Authorization':  `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        let storedTaskList = []
        let storedTimeList = []
        let storedIdList = []
        let size = response.data.length;
        for (let i = 0; i < size; i++) {
          storedTaskList.push(response.data[i].title)
          storedTimeList.push(response.data[i].timeAdded)
          storedIdList.push(response.data[i]._id)
        }
        setTaskList([...storedTaskList])
        setTimeList([...storedTimeList])
        setIdList([...storedIdList])
      })
      .catch(function (error) {
        console.log(error);
      });

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
                          onClick={() => { editItem(index) }}
                          type="button"
                        ><i className="tim-icons icon-pencil" /> </Button></td>
                        <td className="text-center"> <Button
                          color="link"
                          onClick={() => { deleteItem(index) }}
                          id="tooltip457194718"
                          title=""
                          type="button"
                        ><i className="tim-icons icon-trash-simple
                        " /> </Button></td>
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

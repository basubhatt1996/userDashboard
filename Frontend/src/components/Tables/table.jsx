import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';


import { ToastContainer} from "react-toastify"

const Tables = ({ userdata, deleteUser }) => {

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>&nbsp;&nbsp;&nbsp;Country</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td >{index + 1 }</td> 
                            <td>{element.fname +" "+ element.lname}</td>
                            <td>{element.email}</td>
                            <td>{"+"+element.mobile}</td>
                            <td>{element.country}</td>
                            <td>{element.state}</td>
                   
                           <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='success' className="action" id="dropdown-basic">
                                  Actions
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                  <Link to={`edit/${element._id}`}><span style={{color:"blue"}}><b>EDIT</b></span></Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span style={{color:"red"}}>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>NO Data Found</div>
                  }


                </tbody>
              </Table>
            
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}

export default Tables
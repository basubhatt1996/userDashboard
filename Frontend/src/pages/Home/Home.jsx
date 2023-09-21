import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Tables from '../../components/Tables/table';
import Spiner from "../../components/Spinner/Spinner"
import { useNavigate } from "react-router-dom"
import { addData , dltdata, updateData} from '../../components/context/contextProvider';
import {usergetfunc,deletfunc} from "../../services/Api";
import Alert from 'react-bootstrap/Alert';
import "./home.css"
import { toast } from 'react-toastify';


const Home = () => {

  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);

  const { useradd, setUseradd } = useContext(addData);
  
  const {update,setUpdate} = useContext(updateData);
  const {deletedata, setDLtdata} = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register")
  }

  // get user
  const userGet = async()=>{
    const response = await usergetfunc();
    if(response.status === 200){
      setUserData(response.data.usersdata);
     
    }else{
      console.log("error for get user data")
    }
  }

  // user delete
  const deleteUser = async(id)=>{
    const response = await deletfunc(id);
    if(response.status === 200){
      userGet();
      setDLtdata(response.data)
    }else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1000)
  },[])

  return (
    <>
    {
      useradd ?  <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Succesfully Added</Alert>:""
    }

    {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully Updated</Alert>:""
    }

    {
      deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()} Succesfully Deleted</Alert>:""
    }

      <div className="container">
      <div className="main_h1">
            <div className="intro">
             <h2><b>User Information Dashboard</b></h2>
            </div>
          </div>
        <div className="main_div">
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}> <i class="fa-solid fa-plus"></i>&nbsp; <b>ADD USER</b></Button>
            </div>
          </div>
          </div>
        {
          showspin ? <Spiner /> : <Tables
                                    userdata={userdata}
                                    deleteUser={deleteUser}
                                    userGet={userGet}
                                  />
        }

    </>
  )
}

export default Home
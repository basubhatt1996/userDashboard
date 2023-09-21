import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spinner/Spinner"
import { singleUsergetfunc,editfunc } from '../../services/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/contextProvider';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"

const Edit = () => {

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
   addrss1:"",
   address2:"",
   country:"",
   state:"",
   zipCode:""
  });
  const {update,setUpdate} = useContext(updateData)
 const navigate = useNavigate();

  const [showspin, setShowSpin] = useState(true);

  const {id} = useParams();

  //getting user details
  const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    
    if(response.status === 200){
      setInputData(response.data)
      setShowSpin(false)
    }else{
      console.log("error");
    }
  }
  useEffect(()=>{
    userProfileGet();
  },[id])  



  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }
  

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, address1,address2,country,state,zipCode } = inputdata;
    if (fname !== "" && fname.length<5) {
      toast.error("First name is Required !")
    } else if (lname !== "" && fname.length<5) {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length < 11) {
      toast.error("Enter Valid Mobile number")
    } else if(address1===""){
        toast.error("Address is required")
    } else if(country===""){
        toast.error("country is required")
    }
    else if(state===""){
        toast.error("state is required")
    }else if (zipCode === "") {
        toast.error("Mobile is Required !")
      } else if (zipCode.length > 6 || zipCode.length<6) {
        toast.error("Enter Valid Zip Code")}
        else {
      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("address1",address1)
      data.append("address2",address2)
      data.append("country",country)
      data.append("state",state)
      data.append("zipCode",zipCode)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await editfunc(id,data);
      
      if(response.status === 200){
        setUpdate(response.data)
        navigate("/")
      }

    }
  }
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Update Your Details</h2>
          <Card className='shadow mt-3 p-3'>
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter FirstName' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter LastName' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                </Form.Group>
                
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Phone' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Address 1</Form.Label>
                  <Form.Control type="text" name='address1' value={inputdata.address1} onChange={setInputValue} placeholder="Enter address 1" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control type="text" name='address2' value={inputdata.address2} onChange={setInputValue} placeholder="Enter address 2" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name='country' value={inputdata.country} onChange={setInputValue} placeholder="Enter Country" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" name='state' value={inputdata.state} onChange={setInputValue} placeholder="Enter state" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="number" name='zipCode' value={inputdata.zipCode} onChange={setInputValue} placeholder='Enter Zip Code' />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>

            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Edit
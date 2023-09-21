import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spinner/Spinner"
import {registerfunc} from "../../services/Api"
import Select from "react-select"
import { ToastContainer, toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import { addData } from '../../components/context/contextProvider';
import PhoneInput from 'react-phone-input-2'
import { getCountries } from '@loophq/country-state-list';
import 'react-phone-input-2/lib/style.css'


const Register = () => {
  const countries=getCountries();
 let partialObjects = countries.map(item => {
    return { value: item.code, label: item.name };
 });
 const { useradd, setUseradd } = useContext(addData);
  const handleSelect=(data)=>{
    setStates([]);
    setCountry(data.label);
    console.log(data.label);
    let object=countries.find((item)=>item.name==data.label);
    let res=[]
    for(let i=0;i<object.states.length;i++){
      res.push({value:object.states[i],label:object.states[i]})
    }
    setStates(res);
  }
  
  const [mobile,setMobile]=useState("");
  const[country,setCountry]=useState("");
  const[state,setState]=useState("");
  const[states,setStates]=useState([])
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    address1:"",
   address2:"",
   zipCode:""
  });

  const [showspin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{setShowSpin(false)},1000)
  },[])

  
  // setInput Value
  const setInputValue = (e) => {
  
    const { name, value } = e.target;
    
    setInputData({ ...inputdata, [name]: value })
  
    }
   
  

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();
    const { fname, lname, email, address1,address2,zipCode } = inputdata;
    if (fname === "" || fname.length<5) {
      toast.error("First name is Required and should contain more than 5 alphabets!")
    } else if (lname === "" || lname.length<5) {
      toast.error("Last name is Required and should contain more than 5 alphabets!")
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
    }else if(state===""){
      toast.error("state is required")
  }else if(country===""){
        toast.error("country is required")
    }else if (zipCode === "") {
        toast.error("Mobile is Required !")
      } else if (zipCode.length > 6 || zipCode.length<6) {
        toast.error("Enter Valid Zip Code")}else {
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

      // const config = {
      //   "Content-Type":"multipart/form-data"
      // }

      const response = await registerfunc(data);
      
      if(response.status === 200){
        setInputData({
          ...inputdata,
          fname:"",
          lname: "",
          email: "",
          mobile:"",
          address1:"",
          address2:"",
          country:"",
          state:"",
          zipCode:""
        });
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Email or Phone is already in use")
      }

    }

  }

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Register Your Details</h2>
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
                  <PhoneInput
                      country={'in'}
                     value={inputdata.mobile}
                      onChange={(value)=>{
                        setMobile(value)
                        }}
                  />
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
                  <Select options={partialObjects} onChange={handleSelect} name='country'/>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>State</Form.Label>
                  <Select options={states} onChange={e=>setState(e.value)} name='state' />
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

export default Register
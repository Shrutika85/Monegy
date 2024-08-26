// LoginPage.js
import {  useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
////import Particles from "react-tsparticles";
import Particle from "../../components/Particle";
//import { loadFull } from "tsparticles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    "debug": false,
  "positionClass": "toast-bottom-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const googlelogin=()=>{
    window.open("http://localhost:5000/auth/google/callback")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    setLoading(true);
    
    const { data } = await axios.post(loginAPI, {
      email,
      password,
    })
    
    .catch((error) => {
      
      toast.error("user not found", toastOptions);
      setLoading(false);
    })
    
    // login with google




    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toast.success(data.message, toastOptions);
      setLoading(false);
    } else {
      
    
    }
  };

  

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particle/>

    <Container className="mt-6 ">
      <br>
      </br>
      <br>
      </br>
      <br></br> 
      
    </Container>
      <Row >      
      <Col md={{ span: 4, offset: 4 }}>
       <Container
        className="mt-2 card"
        style={{ position: "relative", zIndex: "2 !important", backgroundColor:"#f3f0f0",color: "#9d9494" }}
      >
        <h1 className="text-center mt-5">
              <AccountBoxIcon
                sx={{ fontSize: 40, color: "black" }}
                className="text-center"
              />
            </h1>
         <h2 className="text-black bold text-center ">Login</h2>
         <hr
        style={{
            color: "black",
            height: 2
        }}
    />
         <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-black bold" style={{}}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-black bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Group>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="mt-3"
              >
                <Link to="/forgotPassword" className="text-blank lnk">
                  Forgot Password?
                </Link>

                <Button
                  type="submit"
                  className=" text-center mt-2 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signin…" : "Login"}
                </Button>

                <Button
                type="submit"
                className=" text-center mt-3 btnStyle"
                onClick={googlelogin}
                >
                  Login with&nbsp;    
                  <GoogleIcon
                sx={{ fontSize: 20, color: "white" }}
                className="text-center"
              />
                </Button>

                <p className=" lnk mt-3" style={{ color: "#9d9494"  }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className="text-blue lnk">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
        </Container>
        </Col>
        

      </Row>


        <ToastContainer />
     
      
    </div>
  );
};

export default Login;

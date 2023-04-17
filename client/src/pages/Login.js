import React,{useState, useEffect, useCallback} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUser } from 'react-icons/fa';

import {
  Button,
  Container,
  Row,
  Col,
  Carousel,
  Navbar,
  NavDropdown,
  Nav
} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {reset , login } from '../store/reducers';


function Login() {

  const [formData ,setFormData] = useState({
    email: '',
    password: ''
  }); 

  
  const onChangeText = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }


  const {email,password} = formData;

  const dispatch = useDispatch();
  const {user , isLoading,isError,isSuccess,message} = useSelector((state) => state.auth);
  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      toast.success('OK')
    }
    dispatch(reset);
  },[user,isSuccess,isError,message,isLoading,dispatch])

  const onSubmit = async(e) => {
    e.preventDefault();
    if(email === '' || password === ''){
      toast.error('all inputs are require');
    } else {
      const userData = {email,password}
      dispatch(login(userData))
    }
  }
      

  return (
    <>
      <Container>

        <Row>
          <Col lg={12} xs={12}>
            <h1 className='head'><FaUser/>Login to marketApp</h1>
          </Col>
        </Row>

        <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
          <Container>

            <Navbar.Brand>my app logo</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <NavbarCollapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#'>Aboute Us</Nav.Link>
              <Nav.Link href='#'>Product</Nav.Link>
              <Nav.Link href='#'>Cars</Nav.Link>
              <Nav.Link href='#'>Contant</Nav.Link>

              <NavDropdown>
                <NavDropdown.Item>test1</NavDropdown.Item>
                <NavDropdown.Item>test2</NavDropdown.Item>
                <NavDropdown.Item>test3</NavDropdown.Item>
              </NavDropdown>

            </Nav>

            <Nav>
              <Nav.Link href='#'>Login Us</Nav.Link>
              <Nav.Link href='#'>SignUp</Nav.Link>
            </Nav>
          </NavbarCollapse>

          </Container>
        </Navbar>

        {/* <Carousel>
          <Carousel.Item>
            <img style={{width:1170 , height:500}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcOhU4Ej0qKpZrjffn3KwbyD9quINYnlCrw&usqp=CAU'/>
            <Carousel.Caption>
              <h3>this is image 1</h3>
              <p>this is the image description</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img style={{width:1170 , height:500}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPQtTYaAj87pAtPH1utTjQCOMpTVxhuL2cg&usqp=CAU'/>
            <Carousel.Caption>
              <h3>this is image 2</h3>
              <p>this is the image description</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}

        <Row>
          <Col lg={12} xs={12}>
            <form onSubmit={onSubmit}>
                <div>
                  <input 
                    className='form-control'
                    type="email"
                    id='email'
                    name='email'
                    placeholder='enter email'
                    value={email}
                    onChange={onChangeText}
                  />
                </div>
                <div>
                  <input 
                    className='form-control'
                    type="password"
                    id='password'
                    name='password'
                    value={password}
                    placeholder='enter password'
                    onChange={onChangeText}
                  />
                </div>

                <Button type='submit' variant='success'>Login</Button>

            </form>
          </Col>
        </Row>

      </Container>
      {/* <Container>
        <Row>
          <Col lg={3} md={6} xs={12} style={{backgroundColor:'yellow'}}>1</Col>
          <Col lg={3} md={6} xs={12} style={{backgroundColor:'blue'}}>2</Col>
          <Col lg={3} md={6} xs={12} style={{backgroundColor:'green'}}>3</Col>
          <Col lg={3} md={6} xs={12} style={{backgroundColor:'red'}}>4</Col>
        </Row>
      </Container> */}

    </>
  )
}

export default Login
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { Navbar, Nav } from "react-bootstrap";
import DogList from "./components/DogList";
import Dog from "./components/Dog";
//import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Logout from "./components/Logout";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired.
        setUser(loginData);
      } else {
        //Expired.
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
      <Navbar bg="primary" expand="lg" sticky="bottom" variant="light">
        <Container className="container-fluid">
          <Navbar.Brand href="/">
            <img src="/images/dog-paw.png" alt="dog paw" className="pawLogo"/>
          WUPHF
          <img src="/images/dog-paw.png" alt="dog paw" className="pawLogo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/dogs">
                Dogs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          { user ? (
            <Logout setUser={setUser} clientId={clientId}/>
          ) : (
            <Login setUser={setUser}/>
          )}
        </Container>
      </Navbar>

      <Routes> 
        <Route exact path="/" element={
          <DogList />}
        />
        <Route exact path="/dogs" element={
          <DogList />}
        />
        <Route path="/dogs/:id" element={
          <Dog />}
        />
      </Routes>
    </div>
  </GoogleOAuthProvider>
  );
}

export default App;


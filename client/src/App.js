import './App.css';
import React, {Fragment} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import BicycleState from './context/bicycle/BicycleState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Alerts from './components/layout/Alerts'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { About } from './components/pages/About';
import { NotFound } from './components/pages/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';

const App =()  => {
//  localStorage.setItem('token', null)
 
   return (
       <AuthState>
       <BicycleState>
        <AlertState>
          <Router>
            <Fragment>
                <Navbar title="cooool" icon='fab fa-github'/>
                <div className="App">
                  <Alerts/>
                  <Routes>
                    <Route path="/" element={ <PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
            </Fragment>
          </Router>
        </AlertState>
      </BicycleState>
      </AuthState>
     )
  }
 
  export default App 
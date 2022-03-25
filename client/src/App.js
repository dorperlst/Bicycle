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
import Bicycles from './components/pages/Bicycles';
import UserState from './context/user/UserState';
import './style/bootstrap.min.css'

const App =()  => {
   return (
       <AuthState>
       <BicycleState>
        <AlertState>
        <UserState>
          <Router>
            <Fragment>
                <Navbar title="Bicycle App" icon='fa-solid fa-bicycle'/>
                <div className="App">
                  <Alerts/>
                  <Routes>
                    <Route path="/myBicycle" element={ <PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/about" element={<About/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Bicycles />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
            </Fragment>
          </Router>
          </UserState>

        </AlertState>
      </BicycleState>
      </AuthState>
     )
  }
 
  export default App 
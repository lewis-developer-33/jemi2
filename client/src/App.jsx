import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp,LogIn,Dashboard,Apartments,Tenants,Payment } from '../components'

const App = () => {
  return (
    <Routes>
      <Route exact path='/' Component={SignUp}/>
      <Route exact path='/login' Component={LogIn}/>
      <Route exact path='/dashboard' Component={Dashboard}/>
      <Route exact path='/apartments' Component={Apartments}/>
      <Route exact path='/tenant' Component={Tenants}/>
      <Route exact path='/payment' Component={Payment}/>
    </Routes>
  )
}

export default App
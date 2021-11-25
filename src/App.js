import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './component/navbar';
import Form from './component/Form';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './component/NavbarReact';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './pages/ProductManagement';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
      {/* <Navbar/>
      <Form/> */}
      <NavbarComponent/>
      <Routes>
        <Route path="/"element={<HomePage/>}/>
        <Route path="/auth-page"element={<AuthPage/>}/>
        <Route path="/product-management"element={<ProductManagement/>}/>
        {/* <Route path="/product-page"element={<Product_Management/>}/> */}
      </Routes>
      {/* <AuthPage/> */}
      </div>
     );
  }
}
 
export default App;


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
import axios from 'axios';
import { connect} from 'react-redux';
import { loginAction } from './redux/actions';


const API_URL="http://localhost:2000"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }
  keepLogin = () => {
    let local = JSON.parse(localStorage.getItem("data"))
    if(local){

      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
      .then((res)=>{
        console.log("keepLogin berhasil ==>", res.data)
        this.props.loginAction(res.data[0])
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  render() {
    return (
      <div>
        {/* <Navbar/>
      <Form/> */}
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/product-management" element={<ProductManagement />} />
          {/* <Route path="/product-page"element={<Product_Management/>}/> */}
        </Routes>
        {/* <AuthPage/> */}
      </div>
    );
  }
}

export default connect(null, {loginAction} )(App);


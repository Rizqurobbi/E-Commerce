import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './component/navbar';
import Form from './component/Form';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './component/NavbarReact';



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
      <AuthPage/>
      </div>
     );
  }
}
 
export default App;


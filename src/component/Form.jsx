import React from 'react';
import axios from "axios"
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword:"",
            role: "User",
            loginEmail: "",
            loginPassword: "",

            dataUser: [

            ]
        }
    }
    btnDaftar = () => {
        let { username, email, password,confirmPassword } = this.state
        if(password===confirmPassword){

            axios.post("http://localhost:2000/dataUser", {
                username, email, password, role: "User"
            }).then((response) => {
                this.getData()
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    role: "User",
                    
                })
            }).catch((err) => {
                
            })
            alert(`Daftar Berhasil✔`)
        }else{
            alert(`Daftar Gagal❌,Pastikan confirm password sesuai dengan password!`)
        }
    }
    btnMasuk = () => {
        let { dataUser, loginEmail, loginPassword} = this.state;
        let index = null;
        console.log(dataUser.length)
        for (let i = 0; i < dataUser.length; i++) {
            if (dataUser[i].email === loginEmail && dataUser[i].password === loginPassword) {
                index = i
            }
        }
        if (index != null) {
            alert(`${dataUser[index].username} Login Berhasi!✅`)
            this.setState({
                loginEmail: "",
                loginPassword: "",
            })
        } else {
            alert("Login Gagal")
        }
    }
    getData = () => {
        axios.get("http://localhost:2000/dataUser")
            .then((response) => {
                this.setState({ dataUser: response.data })
            }).catch((err) => {

            })

    }
    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }
    render() {
        return (
            <div className="container" >
                <div style={{ margin: "5vh", textAlign: "center" }}>
                    <h3 >Pilihan Masuk</h3>
                    <p>Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat semua manfaat memiliki akun e-commerce</p>
                </div>
                <div className="row">

                    <div className="col-6">
                        <p style={{ fontSize: "30px" }}>Silahkan masuk ke akun anda</p>
                        <p style={{ fontSize: "15px" }}>Silahkan masuk ke akun anda untuk menyelesaikan pembayaran dengan data pribadi anda</p>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => this.handleInput(event.target.value, "loginEmail")} />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={(event) => this.handleInput(event.target.value, "loginPassword")} />
                            </div>
                            <button type="submit" onClick={this.btnMasuk} class="btn btn-primary">Masuk</button>
                        </form>
                    </div>
                    <div className="col-6">
                        <p style={{ fontSize: "30px" }}>Silahkan buat akun anda</p>

                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => this.handleInput(event.target.value, "username")} />
                                <small id="emailHelp" class="form-text text-muted"></small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => this.handleInput(event.target.value, "email")} />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={(event) => this.handleInput(event.target.value, "password")} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Confirm Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={(event) => this.handleInput(event.target.value, "confirmPassword")}/>
                            </div>

                            <button type="submit" onClick={this.btnDaftar} class="btn btn-primary">Daftar</button>
                        </form>
                    </div>
                </div>



            </div>

        );
    }
}

export default Form;
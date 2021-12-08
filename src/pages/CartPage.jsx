import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/actions';


class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ongkir:0
        }
    }
    
    printCart = () => {
        return this.props.cart.map((item, index) => {
            return (
                <div className="row shadow bg-white rounded">
                    <div className="col-md-2">
                        <img src={item.images} width="100%" />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{item.nama}</h5>
                        <h4 style={{ fontWeight: 'bolder' }}>Rp {item.harga.toLocaleString()}</h4>
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <h5 style={{ fontWeight: 'bolder' }}>{item.type}</h5>
                    </div>
                    <div className='col-md-5 d-flex align-items-center'>
                        <div className='d-flex justify-content between align-items-center'>
                            <div className='d-flex' style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={() => this.btnDesc(index)}>-</Button>
                                    <Input placeholder="qty" value={item.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <Button onClick={() => this.btnInc(index)}>+</Button>
                                </span>
                            </div>
                            <h4>Rp {(item.totalHarga).toLocaleString()}</h4>
                        </div>
                        <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.btnRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    btnInc = (index) => {
        let temp = [...this.props.cart];
        temp[index].qty += 1
        temp[index].totalHarga += this.props.cart[index].harga
        this.props.updateUserCart(temp,this.props.iduser)
        // axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, {
        //     cart: temp
        // })
        //     .then((res) => {
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }
    btnDesc = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
            temp[index].totalHarga -= this.props.cart[index].harga
            this.props.updateUserCart(temp,this.props.iduser)
        }else{
            temp.splice(index,1)
        }
            // axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, {
            //     cart: temp
            // })
            //     .then((res) => {
            //     }).catch((err) => {
            //         console.log(err)
            //     })
    }
    btnRemove = (index) => {
        let temp = [...this.props.cart];
        temp.splice(index, 1)
        this.props.updateUserCart(temp,this.props.iduser)

    } 
    btnCheckOut = () =>{
        const d = new Date()
        axios.post(`${API_URL}/userTransactions`,{
            iduser : this.props.iduser,
            username : this.props.username,
            invoice :`#INV/${d.getTime()}`,
            date :d.toLocaleDateString(),
            note :this.noteTransaction.value,
            totalharga:this.totalPayment()-parseInt(this.state.ongkir),
            ongkir: parseInt(this.state.ongkir),
            totalpayment :this.totalPayment(),
            detail: [...this.props.cart],
            status: 'Menunggu Konfirmasi'
        })
        .then((res)=>{
            this.props.updateUserCart([],this.props.iduser)
            this.setState({ongkir:0})
        })
    }  
    totalPayment = () =>{
        let total = 0 
        this.props.cart.forEach((item)=>{
         total += item.totalHarga
        })
        return total + this.state.ongkir
    }
    render() {
        return (
            <div className="container-fluid">
                <h2 className="text-center p-3">Keranjang Belanja</h2>
                <div className="row">
                    <div className="col-8">
                        {this.printCart()}
                    </div>
                    <div className="col-4">
                        <div className="p-4 mb-3 shadow bg-white rounded">
                            <FormGroup>
                                <h4>Total Payment</h4>
                                <h4>Rp.{(this.totalPayment()).toLocaleString()}</h4>
                                <Label>Biaya Pengiriman</Label>
                                <Input
                                onChange={(e) => this.setState({ ongkir: parseInt(e.target.value) })}
                                type="number"></Input>
                                <Label>Notes</Label>
                                <Input 
                                innerRef={(element)=> this.noteTransaction = element}
                                type="textarea"></Input>
                                <div style={{ padding: '1vh', display: 'flex', justifyContent: 'end' }}>
                                    <Button color="success" onClick={this.btnCheckOut}>Checkout</Button>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id,
        username : state.userReducer.username
    }
}
export default connect(mapToProps, { updateUserCart })(CartPage);
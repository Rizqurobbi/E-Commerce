import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, UncontrolledCollapse, Card, CardBody, Col, Form, FormGroup, Row, Input, Toast, ToastHeader, ToastBody, Spinner, Collapse } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/actions/userAction';
import { Navigate } from 'react-router';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            counter: 0,
            thumbnail: 0,
            selectedType: {},
            toastOpen: false,
            toastMsg: "",
            openType: false,
            redirect : false
        }
    }
    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }
    btnIncrement = (num) => {
        if (this.state.selectedType.qty) {
            if (this.state.counter < this.state.selectedType.qty) {

                this.state.counter += num
                // this.setState({propertiState : dataTerbaru}) : Untuk melakukan update data pada state
                this.setState({
                    counter: this.state.counter
                })
            } else {
                this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Stok produk tidak cukup" })
            }
        }
    }
    btnDecrement = (num) => {
        if (this.state.counter > 1) {

            this.state.counter -= num
            this.setState({
                counter: this.state.counter
            })
        }
    }
    btnAddToCart = async () => {
        let { selectedType, detail, counter } = this.state
        if (selectedType.type) {
            let dataCart = {
                images: detail.images[0],
                nama: detail.nama,
                brand: detail.brand,
                harga: detail.harga,
                totalHarga: detail.harga*counter,
                type: selectedType.type,
                qty: counter
            }
            // menggabungkan data cart sebelumnya dari reducer, dengan dataCart baru yang akan ditambahkan
            let temp = [...this.props.cart];
            temp.push(dataCart)
            if (this.props.iduser) {
               let res = await this.props.updateUserCart(temp,this.props.iduser)
               if(res.success){
                   this.setState({redirect:true})
               }
            } else {
                this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Silahkan Login terlebih dahulu" })
            }
        } else {
            this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Pilih tipe produk terlebih dahulu" })
        }
    }
    // printToast = () => {

    //     <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left: 10 }}>
    //         <ToastHeader icon="warning"
    //             toogle={() => this.setState({ toastOpen: false })}>
    //             Add to cart warning
    //         </ToastHeader>
    //         <ToastBody>
    //             Stok produk tidak cukup
    //         </ToastBody>
    //     </Toast>
    // }
    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }
    render() {
        if(this.state.redirect){
            return <Navigate to = "/cart-user"/>
        }
        return (
            <Container style={{ margin: "15vh" }}>
                <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", right: 10, top: 100 }}>
                    <ToastHeader icon="warning"
                        toogle={() => this.setState({ toastOpen: false, toastMsg: "" })}>
                        Add to cart warning
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMsg}
                    </ToastBody>
                </Toast>
                <div className="container row p-5 m-auto shadow bg-white rounded mt-4">
                    {
                        this.state.detail.id &&
                        <>
                            <div className="col-md-1">
                                {this.renderImages()}
                            </div>
                            <div className="col-md-7 text-center">
                                <img className="shadow-sm bg-white rounded" src={this.state.detail.images[this.state.thumbnail]} width="80%" />
                            </div>
                            <div className="col-md-4">
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                    <h6 className="text-mute">{this.state.detail.kategori}</h6>
                                    <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                                </div>
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <div
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => this.setState({ openType: !this.state.openType })}>
                                        Type: {this.state.selectedType.type}</div>
                                    <Collapse isOpen={this.state.openType}>
                                        {
                                            this.state.detail.stock.map((item, index) => {
                                                return (
                                                    <div>
                                                        <Button outline color="secondary" size="sm"
                                                            style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                            onClick={() => this.setState({ selectedType: item, counter: 1 })}
                                                        > {item.type} : {item.qty}</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>
                                <p className="my-3" style={{ textAlign: "justify" }}>
                                    {this.state.detail.deskripsi}
                                </p>
                                <Col style={{ display: "flex", textAlign:'center' }}>
                                    <Col>
                                        <Button size="sm" onClick={() => this.btnDecrement(1)}>-</Button>
                                    </Col>
                                    <Col>
                                        <p>{this.state.counter}</p>
                                    </Col>
                                    <Col>
                                        <Button size="sm" onClick={() => this.btnIncrement(1)}>+</Button>
                                    </Col>

                                </Col>
                                
                                <Button type="button" color="warning" style={{ width: '100%' }} onClick={this.btnAddToCart}>Add to cart</Button>
                               
                            </div>
                        </>
                    }
                </div>

            </Container>

        );

    }

}
// const mapToProps = ({ productsReducer }) => {
//     console.table(productsReducer.productsList)
//     return {
//         productsList: productsReducer.productsList
//     }
// }
const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps,{updateUserCart})(ProductDetail);
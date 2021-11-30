import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, UncontrolledCollapse, Card, CardBody, Col, Form, FormGroup, Row, Input, Toast, ToastHeader, ToastBody, Spinner } from 'reactstrap';
import { API_URL } from '../helper';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            counter: 0,
            thumbnail: 0,
            selectedType: {},
            toastOpen: false
        }
    }
    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data })
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
                this.setState({ toastOpen: !this.state.toastOpen })
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
    printCart = () => {
        return this.state.detail.map((value, index) => {
            return <div>
                <div className="card" className="d-flex shadow p-3 mb-5 bg-white rounded" style={{}}>
                    <Col md="1">
                        {/* <Row> */}

                        {value.images.map((val, idx) => {
                            return <img src={val} width="100%" alt={value.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })}
                                style={{ borderBottom: this.state.thumbnailIdx == idx && "3px solid blue" }} />
                        })}

                        {/* </Row> */}
                    </Col>
                    <Col>
                        {
                            this.state.selectedIdx == index ?
                                <img src={value.images[this.state.thumbnailIdx]} width="80%" alt={value.nama + index} />
                                :
                                <img src={value.images[0]} width="80%" alt={value.nama + index} />
                        }

                    </Col>
                    <Col>
                        <div class="card-body">
                            <h5 class="card-title">{value.nama}</h5>
                            <p class="card-text">{value.kategori}</p>
                            <h2 class="card-title">Rp.{value.harga.toLocaleString()}</h2>

                            <FormGroup>

                                <p className="font-weight-bold my-1" id="toggler" style={{ cursor: "pointer" }}>Type :{this.state.selectedType.type}</p>
                                <UncontrolledCollapse toggler="#toggler">
                                    {
                                        value.stock.map((value, idx) => {
                                            return (
                                                <Button outline color="secondary" size="sm"
                                                    style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                    onClick={() => this.setState({ selectedType: value, counter: 1 })}>{value.type} : {value.qty} </Button>

                                            )
                                        })
                                    }
                                </UncontrolledCollapse>

                                {/* <Button
                                    color="primary"
                                    id="toggler"
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                    >
                                    Toggle
                                    </Button>
                                    <UncontrolledCollapse toggler="#toggler">
                                    <Card>
                                    <CardBody>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse> */}

                            </FormGroup>
                            <p class="card-text">{value.deskripsi}</p>
                            <Row>
                                <Col>
                                    Jumlah: 
                                </Col>
                                <Col style={{ display: "flex" }}>
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
                            </Row>
                            <Row>
                                <Button>Add To Cart</Button>
                            </Row>
                        </div>
                    </Col>
                </div>
            </div>
        })
    }
    render() {

        return (
            <Container style={{ margin: "15vh" }}>
                <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left: 128, top:100 }}>
                    <ToastHeader icon="warning"
                        toogle={() => this.setState({ toastOpen: false })}>
                        Add to cart warning
                    </ToastHeader>
                    <ToastBody>
                        Stok produk tidak cukup
                    </ToastBody>
                </Toast>
                {this.printCart()}

            </Container>

        );

    }

}
const mapToProps = ({ productsReducer }) => {
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps)(ProductDetail);
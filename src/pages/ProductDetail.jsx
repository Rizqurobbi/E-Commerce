import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, UncontrolledCollapse, Card, CardBody, Col, Form, FormGroup, Row, Input } from 'reactstrap';
import { API_URL } from '../helper';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            counter: 0
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
        this.state.counter += num
        // this.setState({propertiState : dataTerbaru}) : Untuk melakukan update data pada state
        this.setState({
            counter: this.state.counter
        })
    }
    btnDecrement = (num) => {
        this.state.counter -= num
        this.setState({
            counter: this.state.counter
        })
    }
    printCart = () => {
        return this.state.detail.map((value, index) => {
            return <div>
                <div class="card" className="d-flex shadow p-3 mb-5 bg-white rounded" style={{}}>
                    <Col>
                        {/* <Row> */}

                        {value.images.map((val, idx) => {
                            return <img src={val} width="20%" alt={value.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })} />
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

                                <p className="font-weight-bold my-1" id="toggler" style={{ cursor: "pointer" }}>Type :</p>
                                <UncontrolledCollapse toggler="#toggler">
                                    {
                                        value.stock.map((value, idx) => {
                                            return (
                                                <p>{value.type} : {value.qty} </p>
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
                                <Col style={{display:"flex"}}>
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
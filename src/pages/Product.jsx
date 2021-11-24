import React from 'react';
import axios from 'axios';
import { Col, Table } from 'reactstrap';
import ModalDetail from '../component/ModalDetail';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { Form, FormGroup, Label, Input, Row} from "reactstrap"



class Product_Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        axios.get("http://localhost:2000/products")
            .then((response) => {
                this.setState({ products: response.data })
            }).catch((err) => {

            })

    }
    render() {
        const { products } = this.state
        return (
            <div>

                <Table>


                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Nama
                            </th>
                            <th>
                                Brand
                            </th>
                            <th>
                                Kategori
                            </th>
                            <th>
                                Gambar
                            </th>
                            <th>
                                Harga
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ?
                            products.map((value, idx) => (
                                <tr>
                                    <td>{value.id}</td>
                                    <td>{value.nama}</td>
                                    <td>{value.brand}</td>
                                    <td>{value.kategori}</td>
                                    <td><img alt="..." width="100px" src={value.images[idx]} /></td>
                                    <td>{value.harga}</td>
                                    <td><div>
                                        <Button color="danger" onClick={() => this.setState({ buttonOpen: true })} >
                                        Detail
                                    </Button>
                                        <Modal
                                            centered
                                            size="md"
                                            toggle={() => this.setState({ buttonOpen: false })}
                                            isOpen={this.state.buttonOpen}
                                        >
                                            <ModalHeader toggle={() => this.setState({ buttonOpen: false })}>
                                                Detail Product
                                            </ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="form-namaproduk">
                                                            Nama Product
                                                        </Label>
                                                        <Input
                                                            id="form-namaproduk"
                                                            name="nama-produk"
                                                            type="text"
                                                            defaultValue={value.nama}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="form-deskripsi">
                                                            Deskripsi
                                                        </Label>
                                                        <Input
                                                            id="form-deskripsi"
                                                            name="deskripsi"
                                                            type="text"
                                                            defaultValue={value.deskripsi}
                                                        />
                                                    </FormGroup>
                                                    <Row>
                                                        <FormGroup className="col-6">
                                                            <Label for="form-brand">
                                                                Brand
                                                            </Label>
                                                            <Input
                                                                id="form-brand"
                                                                name="brand"
                                                                type="text"
                                                                defaultValue={value.brand}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="col-6">
                                                            <Label for="form-kategori">
                                                                Kategori
                                                            </Label>
                                                            <Input
                                                                id="form-kategori"
                                                                name="kategori"
                                                                type="text"
                                                                defaultValue={value.kategori}
                                                            />
                                                        </FormGroup>
                                                    </Row>
                                                    <FormGroup>
                                                        <Label for="form-harga">
                                                            Harga
                                                        </Label>
                                                        <Input
                                                            id="form-harga"
                                                            name="harga"
                                                            type="number"
                                                            defaultValue={value.harga}
                                                        />
                                                    </FormGroup>
                                                    <Row>
                                                        <FormGroup className="col-3">
                                                            <Label for="form-stok1">
                                                                Stok
                                                            </Label>
                                                            <Input
                                                                id="form-stok1"
                                                                name="brand"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                        <Col md={1}></Col>
                                                        <FormGroup className="col-3">
                                                            <Input
                                                                id="form-stok2"
                                                                name="stok2"
                                                                type="number"
                                                            />
                                                        </FormGroup>
                                                        <Col md={1}></Col>
                                                        <Button className="col-4">
                                                            Delete
                                                        </Button>
                                                    </Row>
                                                    <Row>
                                                        <FormGroup className="col-3">
                                                            <Label for="form-stok1">
                                                                
                                                            </Label>
                                                            <Input
                                                                id="form-stok1"
                                                                name="brand"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                        <Col md={1}></Col>
                                                        <FormGroup className="col-3">
                                                            <Input
                                                                id="form-stok2"
                                                                name="stok2"
                                                                type="number"
                                                            />
                                                        </FormGroup>
                                                        <Col md={1}></Col>
                                                        <Button className="col-4">
                                                            Delete
                                                        </Button>
                                                    </Row>
                                                    <FormGroup>
                                                        <Label for="form-images">
                                                            Images
                                                        </Label>
                                                        <Input
                                                            id="form-images"
                                                            name="images"
                                                            type="url"  
                                                            defaultValue={value.images}
                                                        />
                                                        <Input
                                                            id=""
                                                            name=""
                                                            type="url"
                                                            defaultValue={value.images}
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={function noRefCheck() { }}>
                                                    Edit
                                                </Button>
                                                {' '}
                                                <Button onClick={() => this.setState({ buttonOpen: false })}>
                                                    Cancel
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                </td>
                                </tr>
                    ))
                    :
                    (<tr>
                        <td></td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>)
                        }

                </tbody>
            </Table>
                
            </div >
        );
    }
}

export default Product_Management;
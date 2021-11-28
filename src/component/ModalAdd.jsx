import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { Col, FormGroup, Label, Input, Row } from "reactstrap"

const API_URL = "http://localhost:2000"
class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonOpen: false,
            inputStock:
                [
                    
                ],  
            inputImages: [],
        }
    }

    btnSubmit = () => {
        axios.post(`${API_URL}/products`, {
            nama: this.namaAdd.value,
            deskripsi: this.deskripsiAdd.value,
            brand: this.brandAdd.value,
            kategori: this.kategoriAdd.value,
            harga: this.hargaAdd.value,
            images:this.imagesAdd.value,
            stock:this.stockAdd.value
        })
    }
    btnDeleteStock = (idx) => {
        let deleteStock = this.state.inputStock
        deleteStock.splice(idx, 1)
        this.setState({ deleteStock })
    }
    btnDeleteImage = (idx) => {
        let deleteImage = this.state.inputImages
        deleteImage.splice(idx, 1)
        this.setState({ deleteImage })

    }
    addImage = () => {
        let newImage = ""
        this.setState(({ inputImages: this.state.inputImages.concat([newImage]) }))
    }

    addStock = () => {
        let newStock = {
            type: "",
            qty: null
        }
        this.setState(({ inputStock: this.state.inputStock.concat([newStock]) }))
    }

    printStock = () => {
        return this.state.inputStock.map((item, index) => {

            return <Row>
                <Col>
                    <Input innerRef={(element) => this.stockAdd = element} style={{ textAlign: "center" }} type="text" placeholder={`Type-${index + 1}`} />
                </Col>
                <Col>
                    <Input innerRef={(element) => this.stockAdd = element} style={{ textAlign: "center" }} type="number" placeholder={`Stock-${index + 1}`} />
                </Col>
                <Col>
                    <Button size="sm" onClick={this.btnDeleteStock} style={{ cursor: 'pointer' }} color="danger" outline>Delete</Button>
                </Col>
            </Row>
        })



    }
    printImages = () => {
        return this.state.inputImages.map((item, index) => {
            return <Row>
                <Col>
                    <Input innerRef={(element) => this.imageAdd = element} style={{ textAlign: "center" }} placeholder={`Image-${index + 1}`} type="url" />
                </Col>
                <Col>
                    <Button size="sm" onClick={this.btnDeleteImage} style={{ cursor: 'pointer' }} color="danger" outline>Delete</Button>
                </Col>

            </Row>
        })
    }
    render() {
        return (
            <div>
                <Button color="success" style={{ float: "right" }} onClick={() => this.setState({ buttonOpen: true })}  >
                    Add
                </Button>
                <Modal
                    centered
                    size="md"
                    toggle={() => this.setState({ buttonOpen: false })}
                    isOpen={this.state.buttonOpen}
                >
                    <ModalHeader toggle={() => this.setState({ buttonOpen: false })}>
                        Add Product
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="form-namaproduk">
                                Nama Product
                            </Label>
                            <Input
                                id="form-namaproduk"
                                name="nama-produk"
                                type="text"
                                innerRef={(element) => this.namaAdd = element}

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
                                innerRef={(element) => this.deskripsiAdd = element}
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
                                    innerRef={(element) => this.brandAdd = element}

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
                                    innerRef={(element) => this.kategoriAdd = element}
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
                                innerRef={(element) => this.hargaAdd = element}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Stok</Label>
                            <Button size="sm" onClick={() => this.addStock()} style={{ float: "right" }} color="success" outline>Add Stock</Button>
                            {this.printStock()}
                        </FormGroup>
                        <FormGroup>
                            <Label>Images</Label>
                            <Button size="sm" onClick={() => this.addImage()} style={{ float: "right" }} color="success" outline>Add Images</Button>
                            {this.printImages()}
                        </FormGroup>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.btnSubmit}>
                            Submit
                        </Button>
                        {' '}
                        <Button onClick={() => this.setState({ buttonOpen: false })}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalAdd;
import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, ButtonGroup, Input, InputGroup, FormGroup, Label, Col, Row, InputGroupText } from 'reactstrap';
import ModalEditProduct from '../component/ModalEditProduct';
import { getProductsAction, sortingProduct } from '../redux/actions'
import { connect } from "react-redux"
import ModalAdd from '../component/ModalAdd';
import { API_URL } from '../helper';


class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen: false,
            detailProduk: {},
            modalAddOpen: false,
            thumbnailIdx: 0,
            modalOpen: false,
            selectedIndex: null,
            page: 1,
            setPage: 2

        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                console.log("RESPON DATA==.", res.data)
                this.setState({ productList: res.data })
                // this.props.dataAction(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    printProduk = () => {
        let { page, setPage } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * setPage : page - 1, page * setPage).map((item, index) => {
            return <tr>
                <td>{page>1? (page-1)* setPage + index+1 : index+1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    {
                        this.state.selectedIdx == index ?
                            < img src={item.images[this.state.thumbnailIdx]} width="80%" alt={item.nama + index} />
                            :
                            <img src={item.images[0]} width="80%" alt={item.nama + index} />
                    }

                    <div>
                        {item.images.map((val, idx) => {
                            return <img src={val} width="20%" alt={item.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })} />
                        })}
                    </div>
                </td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.kategori}</td>
                <td>Rp. {item.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                    <Button size="sm" color="danger" onClick={() => this.onBtDelete(item.id)}>Delete</Button></td>
            </tr>
        })
    }
    onBtDelete = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductsAction()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    printBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / this.state.setPage); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }
    printSortPagination = (e) => {
        this.setState({ setPage: parseInt(e.target.value) })
    }
    btnClick = (e) => {
        this.props.sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }
    btnSearch = () => {
        this.props.getProductsAction(this.inSearchName.value, this.inSearchMinHarga.value, this.inSearchMaxHarga.value)
    }
    btnReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.inSearchMinHarga.value = ""
        this.inSearchMaxHarga.value = ""
    }

    render() {
        return (
            <div className="container-fluid p-5">
                <h3 className="text-center">Produk Management</h3>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                </div>
                <ModalAdd
                    getData={this.getData}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })}
                    modalOpen={this.state.modalOpen}
                />
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />

                <Row>
                    <div className="col-md-4 p-4">
                        <div className="col">

                            <Row>
                                <Button type="button" color="success" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                            </Row>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className="d-flex">
                                    <Input type="number" id="numb1" placeholder="Minimum"
                                        innerRef={(element) => this.inSearchMinHarga = element} />
                                    <Input type="number" id="numb2" placeholder="Maksimum"
                                        innerRef={(element) => this.inSearchMaxHarga = element} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Sort</Label>
                                <InputGroup>
                                    <Input type="select" style={{ width: "250px" }}
                                        onChange={this.btnClick}>
                                        {/* innerRef={(element) => this.inSearchSort = element} */}
                                        <option value="harga-asc">Harga Asc</option>
                                        <option value="harga-desc">Harga Desc</option>
                                        <option value="nama-asc">A-Z</option>
                                        <option value="nama-desc">Z-A</option>
                                        <option value="id-asc">Reset</option>
                                    </Input>
                                </InputGroup>
                                <div className="pt-2" style={{ textAlign: "end" }}>
                                    <Button outline color="warning" onClick={this.btnReset}>Reset</Button>
                                    <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btnSearch}>Filter</Button>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-8">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Nama</th>
                                    <th>Brand</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printProduk()}
                            </tbody>
                        </Table>
                    </div>
                </Row>
                <div className="my-5 text-center">
                    <ButtonGroup>
                        {this.printBtnPagination()}
                        <Input type="select" style={{ width: "33px" }}
                            onChange={this.printSortPagination}>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </Input>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        productsList: state.productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, sortingProduct })(ProductManagement);
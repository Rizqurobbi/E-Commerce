import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardBody, CardTitle, Input, Card, CardImg, ButtonGroup, Button, InputGroup, InputGroupText, Container, Label, FormGroup, Col ,UncontrolledCollapse} from "reactstrap"
import { getProductsAction, sortingProduct } from "../redux/actions"


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">
                <Card className="shadow p-5 mb-5 bg-white rounded">
                    <Link to={`/products-detail?id=${value.id}`} style={{ textDecoration: "none" }}>
                        <CardImg top
                            src={value.images[0]}
                            top width="100%"
                            alt={`${value.nama}-${index}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                            <CardTitle tag="h6" style={{ fontWeight: "bold" }}>Rp.{value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
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
    btnClick = (e) => {
        this.props.sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
        // console.log(this.inSearchSort.value)
        // if(this.inSearchSort.value == "harga-asc"){
        //     this.props.sortingProduct({
        //         hargaAsc: this.inSearchSort.value
        //     })
        // }else if (this.inSearchSort.value == "harga-desc"){
        //     this.props.sortingProduct({
        //         hargaDesc: this.inSearchSort.value
        //     })
        // }else if (this.inSearchSort.value == "nama-asc"){
        //     this.props.sortingProduct({
        //         namaAsc: this.inSearchSort.value
        //     })
        // }else if (this.inSearchSort.value == "nama-desc"){
        //     this.props.sortingProduct({
        //         namaDesc: this.inSearchSort.value
        //     })
        // }else{
        //     this.props.sortingProduct()
        // }
        // this.props.sortingProduct()
    }
    render() {
        return (
            <div className="pt-5">
                <Container>
                    <div className="shadow bg-white p-2 rounded mb-3">
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
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
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.btnClick}>
                                        Click
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>

                        </div>
                        <div className="pt-2" style={{ textAlign: "end" }}>
                            <Button outline color="warning" onClick={this.btnReset}>Reset</Button>
                            <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btnSearch}>Filter</Button>
                        </div>
                    </div>

                    <div className="row">
                        {this.printProducts()}
                    </div>
                    <div className="my-5 text-center">
                        <ButtonGroup>
                            {this.printBtnPagination()}
                        </ButtonGroup>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, sortingProduct })(ProductsPage);
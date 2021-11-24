import React from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import ModalDetail from '../component/ModalDetail';


class Product_Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[]
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
        const {products} = this.state
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
                                    <td><img alt="..." width="100px"src={value.images[idx]}/></td>
                                    <td>{value.harga}</td>
                                    <td><ModalDetail/>
                                        <button>Delete</button></td>
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
                
            </div>
        );
    }
}

export default Product_Management;
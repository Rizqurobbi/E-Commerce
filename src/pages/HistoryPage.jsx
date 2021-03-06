import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../helper';
import ModalTransaksi from '../component/ModalTransaksi'

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            openModal: false,
            detail: {},
            selectedIdx: null
        }
    }
    componentDidMount() {
       this.getData()
    }
    getData=()=>{
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ transaksi: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }
    btnBatal = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: "Pesanan Batal"
        })
            .then((res) => {
                this.getData()
                this.setState({openModal:false})
            })
            .catch((err) => {
                console.log(err)
            })
    }
    printHistory = () => {
        return this.state.transaksi.map((value, index) => {
            
            let badgeColor =value.status.includes("Batal")?"danger":"warning"

            return <div className="shadow pb-3 rounded">
                <div className="shadow-sm p-2 bg-dark rounded" style={{ color: "white" }}>
                    <span>{value.date}<Badge color={badgeColor}>{value.status}</Badge></span>
                    <b style={{ marginLeft: 20 }}> {value.invoice}</b>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].images} width="100%" alt="" />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray" }}>
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        <a style={{ cursor: "pointer" }} className="text-muted">+{value.detail.length - 1} Produk Lainnya</a>
                    </div>
                    <div className="col-md-3">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.totalpayment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <Button color="danger" onClick={() => this.btnBatal(value.id)} >Batalkan Pesanan</Button>
                    <Button color="primary" outline style={{ border: "none" }} onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}>Lihat Detail Produk</Button>
                </div>
            </div>
        })
    }
    render() {
        return (
            <div className="container p-5">
                {/* Modal Detail Transaksi */}
                <ModalTransaksi
                    btnBatal={this.btnBatal}
                    dataTransaksi={this.state.detail}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })} />
                <h1 className>Histori Transaksi Anda</h1>
                {this.printHistory()}
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role,
    }
}

export default connect(mapToProps)(HistoryPage);
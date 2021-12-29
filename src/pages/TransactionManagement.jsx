import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import ModalTransaksi from '../component/ModalTransaksi';
import { API_URL } from '../helper';


class TransactionAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            detail: {},
            status: ["Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Pesanan Batal"],
            statusIdx: 0
        }
    }
    componentDidMount() {
        this.getTransaksi()
    }
    getTransaksi = () => {
        axios.get(`${API_URL}/userTransactions`)
            .then((res) => {
                console.log(res.data)
                this.setState({ transaksi: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }
    getTransaksiFilter = (status, statusActive) => {
        axios.get(`${API_URL}/userTransactions${statusActive > 0 ? `?status=${status}` : ""}`)
            .then((res) => {
                console.log(res.data, statusActive)
                this.setState({ transaksi: res.data, statusIdx: statusActive })
            }).catch((err) => {
                console.log(err)
            })
    }
    btnConfirm = (id, confirm) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: confirm
        })
            .then((res) => {
                this.getTransaksi()
                this.setState({ openModal: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    btnBatal = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: "Pesanan Batal"
        })
            .then((res) => {
                this.getTransaksi()
                this.setState({ openModal: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    printHistory = () => {
        return this.state.transaksi.map((value, index) => {

            let badgeColor = value.status.includes("Batal") ? "danger" : value.status.includes("Terima") ? "success" : "warning"

            return <div className="shadow pb-3 rounded" style={{ marginBottom: 20, marginTop: 20 }}>
                <div className="shadow-sm p-2 bg-dark rounded" style={{ color: "white" }}>
                    <span>{value.date}<Badge color={badgeColor}>{value.status}</Badge></span>
                    <b style={{ marginLeft: 20 }}> {value.invoice}</b>
                    <b style={{ float: "right" }}> User: {value.username}</b>
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
                    <Button color="danger" outline onClick={() => this.btnBatal(value.id, "Batalkan Pesanan")}>Batalkan Pesanan</Button>
                    <Button color="success" onClick={() => this.btnConfirm(value.id, "Terima Pesanan")}>Terima Pesanan</Button>
                    <Button color="primary" outline style={{ border: "none" }} onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}>Lihat Detail Produk</Button>
                </div>
            </div>
        })
    }
    render() {
        return (
            <div className="container p-5">
                <h1 className="mb-4">Transaction management admin</h1>
                <ModalTransaksi
                    btnBatal={this.btnBatal}
                    dataTransaksi={this.state.detail}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })} />
                <div className="d-flex justify-content-evenly">
                    {
                        this.state.status.map((value, index) => {
                            return <Button outline
                                color={this.state.statusIdx == index ? "primary" : "secondary"}
                                style={{ border: 'none', width: "100%", borderBottom: this.state.statusIdx == index && "3px solid #0984E3" }}
                                type='button'
                                onClick={() => this.getTransaksiFilter(value, index)}>
                                <h6 style={{ fontWeight: "bold" }}>{value}</h6>
                            </Button>
                        })
                    }
                </div>
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

export default connect(mapToProps)(TransactionAdminPage);
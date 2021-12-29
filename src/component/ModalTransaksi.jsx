import axios from 'axios';
import React from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { API_URL } from '../helper';

const ModalTransaksi = (props) => {
    const { dataTransaksi } = props;
    const totalQty = () => {
        let total = 0
        if (dataTransaksi.detail) {

            dataTransaksi.detail.forEach((val) => {
                total += val.qty
            });
        }
        return total
    }
    const PrintDetail = () => {
        if (dataTransaksi.detail) {

            return dataTransaksi.detail.map((value, index) => {
                return (
                    <Card>
                        <div className="row">
                            <div className="col-md-2">
                                <img src={value.images} width="100%" />
                            </div>
                            <div className="col-md-6">
                                {/*nama,qty dan harga per pcs*/}
                                <span className="d-flex">
                                    {value.nama}
                                </span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {value.qty} x Rp.{value.harga.toLocaleString()}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <span className="d-flex">
                                    Total Harga
                                </span>
                                <span style={{ fontWeight: 'bold' }}>
                                    Rp.{value.totalHarga.toLocaleString()}
                                </span>
                                {/*total harga*/}
                            </div>
                        </div>
                    </Card>
                )
            })
        }

    }

    return (
        <Modal isOpen={props.openModal}
            toggle={props.toggleModal}
            size="lg">
            <ModalHeader
                className="d-block text-center">
                <span onClick={props.toggleModal} className="material-icons" style={{ float: "right", cursor: 'pointer' }}>
                    close
                </span>
                <div style={{ textAlign: "center" }}>
                    <h4 style={{ fontWeight: "700" }}>Detail Transaksi</h4>
                </div>
            </ModalHeader>
            <ModalBody>
                {console.log(dataTransaksi)}
                {
                    dataTransaksi.detail ?
                        <div className="row">
                            <div className="col-md-8 pt-2 px-0" style={{ backgroundColor: "#F3F4F5" }}>
                                <Card className="px-4 rounded" style={{ border: 'none' }}>
                                    <p style={{ fontWeight: 'bold' }}>{dataTransaksi.status}</p>
                                    <span className="d-flex justify-content-between">
                                        <p>No Invoice</p>
                                        <p style={{ fontWeight: 'bold', color: '#3498db' }}>{dataTransaksi.invoice}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Tanggal Pembelian</p>
                                        <p>{dataTransaksi.date}</p>
                                    </span>
                                </Card>
                                <Card className="px-4 py-3 mt-2 rounded" style={{ border: 'none' }}>
                                    <p style={{ fontWeight: 'bold' }}>Detail Produk</p>
                                    <div style={{ height: "30vh", overflow: "auto", overflowX: "hidden" }}>
                                        {PrintDetail()}
                                    </div>
                                </Card>
                                <Card className="px-4 py-3 mt-2 rounded" style={{ border: 'none' }}>
                                    <p style={{ fontWeight: 'bold' }}>Rincian Pembayaran</p>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Harga ({totalQty()} barang)</p>
                                        <p style={{ fontWeight: 'bold', color: '#3498db' }}>Rp. {(dataTransaksi.totalharga.toLocaleString())}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Ongkos Kirim</p>
                                        <p style={{ fontWeight: 'bold', color: '#3498db' }}>Rp. {dataTransaksi.ongkir.toLocaleString()}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Bayar</p>
                                        <p style={{ fontWeight: 'bold', color: '#3498db' }}>Rp. {dataTransaksi.totalpayment.toLocaleString()}</p>
                                    </span>
                                </Card>
                            </div>
                            <div className="col-md-4 p-3">
                                <Button
                                    outline
                                    size="lg"
                                    className="my-2"
                                    style={{ width: '100%' }}
                                >Chat Penjual
                                </Button>
                                <Button
                                    className="my-2"
                                    outline
                                    size="lg"
                                    style={{ width: '100%' }}
                                >Bantuan
                                </Button>
                                <Button
                                    onClick={()=> props.btnBatal(props.dataTransaksi.id)}
                                    outline
                                    color="danger"
                                    size="lg"
                                    style={{ width: '100%' }}
                                >Batal
                                </Button>
                            </div>
                        </div>
                        :
                        <p style={{ textAlign: "center" }}>No Data</p>
                }
            </ModalBody>
        </Modal>
    )
}
export default ModalTransaksi
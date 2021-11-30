import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Container, UncontrolledCarousel, Col, Row, CarouselControl } from 'reactstrap';
import { API_URL } from '../helper';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: []
        }
    }

    printCarousel = () => {
        return <div>

            <UncontrolledCarousel

                items={[

                    {
                        altText: 'Slide 1',
                        // caption: 'Slide 1',
                        key: 1,
                        src: 'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',

                    },
                    {
                        altText: 'Slide 2',
                        // caption: 'Slide 2',
                        key: 2,
                        src: 'https://images.unsplash.com/photo-1528857944987-239d3a502bbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
                    },
                    {
                        altText: 'Slide 3',
                        // caption: 'Slide 3',
                        key: 3,
                        src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1cm5pdHVyZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                    }
                ]}
            />
        </div>
    }
    printHalaman = () => {
        return <div style={{}}>

            <Container style={{ margin: "auto" }}>
                {/* KIRI */}
                <Row>
                    <Col className="col-12 col-md-5 text-center">
                        <img
                            className="my-5 shadow mb-1 bg-white rounded"
                            width="80%"
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/388/0938824_PE794380_S4.jpg"
                            alt="..." />
                    </Col>
                    <Col style={{ marginTop: "auto" }}>
                        <div className="card-body my-5"
                            style={{}}>
                            <h1 className="card-title">RUDSTA</h1>
                            <h1 className="card-title">IKEA|Kabinet pintu kaca</h1>
                            <p className="card-text">Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container style={{ margin: "auto" }}>
                {/* KANAN */}
                <Row>
                    <Col style={{ margin: "auto" }}>
                        <div className="card-body my-5"
                            style={{}}>
                            <h1 className="card-title">HAUGA V.3</h1>
                            <h1 className="card-title">Mr. DYI|Perabotan</h1>
                            <p className="card-text">Mudah untuk menyembunyikan kabel dan stopkontak tapi tetap dapat dijangkau dengan jalur kabel di bagian belakang.</p>
                        </div>
                    </Col>
                    <Col className="col-12 col-md-5" style={{ textAlign:"center" }}>
                    <img
                            className="my-5 shadow mb-1 bg-white rounded"
                            width="80%"
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/727/0972709_PE811745_S4.jpg"
                            alt="..." />
                    </Col>
                </Row>
            </Container>
            <Container style={{ margin: "auto" }}>
                {/* KIRI */}
                <Row>
                    <Col className="col-12 col-md-5 text-center">
                        <img
                            className="my-5 shadow mb-1 bg-white rounded"
                            width="80%"
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/388/0938824_PE794380_S4.jpg"
                            alt="..." />
                    </Col>
                    <Col style={{ marginTop: "auto" }}>
                        <div className="card-body my-5"
                            style={{}}>
                            <h1 className="card-title">RUDSTA</h1>
                            <h1 className="card-title">IKEA|Kabinet pintu kaca</h1>
                            <p className="card-text">Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            

        </div>



    }
    render() {
        return (
            <div>
                <div>
                    {this.printCarousel()}
                </div>
                <div>
                    {this.printHalaman()}
                </div>
            </div>
        );
    }
}

export default HomePage;
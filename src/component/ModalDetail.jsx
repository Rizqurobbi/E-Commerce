import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { Form, FormGroup, Label, Input, Row} from "reactstrap"

class ModalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOpen: false
    }
  }
  render() {
    return (
      <div>
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
            type ="text"
            defaultValue={this.state.nama}
            />
            </FormGroup>
            <FormGroup>
            <Label for="form-deskripsi">
            Deskripsi
            </Label>
            <Input
            id="form-deskripsi"
            name="deskripsi"            
            type ="text"
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
            type ="text"
            defaultValue
            />
            </FormGroup>
            <FormGroup className="col-6">
            <Label for="form-kategori">
            Kategori
            </Label>
            <Input
            id="form-kategori"
            name="kategori"            
            type ="text"
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
            type ="number"
            />
            </FormGroup>
            <Row>
            <FormGroup className="col-5">
            <Label for="form-stok1">
              Stok
            </Label>
            <Input
            id="form-stok1"
            name="brand"            
            type ="text"
            />
            </FormGroup>
            <FormGroup className="col-5">
            <Label for="form-kategori">
            
            </Label>
            <Input
            id="form-stok2"
            name="stok2"            
            type ="number"
            />
            </FormGroup>
            <Button className="col-2">
              Delete
            </Button>
            </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={function noRefCheck() { }}>
              Do Something
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

export default ModalDetail;
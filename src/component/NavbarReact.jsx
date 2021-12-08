import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { connect } from 'react-redux'
import { logOutAction } from '../redux/actions';
class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false,
        }
    }
    totalCart = () => {
        let total = 0
        this.props.cart.forEach((val) => {
            total += val.qty
        });
        return total
    }
    render() {
        return (
            <Navbar expand="md" className="shadow">
                <NavbarBrand>
                    <Link to="/">
                        <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" alt="logo-brand" width="50px" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link className="nav-link" to="/products">
                                Product
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {
                        this.props.loading ?
                            <Spinner style={{ marginLeft: "auto", marginRight: 50 }}>Loading...</Spinner>
                            :
                            this.props.username ?
                                <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                    <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "#0984e3" }}>
                                        Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                    </DropdownToggle>
                                    {
                                        this.props.role == "user"
                                            ?
                                            <DropdownMenu right>
                                                <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    <DropdownItem>
                                                        Cart ({this.totalCart()})
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="history-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    <DropdownItem>
                                                        Transactions History
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    <DropdownItem>
                                                        Profile
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.logOutAction() }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                            :
                                            <DropdownMenu right >
                                                <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                    <DropdownItem>
                                                        Products Management
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/transaction-management" style={{ color: "#2d3436" }} className="nav-link">
                                                    <DropdownItem>
                                                        Transactions Management
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.logOutAction() }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                    }

                                </UncontrolledDropdown>
                                :

                                <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                                    <Button type="button" color="warning" outline>Masuk dan Daftar</Button>
                                </Link>


                    }
                </Collapse>
            </Navbar>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        cart: state.userReducer.cart,
        iduser: state.userReducer.id

    }
}
export default connect(mapToProps, { logOutAction })(NavbarComponent);
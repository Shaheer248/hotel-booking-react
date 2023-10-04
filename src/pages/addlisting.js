import React from 'react';
import '../App.css';
import { Form } from 'react-bootstrap';
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import firebase from 'firebase/app';
import 'firebase/database';
import swal from 'sweetalert';

class AddListing extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            hotelname: '',
            contact: '',
            address: '',
            rooms: '',
            restrooms: '',
            ca: '',
            cb: '',
        }
    }

    componentDidMount = () => {
        const loginuser = localStorage.getItem('user');
        if(loginuser == '' || loginuser == ' ' || loginuser == null || loginuser == undefined ){
            window.location.href = '/login';
        }else{
            this.setState({ user: loginuser, })
        }
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">Hotel Booking</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home#listing">View Listings</Nav.Link>
                                <Nav.Link href="">Add Your Own Listing</Nav.Link>
                            </Nav>
                            <Nav>
                            <Nav.Link href="" style={{ fontWeight: 'bold', color: 'white' }}>View/Edit Profile ({this.state.user})</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div style={{ position: 'absolute', left: '5%', top: '12%', right: '5%', borderRadius: "5px", backgroundColor: "#f2f2f2", padding: "20px" }}>
                    <h1>Add Your Hotel Listing:</h1>
                    <Form.Control type="text" placeholder="Enter hotel name...*" onChange={(e) => this.setState({ hotelname: e.target.value })} />
                    <Form.Control type="text" placeholder="Enter per night price...*" onChange={(e) => this.setState({ price: e.target.value })} />
                    <Form.Control type="email" placeholder="Enter contact email...*" onChange={(e) => this.setState({ contact: e.target.value })} />
                    <Form.Control type="text" placeholder="Enter address...*" onChange={(e) => this.setState({ address: e.target.value })} />
                    <Form.Control type="number" placeholder="Enter total rooms...*" onChange={(e) => this.setState({ rooms: e.target.value })} />
                    <Form.Control type="number" placeholder="Enter total restrooms...*" onChange={(e) => this.setState({ restrooms: e.target.value })} />
                    <Form.Check
                        type='checkbox'
                        onChange={(e) => this.setState({ ca: e.target.checked })}
                        label={`Is there free food available*`}
                        style={{ display: 'inline-block', paddingRight: '20px' }}
                    />
                    <Form.Check
                        type='checkbox'
                        onChange={(e) => this.setState({ cb: e.target.checked })}
                        label={`Does your hotel follow SOPs*`}
                        style={{ display: 'inline-block' }}
                    />
                    <br /><br />
                    <Button variant="primary" type="submit" style={{ width: '100%' }} onClick={this.addlisting}>Submit</Button>
                </div>
            </>)
    }

    addlisting = async() => {
        var randomnumber = Math.floor(Math.random() * (80000000000000 - 10 + 1)) + 80000000000000;
        if(this.state.contact == '' || this.state.address == '' || this.state.hotelname == '' || this.state.rooms == '' || this.state.restrooms == '' || this.state.price == ''){
            swal('Please fill all the required fields.')
        }else{
        if(this.state.cb == undefined){await this.setState({cb: false})}
        await firebase.database().ref('listings/'+randomnumber+'/').set({
            dbID: randomnumber,
            hotelname: this.state.hotelname,
            user: localStorage.getItem('user'),
            contact: this.state.contact,
            address: this.state.address,
            rooms: this.state.rooms,
            restrooms: this.state.restrooms,
            ca: this.state.ca,
            cb: this.state.cb,
            price: this.state.price,
        })
        window.location.href = '/home';
    }
    }
}

export default AddListing
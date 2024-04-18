import React, { useState, useEffect } from 'react';
import '../App.css';
import { Form } from 'react-bootstrap';
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import firebase from 'firebase/app';
import 'firebase/database';
import swal from 'sweetalert';

function AddListing() {

    const [user, setUser] = useState(undefined);
    const [hotelname, setHotelname] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [rooms, setRooms] = useState('');
    const [restrooms, setRestrooms] = useState('');
    const [ca, setCa] = useState('');
    const [cb, setCb] = useState('');

    useEffect(()=>{
        const loginuser = localStorage.getItem('user');
        if (loginuser == '' || loginuser == ' ' || loginuser == null || loginuser == undefined) {
            window.location.href = '/login';
        }else{
            setUser(loginuser)
        }
    }, [])

    async function add() {
        var randomnumber = Math.floor(Math.random() * (80000000000000 - 10 + 1)) + 80000000000000;
        if (contact == '' || address == '' || hotelname == '' || rooms == '' || restrooms == '' || price == '') {
            swal('Please fill all the required fields.')
        } else {
            if (cb == undefined) { await setCb(false) }
            await firebase.database().ref('listings/' + randomnumber + '/').set({
                dbID: randomnumber,
                hotelname: hotelname,
                user: localStorage.getItem('user'),
                contact: contact,
                address: address,
                rooms: rooms,
                restrooms: restrooms,
                ca: ca,
                cb: cb,
                price: price,
            })
            window.location.href = '/home';
        }
    }

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
                                <Nav.Link href="" style={{ fontWeight: 'bold', color: 'white' }}>View/Edit Profile ({user})</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div style={{ position: 'absolute', left: '5%', top: '12%', right: '5%', borderRadius: "5px", backgroundColor: "#f2f2f2", padding: "20px" }}>
                    <h1>Add Your Hotel Listing:</h1>
                    <Form.Control type="text" placeholder="Enter hotel name...*" onChange={(e) => setHotelname(e.target.value)} />
                    <Form.Control type="text" placeholder="Enter per night price...*" onChange={(e) => setPrice(e.target.value)} />
                    <Form.Control type="email" placeholder="Enter contact email...*" onChange={(e) => setContact(e.target.value)} />
                    <Form.Control type="text" placeholder="Enter address...*" onChange={(e) => setAddress(e.target.value)} />
                    <Form.Control type="number" placeholder="Enter total rooms...*" onChange={(e) => setRooms(e.target.value)} />
                    <Form.Control type="number" placeholder="Enter total restrooms...*" onChange={(e) => setRestrooms(e.target.value)} />
                    <Form.Check
                        type='checkbox'
                        onChange={(e) => setCa(e.target.checked)}
                        label={`Is there free food available*`}
                        style={{ display: 'inline-block', paddingRight: '20px' }}
                    />
                    <Form.Check
                        type='checkbox'
                        onChange={(e) => setCb(e.target.checked)}
                        label={`Does your hotel follow SOPs*`}
                        style={{ display: 'inline-block' }}
                    />
                    <br /><br />
                    <Button variant="primary" type="submit" style={{ width: '100%' }} onClick={()=>add}>Submit</Button>
                </div>
            </>)
}

export default AddListing;
import React from "react";
import '../App.css'
import { Nav, Navbar, Container, Card, Button } from 'react-bootstrap'
import Cover from '../imgs/cover.jpg';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            hotels: [],
        }
    }

    componentDidMount = () => {
        const loginuser = localStorage.getItem('user');
        this.setState({ user: loginuser, })

        firebase.database().ref('listings').on('child_added', (snapshot) => {
            const snap = snapshot.val();
            var newStateArray = this.state.hotels.slice();
            if(snap.user == loginuser){}else{
            newStateArray.push({ id: this.state.hotels.length + 1, dbID: snap.dbID, name: snap.hotelname, user: snap.user, contact: snap.contact, address: snap.address, ca: snap.ca, cb: snap.cb, rooms: snap.rooms, restrooms: snap.restrooms, price: snap.price });
            this.setState({ hotels: newStateArray, });
            console.log(this.state.hotels)
            }
        });
    }

    render() {
        if (localStorage.getItem('user') == '' || localStorage.getItem('user') == ' ' || localStorage.getItem('user') == null || localStorage.getItem('user') == undefined) {
            return (
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="">Hotel Booking</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#listing">View Listings</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link style={{ fontWeight: 'bold' }}>Not Logged in</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div class="imgContainer">
                        <img src={Cover} alt="fireSpot" width='100%' />
                        <div className="top-left" style={{ position: 'absolute', left: '25px' }}>We have <br /> Your Booking Needs <br /> Covered</div>
                    </div>
                    <hr />
                    <div id="listing" style={{ position: 'absolute', left: '25px' }}>
                        <h1>Hotel listings:</h1>
                        {this.state.hotels.map((i, v) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem', display: 'inline-block' }} key={i+v+'key'}>
                                        <Card.Body>
                                            <Card.Title>{i.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">By: {i.user} <br />Contact: {i.contact}</Card.Subtitle>
                                            <Card.Text>
                                                It has {i.rooms} room(s) and {i.restrooms} restroom(s)
                                            </Card.Text>
                                            <Card.Text>It gives {i.ca ? 'free food' : "doesn't give any free food"} and It {i.cb ? 'follows SOPs' : "doesn't follow any SOPs"}</Card.Text>
                                            <Card.Title style={{display: 'inline-block',}}>{i.price}</Card.Title><Card.Text style={{display: 'inline-block'}}>/per night</Card.Text>
                                            <Button variant='primary' style={{width: '100%'}} onClick={()=>{window.location.href = '/login'}}>You need to login to book this Hotel</Button>
                                       </Card.Body>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="#home">Hotel Booking</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#listing">View Listings</Nav.Link>
                                    <Nav.Link href="/add">Add Your Own Listing</Nav.Link>
                                </Nav>
                                <Nav>
                                <Nav.Link href="/profile" style={{ fontWeight: 'bold',}}>View/Edit Profile ({this.state.user})</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div class="imgContainer">
                        <img src={Cover} alt="fireSpot" width='100%' />
                        <div className="top-left" style={{ position: 'absolute', left: '25px' }}>We have <br /> Your Booking Needs <br /> Covered</div>
                    </div>
                    <hr />
                    <div id="listing" style={{ position: 'absolute', left: '25px' }}>
                        <h1>Hotel listings:</h1>
                        {this.state.hotels.map((i, v) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem', display: 'inline-block' }} key={i+v+'key'}>
                                        <Card.Body>
                                            <Card.Title>{i.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">By: {i.user} <br />Contact: {i.contact}</Card.Subtitle>
                                            <Card.Text>
                                                It has {i.rooms} room(s) and {i.restrooms} restroom(s)
                                            </Card.Text>
                                            <Card.Text>It gives {i.ca ? 'free food' : "doesn't give any free food"} and It {i.cb ? 'follows SOPs' : "doesn't follow any SOPs"}</Card.Text>
                                            <Card.Title style={{display: 'inline-block',}}>{i.price}</Card.Title><Card.Text style={{display: 'inline-block'}}>/per night</Card.Text>
                                            <Button variant='primary' style={{width: '100%'}} onClick={()=>{window.location.href = '/book#'+i.dbID}}>Book this hotel</Button>
                                       </Card.Body>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </>
            )
        }
    }
}

export default Home
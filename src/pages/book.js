import React from 'react';
import { Nav, Navbar, Container, Card, Button } from 'react-bootstrap'
import firebase from 'firebase/app';
import 'firebase/database';
import swal from 'sweetalert';

export default class Book extends React.Component {

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
        const ID = window.location.href.split('#').pop();
        firebase.database().ref('listings').on('child_added', (snapshot) => {
            const snap = snapshot.val();
            console.log(ID,snap.dbID)
            var newStateArray = this.state.hotels.slice();
            if(snap.dbID == ID){
            newStateArray.push({ id: this.state.hotels.length + 1, dbID: snap.dbID, name: snap.hotelname, user: snap.user, contact: snap.contact, address: snap.address, ca: snap.ca, cb: snap.cb, rooms: snap.rooms, restrooms: snap.restrooms, price: snap.price });
            this.setState({ hotels: newStateArray, });
            console.log(this.state.hotels)
            }else{
                swal('The hotel you want to book no longer exists.')
            }
        });
    }

    bookHotel=async()=>{
    var randomnumber = Math.floor(Math.random() * (80000000000000 - 10 + 1)) + 80000000000000;
    const loginuser = localStorage.getItem('user').replace(/[^a-zA-Z ]/g, "");
    const ID = window.location.href.split('#').pop();
    await firebase.database().ref(loginuser+'/'+randomnumber+'/').set({
            id: ID
    })
    swal('Hotel has been booked.')
    window.location.href = '/profile'
    }

    render() {
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
                                <Nav.Link href="/profile" style={{ fontWeight: 'bold', }}>View/Edit Profile ({this.state.user})</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div style={{ position: 'absolute', left: '5%', top: '12%', right: '5%', borderRadius: "5px", backgroundColor: "#f2f2f2", padding: "20px" }}>
                    <h3 style={{textAlign: 'center'}}>Do you really want to book this hotel?</h3>
                    <Button variant="primary" type="submit" style={{ width: '100%' }} onClick={this.bookHotel}>Yes</Button>
                    <hr />
                    <Button variant="danger" type="submit" style={{ width: '100%' }} onClick={()=>{window.location.href = '/home'}}>No</Button>
                    <br></br>
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


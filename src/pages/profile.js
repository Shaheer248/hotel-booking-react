import React from "react";
import '../App.css'
import { Nav, Navbar, Container, Card, Button} from 'react-bootstrap'
import Cover from '../imgs/cover.jpg';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import swal from "sweetalert";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            hotels: [],
            hotelsbk: [],
        }
    }

    componentDidMount = async() => {
        const loginuser = localStorage.getItem('user');
        this.setState({ user: loginuser, })

        await firebase.database().ref('listings').on('child_added', (snapshot) => {
            const snap = snapshot.val();
            if(snap.user == loginuser){
            var newStateArray = this.state.hotels.slice();
            newStateArray.push({ id: this.state.hotels.length + 1, name: snap.hotelname, user: snap.user, contact: snap.contact, address: snap.address, ca: snap.ca, cb: snap.cb, rooms: snap.rooms, restrooms: snap.restrooms });
            this.setState({ hotels: newStateArray, });
            console.log(this.state.hotels)
            }
        });

        await firebase.database().ref(localStorage.getItem('user').replace(/[^a-zA-Z ]/g, "")+'/').on('child_added', async(snapshot) =>{
            const snap = snapshot.val();
            const id = snap.id;
            await firebase.database().ref('listings').on('child_added', (snapshot) => {
                const snap = snapshot.val();
                if(snap.dbID == id){
                var newStateArray = this.state.hotelsbk.slice();
                newStateArray.push({ id: this.state.hotelsbk.length + 1, name: snap.hotelname, user: snap.user, contact: snap.contact, address: snap.address, ca: snap.ca, cb: snap.cb, rooms: snap.rooms, restrooms: snap.restrooms });
                this.setState({ hotelsbk: newStateArray, });
                }
            });
        })
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
                                    <Nav.Link href="/home#listing">View Listings</Nav.Link>
                                    <Nav.Link href="/add">Add Your Own Listing</Nav.Link>
                                    <Nav.Link href="/login" style={{color: 'red'}}>Goto Login</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link href="" style={{ fontWeight: 'bold', color: 'white' }}>View/Edit Profile ({this.state.user})</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <hr />
                    <div id="listing" style={{ position: 'absolute', left: '25px' }}>
                        <h1>Edit Your listings:</h1>
                        {this.state.hotels.map((i, v) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem', display: 'inline-block' }} key={i+v+'key'}>
                                        <Card.Body>
                                            <Card.Title>{i.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">By: {i.user} (You) <br />Contact: {i.contact}</Card.Subtitle>
                                            <Card.Text>
                                                It has {i.rooms} room(s) and {i.restrooms} restroom(s)
                                            </Card.Text>
                                            <Card.Text>It gives {i.ca ? 'free food' : "doesn't give any free food"} and It {i.cb ? 'follows SOPs' : "doesn't follow any SOPs"}</Card.Text>
                                            <Button variant='danger' style={{width: '100%'}} onClick={async()=>{await firebase.database().ref('listings/'+i.dbID).remove();swal('You deleted this hotel post');}}>Delete this hotel post</Button>
                                       </Card.Body>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                    <div id="listing" style={{ position: 'absolute', left: '25px', top: '64%' }}>
                        <h1>Hotels you have booked:</h1>
                        {this.state.hotelsbk.map((i, v) => {
                            return (
                                <>
                                    <Card style={{ width: '18rem', display: 'inline-block' }} key={i+v+'key'}>
                                        <Card.Body>
                                            <Card.Title>{i.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">By: {i.user} (You) <br />Contact: {i.contact}</Card.Subtitle>
                                            <Card.Text>
                                                It has {i.rooms} room(s) and {i.restrooms} restroom(s)
                                            </Card.Text>
                                            <Card.Text>It gives {i.ca ? 'free food' : "doesn't give any free food"} and It {i.cb ? 'follows SOPs' : "doesn't follow any SOPs"}</Card.Text>
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

export default Home
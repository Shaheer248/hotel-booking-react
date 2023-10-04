import React, {Component} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Start from './pages/start';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import AddListing from './pages/addlisting';
import Profile from './pages/profile';
import Book from './pages/book';

class App extends Component {
  render(){
    return(
      <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<AddListing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/book" element={<Book />} />
    </Routes>
    )
  }
}

export default App;



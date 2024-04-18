import React, { useState, useEffect } from "react";
import '../App.css'

function Start() {

    const [loading, setLoading] = useState('Loading...')
    const [count, setCount] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setLoading('Loading...');
            setTimeout(() => {
                setLoading('Loading..');
                setTimeout(() => {
                    setLoading('Loading.');
                    setCount(count + 1);
                }, 500)
            }, 500)
        }, 1500)

        setInterval(() => {
                window.location.href = '/home';
        }, 200);
    }, [])

    return (
        <div className="content" style={{ textAlign: 'center', color: 'black' }}>
            <h2>Hotel Booking App</h2>
            <h1 style={{ fontSize: '60px' }}>{loading}</h1>
        </div>
    )
}

export default Start
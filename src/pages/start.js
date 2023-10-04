import React from "react";
import '../App.css'

class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: 'Loading...',
            loadingColor: 'black',
            count: 0,
        }
    }

    componentDidMount = () => {
            setInterval(() => {
                this.setState({ loading: 'Loading...', loadingColor: 'red' });
                setTimeout(() => {
                    this.setState({ loading: 'Loading..', loadingColor: 'green'  });
                    setTimeout(() => {
                        this.setState({ loading: 'Loading.', loadingColor: 'blue', count: this.state.count + 1  });
                    }, 500)
                }, 500)
            }, 1500)

            setInterval(() => {
                if(this.state.count >= 1){
                    window.location.href = '/home';
                }
            }, 100);
    }

    render() {
        return (
            <div className="content" style={{ textAlign: 'center', color: 'black' }}>
                <h2 style={{color: this.state.loadingColor}}>Hotel Booking App</h2>
                <h1 style={{fontSize: '60px', color: this.state.loadingColor}}>{this.state.loading}</h1>
            </div>
        )
    }
}

export default Start
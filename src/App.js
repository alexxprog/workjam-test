import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import News from './components/News';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="container">
                    <article>
                        <div className="header">
                            <h1>WorkJam React Test</h1>
                            <div className="header__news"><img src="y18.gif" alt="" /><h2>Hacker News</h2></div>
                        </div>

                        <div id="alert-panel"></div>

                        <div className="section news">
                            <News />
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default App;

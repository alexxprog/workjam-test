import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import News from './pages/news';
import Comments from './pages/comments';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="container">
                    <article>
                        <div className="header">
                            <h1>WorkJam React Test</h1>
                            <div className="header__news"><img src="/y18.gif" alt="" /><h2><a href="/">Hacker News</a></h2></div>
                        </div>

                        <div id="alert-panel"></div>

                        <Router>
                            <div>
                                <Route exact path="/" component={News}/>
                                <Route path="/comments/:id" component={Comments}/>
                            </div>
                        </Router>
                    </article>
                </div>
            </div>
        );
    }
}

export default App;

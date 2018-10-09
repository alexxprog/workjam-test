import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Model from '../components/Model';
import AlertDismissable from '../components/AlertDismissable';
import NewsItem from '../components/NewsItem';

class News extends Component {

    constructor(){
        super();

        this.state = {
            newsIds: []
        };
        this.model = Model.getInstance();
    }

    showError(errorText) {
        ReactDOM.render(<AlertDismissable title="File loading error" text={errorText} type="danger" timeout="1000" dismissable={true} />, document.getElementById('alert-panel'));
    }

    componentDidMount() {
        let self = this;
        this.model.getTopNews()
            .then((responce) => {
                if(responce.data.length > 0) {
                    let ids = responce.data.slice(0, 10);
                    self.setState({
                        newsIds: ids
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                self.showError('Top stories url is not accessible. Please try to refresh the page');
            });
        ;
    }

    render() {
        if(this.state.newsIds.length){
            return (
                <section className="news">
                    <ol className="news-list">
                        {this.state.newsIds.map((value, key) => {
                            let props = { id: value };

                            return (<NewsItem key={key} count={key} {...props} />);
                        })
                        }
                    </ol>
                </section>
            );
        } else {
            return('');
        }
    }
}


export default News;
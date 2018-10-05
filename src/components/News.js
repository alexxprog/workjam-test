import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Model from './Model';
import AlertDismissable from './AlertDismissable';
import NewsItem from './NewsItem';

class News extends Component {

    constructor(){
        super();

        this.news = [];
        this.state = {
            newsItems: []
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
                    ids.forEach((id) => {
                        self.model.getItem(id)
                            .then((responce) => {
                                self.news.push(responce.data);
                                self.setState({
                                    newsItems: self.news
                                });
                            });
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                self.showError('Top stories url is not accessible. Please try to refresh the page');
            })
            .finally(() => {
                if(self.news.length > 0){
console.log('finally', self.news);
                    self.setState({
                        newsItems: self.news
                    });
                }
            });
        ;
    }

    render() {
        if(this.state.newsItems.length){
            let count = 0;
            return (
                <ol className="news-list">
                    {this.state.newsItems.map((value, key) => {
                            let props = value;
                            count=+1;

                            return (<NewsItem key={key} count={key} {...props} />);
                        })
                    }
                </ol>
            );
        } else {
            return('');
        }
    }
}


export default News;
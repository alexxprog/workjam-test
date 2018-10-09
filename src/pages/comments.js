import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Model from '../components/Model';
import AlertDismissable from '../components/AlertDismissable';
import CommentItem from '../components/CommentItem';
import NewsItem from '../components/NewsItem';

class Comments extends Component {

    constructor(props){
        super(props);

        this.model = Model.getInstance();
        this.state = {
            id: this.props.match.params.id,
            ids: []
        };
    }

    showError(errorText) {
        ReactDOM.render(<AlertDismissable title="File loading error" text={errorText} type="danger" timeout="1000" dismissable={true} />, document.getElementById('alert-panel'));
    }

    componentDidMount() {
        let self = this;
        this.model.getItem(this.state.id)
            .then((responce) => {
                if(responce.data) {
                    self.setState({
                        item: responce.data
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                self.showError('Top comments url is not accessible. Please try to refresh the page');
            });
        ;
    }

    render() {
        if(this.state.item && this.state.item.kids.length){
            let props = { item: this.state.item },
                comments = this.state.item.kids.slice(0,20);
            return (
                <section className="comments">

                    <ul className="news-list">
                        <NewsItem {...props} />
                    </ul>

                    <ul className="comments-list">
                        {comments.map((value, key) => {
                                let props = { id: value };

                                return (<CommentItem key={key} {...props} />)
                            })
                        }
                    </ul>
                </section>
            );
        } else {
            return('');
        }
    }
}


export default Comments;
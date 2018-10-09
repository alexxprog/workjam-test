import React, { Component } from 'react';
import Model from './Model';

class CommentItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props
        };
        this.model = Model.getInstance();
    }

    componentDidMount() {
        let self = this;
        this.model.getItem(this.state.data.id)
            .then((responce) => {
                self.setState({
                    item: responce.data
                });
            });
    }


    getDomain(url){
        if(!url) {
            return '';
        }

        let domain = '',
            linkParts=url.split('//');

        domain = (linkParts) ? linkParts[1].split('/')[0] : '';
        return domain;
    }

    render() {
        if(this.state.item) {
            let data = this.state.item,
                ago = this.model.timeAgo(data.time);

            return (
                <li className="comment-item">
                    <div className="comment-item__title">{data.by} {ago}</div>
                    <div className="comment-item__text" dangerouslySetInnerHTML={{__html: data.text}} />
                </li>
            );
        } else {
            return('');
        }
    }
}


export default CommentItem;
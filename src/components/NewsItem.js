import React, { Component } from 'react';
import Model from './Model';

class NewsItem extends Component {

    constructor(props){
        super(props);

        if(this.props.item) {
            this.state = {
                item: this.props.item
            }
        } else {
            this.state = {
                data: this.props
            };
        }
        this.model = Model.getInstance();
    }

    componentDidMount() {
        if(this.state.item) return;

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
                domain = this.getDomain(data.url),
                commentsLink = '/comments/' + data.id,
                ago = this.model.timeAgo(data.time);
            return (
                <li className="news-item">
                    <a className="news-item__title" href={data.url}>{data.title}</a><span className="news-item__domain">({domain})</span>
                    <div className="news-item__info">{data.score} points by {data.by} {ago} | <a className="news-item__comments" href={commentsLink}>{data.descendants} comments</a></div>
                </li>
            );
        } else {
            return('');
        }
    }
}


export default NewsItem;
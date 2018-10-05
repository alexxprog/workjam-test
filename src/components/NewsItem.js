import React, { Component } from 'react';

class NewsItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: props
        };
    }

    render() {
console.log(this.state.data);
        let data = this.state.data;
        return (
            <li className="news-item">
                <span className="news-item__number"></span> {data.title}
                <div className="news-item__info">{data.score} points by {data.by} 1 hour ago | {data.descendants} comments</div>
            </li>
        );
    }
}


export default NewsItem;
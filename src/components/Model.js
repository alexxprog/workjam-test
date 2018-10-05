import { Component } from 'react';
import axios from 'axios';

class Model extends Component {

    constructor(){
        super();
        this.config = {
            topstories: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
            item: 'https://hacker-news.firebaseio.com/v0/item/@@id@@.json?print=pretty'
        }
    }

	/**
	 * Creates instance of Model and returns it
	 * @returns {Model}
	 */
	static getInstance(){
		return new Model();
	}

    getTopNews() {
		return axios.get(this.config.topstories);
    }

    getItem(id) {
        let url = this.config.item.replace('@@id@@', id);
		return axios.get(url);
    }


	render() {
		return ('');
	}
}

export default Model;
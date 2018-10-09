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

    timeAgo(time) {
        if (!time) return 'some time ago';

        let templates = {
            prefix: "",
            suffix: " ago",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "%d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years"
        };

        let template = function(t, n) {
            return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
        };

        time = new Date(time * 1000 || time);

        let now = new Date();
        let seconds = ((now.getTime() - time) * .001) >> 0;
        let minutes = seconds / 60;
        let hours = minutes / 60;
        let days = hours / 24;
        let years = days / 365;

        return templates.prefix + (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
            ) + templates.suffix;
    }

	render() {
		return ('');
	}
}

export default Model;
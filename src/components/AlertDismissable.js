import React, { Component } from 'react';
import { Alert } from 'bootstrap';

class AlertDismissable extends Component {

	constructor(props){
		super(props);
		let self = this;

		this.state = {
			alertVisible: true,
			title: props.title,
			text: props.text,
			type: props.type,
			dismissable: props.dismissable,
			timeout: props.timeout*1000
		};

		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
		this.handleAlertShow = this.handleAlertShow.bind(this);
		this.timeout = setTimeout(function(){
			if(this.state.dismissable) {
				self.handleAlertDismiss();
			}

		}, this.state.timeout);
	}

	render() {
		if (this.state.alertVisible) {
			return (
				<div>
					<Alert bsStyle={this.state.type} onDismiss={this.handleAlertDismiss}>
						{/*<h4>{this.state.title}</h4>*/}
						<p>{this.state.text}</p>
					</Alert>
				</div>
			);
		} else {
			return (<div></div>)
		}
	}

	componentDidMount() {
		if(!this.state.dismissable) {
			let btn = document.querySelector('#alert-panel .alert .close');
			btn.style.display = 'none';
		}
	}

	handleAlertDismiss() {
		if(!this.state.dismissable) return;

		this.setState({alertVisible: false});
		let node = document.getElementById('alert-panel');
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
		clearTimeout(this.timeout);
	}

	handleAlertShow() {
		this.setState({alertVisible: true});
	}

}

export default AlertDismissable;
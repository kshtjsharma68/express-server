import React, { Component } from "react";
import { Button } from 'antd';
// import { Button, FormGroup, FormControl, ControlLabel  } from "react-bootsrap";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			size: 'small'
		}; 
	}

	fetchData = async() => {
		let users = await fetch('/api/signin')
						.then(res => res.json())
						.then(res => {
							console.log('data',res)
						})
						.catch(err => {
							console.log('err', err)
						});
		console.log(users)
	}

	render() {

		const { isLoaded, size } = this.state;

		if(!isLoaded) {
			return(
					<div>
						<h3>App is loading...</h3>
						<Button type="primary" size={size} onClick={this.fetchData.bind(this)}>click here</Button>
					</div>
				);
		}

		return (
				<div>
					<h2>test</h2>
				</div>
			);
	}
}

export default Login;




import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import { Button, FormGroup, FormControl, ControlLabel  } from "react-bootsrap";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			users: [],
			size: 'small'
		}; 

		this.removeData = this.removeData.bind(this);
	}

	fetchData = _ => {
		// let users = await fetch('/api/signin')
		// 				.then(res => res.json())
		// 				.then(res => {
		// 					console.log('data',res)
		// 				})
		// 				.catch(err => {
		// 					console.log('err', err)
		// 				});
		// console.log(users)
		// fetch('/api/users')
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		this.setState({
		// 			isLoaded: true,
		// 			users: res.data
		// 		});
		// 	})
		// 	.catch(err => {
		// 		console.log('err', err)
		// 	});
		axios.get('/api/users')
		.then(res => res.data)
		.then(res => {
			let { data } = res; console.info(data)
			this.setState({
				isLoaded: true,
				users: data
			});
		})
		.catch(err => {
			console.log('err', err)
			return false;
		});
	}

	removeData = _ => {
		this.setState({
			isLoaded: false,
			users: []
		})
	}

	render() {

		const { isLoaded, users, size } = this.state;

		if(!isLoaded) {
			return(
					<div>
						<h3>App is loading...</h3>
						 <Button bsStyle="primary" size={size} onClick={this.fetchData.bind(this)}>click here
						 </Button> 
					</div>
				);
		}

		return (
				<div>
					<ol>
						{ users.map( user => 
							<li key={user._id}>{user.email}  {user.password}</li>
						)}
					</ol>	
					<Button onClick={this.removeData}>Remove data</Button>
				</div>
			);
	}
}

export default Login;




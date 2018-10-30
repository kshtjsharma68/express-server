import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

// import { Button, FormGroup, FormControl, ControlLabel  } from "react-bootsrap";
import "./Login.css";

//style
const style = {
		 margin: 15,
		};


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogged: false,
			username: '',
			password: ''			
		}; 

		this.removeData = this.removeData.bind(this);
		this.sendApiRequest = this.sendApiRequest.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	sendApiRequest = ({ url, payload, ...rest}) => {
			axios.get(url)
			.then(res => res.json())
			.then(res => console.log(res))
			.catch(err => {
				//throw exception on error
				console.log(err)
			});	
			fetch(url)
			.then(res => console.log('fetch', res))
			.catch(err => console.log('fetch-err', err))
			.finally(console.log('finally'))
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
		const { users } = this.state;
		if (!users.length) {
			axios.get('/api/users')
			.then(res => res.data)
			.then(res => {
				let { data } = res;
				this.setState({
					isLoaded: true,
					users: data
				});
			})
			.catch(err => {
				console.log('err', err)
				return false;
			});
		} else {
			this.setState({
				isLoaded: true
			});
		}
		
	}

	removeData = _ => {
		this.setState({
			isLoaded: false
		})
	}

	handleClick = e => {
	const { username, password } = this.state;
		var payload = {
			'email': username,
			'password': password
		};
		let data = { url: '/api/signup', payload };
		this.sendApiRequest({...data});
	}

	setStateDataWithIndex = ( index, value ) => {
		this.setState({
			index: value
		}); 
	}

	render() {

		const { isLogged, users, size } = this.state;

		if(isLogged) {
			return(
				<div>
					<div className="LoginContainer">
						<h3>App is loading...</h3>
						 <Button bsStyle="primary" size={size} onClick={this.fetchData.bind(this)}>click here
						 </Button> 
					</div>
					<div>
					</div>
				</div>
				);
		}

		return (
				<div>
			        <MuiThemeProvider>
			          <div>
			          <AppBar
			             title="Login"
			           />
			           <TextField
			             hintText="Enter your Username"
			             floatingLabelText="Username"
			             onChange = {(event,newValue) => this.setStateDataWithIndex('username', newValue)}
			             />
			           <br/>
			             <TextField
			               type="password"
			               hintText="Enter your Password"
			               floatingLabelText="Password"
			               onChange = {(event,newValue) => this.setStateDataWithIndex('password', newValue)}
			               />
			             <br/>
			             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
			         </div>
			         </MuiThemeProvider>
			      </div>
			);
	}
}

export default Login;




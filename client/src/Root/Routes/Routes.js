import React, { Component } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAutoSignIn } from "../../Store/actions/index";
import PrivateRoute from "./config/PrivateRoute";
import PublicRoute from "./config/PublicRoute";

import Home from "../../containers/Home/Home";
import SignUp from "../../containers/SignUp/SignUp";
import LogIn from "../../containers/LogIn/LogIn";
import Dashboard from "../../containers/Dashboard/Dashboard";
import Profile from "../../containers/Profile/Profile";

class Routes extends Component {
	componentDidMount() {
		const { onAutoSignIn } = this.props;
		onAutoSignIn();
	}

	render() {
		const { isAuth } = this.props;
		return (
			<Switch>
				<PrivateRoute
					isAuth={isAuth}
					path="/user/profile"
					component={Profile}
				/>
				<PrivateRoute
					isAuth={isAuth}
					path="/user/dashboard"
					component={Dashboard}
				/>
				<PublicRoute
					isAuth={isAuth}
					path="/user/login"
					component={LogIn}
				/>
				<PublicRoute
					isAuth={isAuth}
					path="/user/signup"
					component={SignUp}
				/>
				<PublicRoute isAuth={isAuth} path="/" exact component={Home} />
				<Redirect to="/" />
			</Switch>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token ? true : false
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAutoSignIn: cb => dispatch(authAutoSignIn(cb))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
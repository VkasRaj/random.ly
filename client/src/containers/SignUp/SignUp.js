import React, { Component, Fragment } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { FormControl, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { signup } from "../../Store/actions/index";
import SignUpForm from "../../components/Forms/SignUp/SignUp";
import FormLayout from "../../components/FormLayout/FormLayout";

class SignUp extends Component {
	state = {
		sendToLogin: false
	};

	onSignUp = values => {
		const { handleSignup } = this.props;
		if (values) {
			handleSignup(values, data => {
				this.setState({ sendToLogin: true });
			});
		}
	};

	render() {
		const { loading, error } = this.props;
		const { sendToLogin } = this.state;

		let redirect = null;
		if (sendToLogin) {
			redirect = <Redirect to="/user/login" />;
		}

		return (
			<Fragment>
				{redirect}
				<FormLayout>
					<SignUpForm
						onSubmit={this.onSignUp}
						loading={loading}
						formError={error}
					/>
					<FormControl margin="dense" fullWidth>
						<Typography
							align="center"
							color="textSecondary"
							variant="caption"
						>
							Already have an account?{" "}
							<NavLink to="/user/login">Login</NavLink>
						</Typography>
					</FormControl>
				</FormLayout>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.signupError
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleSignup: (data, cb) => dispatch(signup(data, cb))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp);

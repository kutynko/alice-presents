import React from "react";
import styled from "styled-components";
import { push } from "gatsby-link";

import { auth, facebook, google } from "../services/firebase";

const MainContent = styled.div`
	width: 100%;
	display: flex;
	height: 100vh;
	align-items: center;
`;

const LoginPanel = styled.div`
	width: 400px;
	margin: auto;
	text-align: center;
`;

const Text = styled.div`
	font-size: 26px;
`;

const Button = styled.button`
	padding: 1em 2em;
	border-radius: 0.3em;
	border: 1px solid #9a9a9a;
	margin: 1em;
	&:hover {
		background-color: #e3e3e3;
		border: 1px solid #ddd;
	}
`;

export default class extends React.Component {
	loginVk() {
		push("/");
	}

	loginFacebook() {
		auth.signInWithPopup(facebook);
	}

	loginGoogle() {
		auth.signInWithPopup(google);
	}

	render() {
		return (
			<MainContent>
				<LoginPanel>
					<Text>Здравствуйте!</Text>
					<Text>Представьтесь, пожалуйста</Text>
					<Button onClick={() => this.loginVk()}>VK</Button>
					<Button onClick={() => this.loginFacebook()}>Facebook</Button>
					<Button onClick={() => this.loginGoogle()}>Google</Button>
				</LoginPanel>
			</MainContent>
		);
	}
}

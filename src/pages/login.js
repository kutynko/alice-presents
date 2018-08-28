import React from "react";
import styled from "styled-components";
import { push } from "gatsby-link";

import { auth, facebook, google, initVk } from "../services/firebase";

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
	box-sizing: border-box;
	position: relative;
	/* width: 13em;  - apply for fixed size */
	margin: 0.2em;
	padding: 0 15px 0 46px;
	border: none;
	text-align: left;
	line-height: 34px;
	white-space: nowrap;
	border-radius: 0.2em;
	font-size: 16px;
	color: #fff;
	&:before {
		content: "";
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 34px;
		height: 100%;
	}
	&:focus {
		outline: none;
	}
	&:active {
		box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
	}
`;

const FacebookButton = styled(Button)`
	background-color: #4c69ba;
	background-image: linear-gradient(#4c69ba, #3b55a0);
	/*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
	text-shadow: 0 -1px 0 #354c8c;
	&:before {
		border-right: #364e92 1px solid;
		background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png") 6px 6px no-repeat;
	}
	&:hover,
	&:focus {
		background-color: #5b7bd5;
		background-image: linear-gradient(#5b7bd5, #4864b1);
	}
`;

const GoogleButton = styled(Button)`
	background: #dd4b39;
	&:before {
		border-right: #bb3f30 1px solid;
		background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png") 6px 6px no-repeat;
	}
	&:hover,
	&:focus {
		background: #e74b37;
	}
`;

const VkButton = styled(Button)`
	background: #4a76a8;
	padding-left: 54px;
	&:before {
		border-right: #224b7a 1px solid;
		background: url("https://vk.com/images/svg_icons/ic_head_logo.svg") 6px 7px no-repeat;
		width: 45px;
	}
	&:hover,
	&:focus {
		background: #3d6898;
	}
`;

const AnonymousLink = styled.a`
	font-size: 14px;
	text-decoration-style: none;
	color: #000;
	cursor: pointer;
`;

export default class extends React.Component {
	loginVk() {
		VK.Auth.login(response => {
			
			auth.updateCurrentUser(response.session.user)
		});
	}

	loginFacebook() {
		auth.signInWithPopup(facebook);
	}

	loginGoogle() {
		auth.signInWithPopup(google);
	}

	loginAnonymous() {
		auth.signInAnonymously();
	}

	render() {
		return (
			<MainContent>
				<LoginPanel>
					<Text>Здравствуйте!</Text>
					<Text>Представьтесь, пожалуйста</Text>
					<VkButton onClick={() => this.loginVk()}>VK</VkButton>
					<FacebookButton onClick={() => this.loginFacebook()}>Facebook</FacebookButton>
					<GoogleButton onClick={() => this.loginGoogle()}>Google</GoogleButton>
					<div>
						<AnonymousLink onClick={() => this.loginAnonymous()}>Я стесняюсь</AnonymousLink>
					</div>
				</LoginPanel>
			</MainContent>
		);
	}
}

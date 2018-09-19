import React from "react";
import PropTypes from "prop-types";
import { push } from "gatsby-link";
import styled, { keyframes } from "styled-components";
import { animateScroll } from "react-scroll";
import "../global.css";
import aliceUrl from "../alice.jpg";
import minnieUrl from "../minnie-cute2.png";
import { StyledPresentItem } from "../components/Present";

const S = ({ className, children }) => (
	<div className={className}>
		<InnerS>{children}</InnerS>
	</div>
);

const InnerS = styled.div`
	margin: 0 auto;
	width: 1300px;
	@media (max-width: 1400px) {
		margin: 0;
		width: 100%;
	}
`;

const fadeInAnimation = keyframes`
		from {
			opacity: 0;
			transform: translateY(-15px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
`;

const Section = styled(S)`
	background-color: ${props => props.color || ""};
	padding: 4em 0;
	text-align: center;
	vertical-align: middle;

	opacity: 0;
	transform: translateY(-15px);
	animation: ${fadeInAnimation} ease 0.4s forwards;

	@media (max-width: 1400px) {
		padding: 2em 0;
	}
`;

const Minnie = styled.img`
	position: absolute;
	left: 25px;
	top: 39px;
	height: 282px;
	@media (max-width: 700px) {
		display: none;
	}
`;

const DarkSection = Section.extend`
	background: #f20b1f;
	background: linear-gradient(to right, #f20b1f 1%, #f43b4b 75%, #f20b1f 100%);
	color: #fff;
`;

export default class extends React.Component {
	constructor(props) {
		super(props);
	}
	static contextTypes = {
		firebase: PropTypes.object
	};
	state = {
		presents: []
	};

	onPresentSelected(present) {
		return () => {
			let data = present.data();

			if (!!data.selected && data.selected !== this.context.firebase.auth.currentUser.uid) return;

			if (data.selected === this.context.firebase.auth.currentUser.uid) {
				this.context.firebase.db
					.collection("presents")
					.doc(present.id)
					.update({ selected: null });
			} else {
				this.context.firebase.db
					.collection("presents")
					.doc(present.id)
					.update({ selected: this.context.firebase.auth.currentUser.uid });
				this.setState({
					justSelected: true
				});

				animateScroll.scrollToBottom({ smooth: true, duration: 1000 });
			}
		};
	}

	logout() {
		this.context.firebase.auth.signOut().then(() => {
			push("/login");
		});
	}

	componentDidMount() {
		if (!this.context.firebase) return;
		if (!this.context.firebase.auth.currentUser) {
			push("/login");
			return;
		}

		this.setState({
			currentUserId: this.context.firebase.auth.currentUser.uid
		});

		this.context.firebase.db.collection("presents").onSnapshot(snapshot => {
			this.setState({
				presents: snapshot.docs
			});
		});
	}

	render() {
		if (!this.context.firebase) return <div />;
		if (!this.context.firebase.auth.currentUser) return <div />;

		let name = this.context.firebase.auth.currentUser.isAnonymous
			? "Таинственный незнакомец"
			: this.context.firebase.auth.currentUser.displayName;
		return (
			<div>
				<Section>
					<h1>Нашей Алисе скоро будет целый годик!</h1>
					<Minnie src={minnieUrl} />
					{name}
					<button
						onClick={() => {
							this.logout();
						}}>
						Выйти
					</button>
				</Section>
				<DarkSection>
					<h2>Приглашаем Вас вместе с нами отпраздновать это событие</h2>
					Мероприятие состоится 31.10.2018
					<br />
					<a href="https://yandex.by/maps/-/CBqTYMEapC">г. Могилев, ул. Лазаренко, 73Б, (ТЦ «Армада», 2 этаж)</a>
				</DarkSection>
				<Section>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies semper hendrerit. Vivamus ut fringilla lacus. Morbi
					tristique mi eros, sed placerat lectus laoreet a. Phasellus quis tempus dui. Class aptent taciti sociosqu ad litora torquent per
					conubia nostra, per inceptos himenaeos. Vivamus volutpat ornare turpis, eget interdum nisi. Maecenas ut lectus condimentum,
					tristique ipsum ac, aliquet dolor. Quisque sodales et odio quis consectetur. Sed lacinia nisl vel rhoncus cursus. Phasellus in
					condimentum dolor. Cras vel porttitor turpis. Suspendisse dapibus tempor quam quis feugiat. Donec convallis lobortis nunc, eget
					bibendum lorem vulputate in. Nullam imperdiet arcu commodo, mattis dolor vel, finibus ex. Duis vitae erat non massa feugiat
					auctor. Quisque sit amet facilisis nulla. Etiam at fringilla orci. Vestibulum hendrerit est sit amet libero sollicitudin, in
					egestas nibh sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam id aliquet
					orci, vel posuere velit. Ut non placerat purus, in malesuada odio. Nulla sit amet diam sodales, dictum nunc in, vehicula dolor.
					Duis pellentesque mollis rhoncus. Quisque commodo mollis maximus. Aenean vel elit lacus. Mauris commodo quam id libero ultricies
					porta. Pellentesque venenatis dolor erat, et dignissim odio pharetra vel. Maecenas efficitur mauris ut lorem commodo, ac egestas
					purus faucibus. Quisque elit purus, fermentum at magna sed, pulvinar pretium mauris. Mauris dignissim enim quis felis placerat, a
					malesuada quam venenatis. Duis varius lorem arcu, non sagittis tellus placerat ac. Praesent condimentum mi at vulputate ultrices.
					Aenean posuere dapibus nisl eu semper. Aliquam convallis arcu finibus felis facilisis, non vehicula nulla euismod. Ut nec
					vulputate orci. Etiam eu dignissim purus, eu ultrices magna. Aenean congue velit ut ipsum vestibulum aliquet sit amet a erat.
					Fusce sit amet purus lobortis, aliquam urna nec, convallis eros. Pellentesque habitant morbi tristique senectus et netus et
					malesuada fames ac turpis egestas. Nullam consectetur congue feugiat. Suspendisse consequat odio mauris, vitae congue nisl
					faucibus vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque congue suscipit
					lorem, ullamcorper finibus lectus. Nam finibus ante a massa congue, vel scelerisque elit posuere. Morbi vel nisi tristique,
					tristique augue vel, volutpat ipsum. Quisque vulputate ipsum ac lacinia tempor.
				</Section>
				{this.state.presents.map((p, index) => (
					<Section key={p.id} color={index % 2 == 0 ? "#fcced2" : ""}>
						<StyledPresentItem present={p.data()} onSelected={this.onPresentSelected(p)} currentUserId={this.state.currentUserId} />
					</Section>
				))}
				{this.state.justSelected && (
					<DarkSection>
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<img src={aliceUrl} alt="Алисочка" style={{ float: "left", height: 150, clipPath: "circle(65px at center)" }} />
							<div>
								<div>СПАСИБО!</div>
								<div>Будем очень рады видеть Вас на нашем празднике :)</div>
							</div>
						</div>
					</DarkSection>
				)}
			</div>
		);
	}
}

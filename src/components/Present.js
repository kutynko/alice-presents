import React from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";

const getButtonText = (selected, currentUserId) => {
	if (!!selected) {
		if (isMyPresent(selected, currentUserId)) return "Передумал";
		else return "Меня уже подарят";
	}

	return "Собираюсь подарить";
};

const isMyPresent = (selected, currentUserId) => selected === currentUserId;
const notChosen = selected => !selected;

const PresentItem = ({ className, present, onSelected, currentUserId }) => (
	<div className={className}>
		<Icon alt={present.description} src={present.imageUrl} />
		<div>
			<Title href={present.link}>{present.name}</Title>
			<Description>{present.description}</Description>
			<Button type={isMyPresent(present.selected, currentUserId) || notChosen(present.selected) ? "active" : "disabled"} onClick={onSelected}>
				{getButtonText(present.selected, currentUserId)}
			</Button>
		</div>
	</div>
);

const Title = styled.a`
	font-size: 20px;
	font-weight: bold;
	text-decoration: none;
	color: #000;
`;

const Icon = styled.img`
	max-width: 400px;
	object-fit: contain;
`;

const Description = styled.p`
	color: #9a9a9a;
`;

const buttonStyles = {
	active: {
		color: "#F20B1F"
	},
	disabled: {
		color: "lightgray"
	}
};

const Button = styled.button`
	font-size: 24px;
	background: linear-gradient(
		to bottom right,
		${props => buttonStyles[props.type].color} 1%,
		${props => lighten(0.1, buttonStyles[props.type].color)} 75%
	);
	border: 1px solid ${props => darken(0.5, buttonStyles[props.type].color)};
	padding: 1em 2em;
	border-radius: 0.5em;
	color: #fff;
	text-shadow: 1px 1px 3px ${props => darken(0.5, buttonStyles[props.type].color)};
	${props =>
		props.type === "active"
			? `&:hover {
		background: ${props => darken(0.5, buttonStyles[props.type].color)};
	}`
			: ""};
`;

export const StyledPresentItem = styled(PresentItem)`
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 800px) {
		flex-flow: column nowrap;
	}
`;

import React from "react"
import styled from 'styled-components';

const PresentItem = ({ className, present, onSelected }) => (
    <div className={className}>
        <Icon alt={present.description} src={present.imageUrl} />
        <div className="present-description">
            <Title href={present.link}>{present.name}</Title>
            <Description>{present.description}</Description>
        </div>
        <button disabled={present.selected} onClick={onSelected}>{present.selected ? 'Передумал': 'Собираюсь подарить'}</button>
    </div>)

const Title = styled.a`
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: #000;`

const Icon = styled.img`
    max-width: 400px;
    object-fit: contain;`

const Description = styled.p`
    color: #9a9a9a;`

export const StyledPresentItem = styled(PresentItem)`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 800px) {
        flex-flow: column nowrap;
    }`
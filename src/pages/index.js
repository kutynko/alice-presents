import React from "react";
import PropTypes from "prop-types";
import { push } from "gatsby-link";
import styled, { keyframes, css } from "styled-components";
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
  z-index: 2;

  transform: translateY(-15px);
  animation: ${fadeInAnimation} ease 0.4s forwards;

  @media (max-width: 1400px) {
    padding: 2em 0;
  }
`;

const backdrop = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Minnie = styled.img`
  ${backdrop} transform: translateZ(-1px) scale(2);

  @media (max-width: 700px) {
    display: none;
  }
`;

const ParallaxContainer = styled.div`
  perspective: 1px;
  perspective-origin: left;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  ${backdrop};
`;

const DarkSection = Section.extend`
background: rgb(242,11,31, 0.85);
background: linear-gradient(90deg, rgba(242,11,31,0.85) 1%, rgba(249,73,86,0.85) 75%, rgba(242,11,31,0.85) 100%);
  color: #fff;
  text-shadow: 1px 1px 1px black;
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

      if (
        !!data.selected &&
        data.selected !== this.context.firebase.auth.currentUser.uid
      )
        return;

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
      <ParallaxContainer>
        <Minnie src={minnieUrl} />
        <ContentContainer>
          <Section>
            <h1>Нашей Алисе скоро будет целый годик!</h1>
            {name}
            <button
              onClick={() => {
                this.logout();
              }}
            >
              Выйти
            </button>
          </Section>
          <DarkSection>
            <h2>Приглашаем Вас вместе с нами отпраздновать это событие</h2>
            Мероприятие состоится 31.10.2018
            <br />
            <a href="https://yandex.by/maps/-/CBqTYMEapC">
              г. Могилев, ул. Лазаренко, 73Б, (ТЦ «Армада», 2 этаж)
            </a>
          </DarkSection>
          <Section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            ultricies semper hendrerit. Vivamus ut fringilla lacus. Morbi
            tristique mi eros, sed placerat lectus laoreet a. Phasellus quis
            tempus dui. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Vivamus volutpat ornare
            turpis, eget interdum nisi. Maecenas ut lectus condimentum,
            tristique ipsum ac, aliquet dolor. Quisque sodales et odio quis
            consectetur. Sed lacinia nisl vel rhoncus cursus. Phasellus in
            condimentum dolor. Cras vel porttitor turpis. Suspendisse dapibus
            tempor quam quis feugiat. Donec convallis lobortis nunc, eget
            bibendum lorem vulputate in. Nullam imperdiet arcu commodo, mattis
            dolor vel, finibus ex. Duis vitae erat non massa feugiat auctor.
            Quisque sit amet facilisis nulla. Etiam at fringilla orci.
            Vestibulum hendrerit est sit amet libero sollicitudin, in egestas
            nibh sagittis. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia Curae; Etiam id aliquet orci, vel
            posuere velit. Ut non placerat purus, in malesuada odio. Nulla sit
            amet diam sodales, dictum nunc in, vehicula dolor. Duis pellentesque
            mollis rhoncus. Quisque commodo mollis maximus. Aenean vel elit
            lacus. Mauris commodo quam id libero ultricies porta. feugiat.
            Suspendisse consequat odio mauris, vitae congue nisl faucibus vitae.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Quisque congue suscipit lorem, ullamcorper
            finibus lectus. Nam finibus ante a massa congue, vel scelerisque
            elit posuere. Morbi vel nisi tristique, tristique augue vel,
            volutpat ipsum. Quisque vulputate ipsum ac lacinia tempor.
          </Section>
          {this.state.presents.map((p, index) => (
            <Section key={p.id} color={index % 2 == 0 ? "#fcced2" : ""}>
              <StyledPresentItem
                present={p.data()}
                onSelected={this.onPresentSelected(p)}
                currentUserId={this.state.currentUserId}
              />
            </Section>
          ))}
          {this.state.justSelected && (
            <DarkSection>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src={aliceUrl}
                  alt="Алисочка"
                  style={{
                    float: "left",
                    height: 150,
                    clipPath: "circle(65px at center)"
                  }}
                />
                <div>
                  <div>СПАСИБО!</div>
                  <div>Будем очень рады видеть Вас на нашем празднике :)</div>
                </div>
              </div>
            </DarkSection>
          )}
        </ContentContainer>
      </ParallaxContainer>
    );
  }
}

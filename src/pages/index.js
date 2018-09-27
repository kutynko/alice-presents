import React from "react";
import PropTypes from "prop-types";
import { push } from "gatsby-link";
import { Helmet } from "react-helmet";
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

const Minnie = styled.img`
  height: 200px;
  position: absolute;
  left: -100px;
  top: -40px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const DarkSection = Section.extend`
  background: rgb(242, 11, 31, 0.85);
  background: linear-gradient(
    90deg,
    rgba(242, 11, 31, 0.85) 1%,
    rgba(249, 73, 86, 0.85) 75%,
    rgba(242, 11, 31, 0.85) 100%
  );
  color: #fff;
  text-shadow: 1px 1px 1px black;
`;

const LogoutButton = styled.button`
  padding: 0.5em 2em;
  margin: auto 1em;
  border-radius: 0.5em;
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

        animateScroll.scrollToBottom({});
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
        <Helmet>
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <Section>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <Minnie src={minnieUrl} />
              <h1>Нашей Алисе скоро будет целый годик!</h1>
              {name}
              <LogoutButton
                onClick={() => {
                  this.logout();
                }}
              >
                Выйти
              </LogoutButton>
            </div>
          </div>
        </Section>
        <DarkSection>
          Мы рады, что Вы приняли приглашение на первый День рождение Алисы!
          <br />
          Празднование состоится 3 ноября в 17:00
          <br /> в игровом центре «Журавлик» по адресу: ул. Лазаренко 73б (ТЦ
          Армада 2й этаж). <br />
          <a target="_blank" href="https://yandex.by/maps/-/CBqTYMEapC">
            Это примерно тут
          </a>
        </DarkSection>
        <Section>
          Тема праздника – <u>Вечеринка у Мини Маус</u>. Сочетания цветов
          черный+ розовый или черный+ красный в одежде приветствуются. Для того,
          чтобы облегчить Вам задачу с выбором подарка мы составили список
          актуальных идей. Мы старались подбирать идеи из разных ценовых
          категорий и разных магазинов. Выбранный Вами подарок может не быть
          один в один как на картинке и куплен именно в этом магазине, на
          который указывает ссылка, его вообще может не быть в предложенном
          списке, это лишь полезные идеи для подарков.{" "}
        </Section>
        {this.state.presents.map((p, index) => (
          <Section
            key={p.id}
            color={index % 2 == 0 ? "rgb(252, 206, 210, 0.95)" : ""}
          >
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
      </div>
    );
  }
}

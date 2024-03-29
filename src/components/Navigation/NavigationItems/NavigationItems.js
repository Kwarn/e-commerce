import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../../../assets/Q&YLogo.jpg";
import DrawToggle from "../Sidebar/DrawToggle/DrawToggle";
import { withRouter } from "react-router-dom";
import contactIcon from "../../../assets/contactIcon.png";
import LayoutsContext from "../../../Layout/LayoutsContext";
import { AuthStateContext } from "../../../Auth/AuthStateProvider";

const StyledNavItems = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  z-index: 10;
  padding: 0;
  width: 100%;
  max-width: 100%;
  height: ${(props) =>
    props.isMobile
      ? "14vh"
      : props.isTablet
      ? "12vh"
      : props.isDesktop
      ? "10vh"
      : null};
`;

const StyledLogo = styled.img`
  cursor: pointer;
  margin: auto;
  max-height: ${(props) => (props.isDesktop ? "100%" : "80%")};
  ${({ isDesktop }) =>
    isDesktop &&
    `position: absolute;
    left: 20px
  `}
`;

const StyledContactIcon = styled.img`
  cursor: pointer;
  margin-top: ${(props) =>
    props.isMobile ? "5vh" : props.isTablet ? "4vh" : "2vh"};
  margin-right: ${(props) => (props.isDesktop ? "auto" : "5vw")};
  height: ${(props) => (props.isDesktop ? "60%" : "5vh")};
  ${({ isDesktop }) =>
    isDesktop &&
    `position: absolute;
    right: 20px
  `}
`;

const StyledDesktopNavItemsContainer = styled.div`
  background-color: "green";
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledDesktopNavItem = styled.h3`
  cursor: pointer;
  margin: auto;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid #474747;
  }
`;

const StyledLoginNavItemContainer = styled.div`
  display: flex;
  width: 10vw;
  position: relative;
  z-index: 1;
`;

const NavigationItems = ({
  sideDrawToggleFn,
  history,
  toggleLoginCallback,
}) => {
  const layouts = useContext(LayoutsContext);
  const { authState, appSetLogout, appSetLogin, gqlError } =
    useContext(AuthStateContext);
  const { isDesktop } = layouts;

  const drawToggleComponent = <DrawToggle toggleFn={sideDrawToggleFn} />;
  const logoComponent = (
    <StyledLogo
      isDesktop={isDesktop}
      src={logo}
      alt="Twelve Oak"
      onClick={() => history.push("/home")}
    />
  );

  const contactIconComponent = (
    <StyledContactIcon
      {...layouts}
      onClick={() => history.push("/contact")}
      src={contactIcon}
      alt="contact"
    />
  );

  const desktopNavItemsContent = [
    { title: "OUR PRODUCTS", link: "/products" },
    { title: "SUPPORT", link: "/support" },
    { title: "ABOUT US", link: "/about" },
    { title: "CONTACT", link: "/contact" },
  ];

  const DesktopNavItems = desktopNavItemsContent.map((content) => (
    <StyledDesktopNavItem
      key={content.title}
      onClick={
        content.link
          ? () => history.push(`${content.link}`)
          : () => content.cb()
      }
    >
      {content.title}
      {content.component ? content.component : null}
    </StyledDesktopNavItem>
  ));

  // LoginNavItem is included seperately from DesktopNavItems
  // this is to allow correct absolute positioning of the login drop down draw
  // relative to this element and not the whole DesktopNavItems element.

  const Login = (
    <StyledLoginNavItemContainer>
      <StyledDesktopNavItem onClick={() => toggleLoginCallback()}>
        LOGIN
      </StyledDesktopNavItem>
    </StyledLoginNavItemContainer>
  );
  const Logout = (
    <StyledLoginNavItemContainer>
      <StyledDesktopNavItem onClick={() => appSetLogout()}>
        LOGOUT
      </StyledDesktopNavItem>
    </StyledLoginNavItemContainer>
  );

  return (
    <StyledNavItems {...layouts} className={isDesktop ? "isDesktop" : ""}>
      {isDesktop ? null : drawToggleComponent}
      {isDesktop ? (
        <StyledDesktopNavItemsContainer>
          {DesktopNavItems}
        </StyledDesktopNavItemsContainer>
      ) : null}
      {isDesktop ? null : logoComponent}
      {isDesktop ? null : contactIconComponent}
      {authState.userId ? Logout : Login}
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);

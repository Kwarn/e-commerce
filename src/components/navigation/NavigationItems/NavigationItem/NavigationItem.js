import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled.li`
  display: flex;
  border-bottom: 4px solid transparent;
  .navLink {
    color: #474747;
    margin: auto;
    text-decoration: none;
    padding: 7vh 0 7.5vh 0;
  }
  &:hover {
    border-bottom: 4px solid #474747;
  }
`;

const navItem = ({ link, children }) => (
  <StyledNavItem>
    <NavLink className="navLink" exact to={link}>
      {children}
    </NavLink>
  </StyledNavItem>
);

export default navItem;

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled.li`
  display: flex;
  height: 80%;
  .navLink {
    color: #474747;
    text-decoration: none;
    height: 100%;
    padding: 16px 10px 16px 10px;
    border-bottom: ${props =>
      props.active ? '4px solid #f59f93' : '4px solid transparent'};
  }
  &:hover {
    border-bottom: 4px solid #f59f93;
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

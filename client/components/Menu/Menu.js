import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        Personas
      </a>
      <a className="secondary" href="/chat/ain" tabIndex={tabIndex}>
        AI Network
      </a>
      <a className="secondary" href="/chat/elon" tabIndex={tabIndex}>
        Elon Musk
      </a>
      <a href="/build" tabIndex={tabIndex}>
        Build
      </a>
      <a href="/about" tabIndex={tabIndex}>
        About
      </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;

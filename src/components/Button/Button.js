import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const displayName = 'ButtonContainer';
const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};
const defaultProps = {
  variant: 'primary',
};

const ButtonContainer = ({ label, onClick, variant }) => {
  const variantClassName = variant ? `button--${variant}` : '';
  const className = `button ${variantClassName}`;

  return <button type="button" className={className} onClick={onClick}>{label}</button>;
};

ButtonContainer.displayName = displayName;
ButtonContainer.propTypes = propTypes;
ButtonContainer.defaultProps = defaultProps;


export default ButtonContainer;

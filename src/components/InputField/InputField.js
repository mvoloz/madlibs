import React from 'react';
import PropTypes from 'prop-types';

import './inputField.scss';

const displayName = 'InputField';
const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fieldValue: PropTypes.string,
  updateAnswer: PropTypes.func.isRequired,
};

const defaultProps = {
  fieldValue: '',
};
const InputField = ({
  id, label, fieldValue, updateAnswer,
}) => (
  <div className="inputField">
    <label className="inputField__label" htmlFor={id}>{label}</label>
    <input
      id={id}
      className="inputField__input"
      onBlur={updateAnswer}
      defaultValue={fieldValue}
    />
  </div>
);

InputField.displayName = displayName;
InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;

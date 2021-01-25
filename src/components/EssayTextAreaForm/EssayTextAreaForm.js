import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import './essayForm.scss';

const displayName = 'EssayTextAreaForm';
const propTypes = {
  essayFromStore: PropTypes.string.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const baseClass = 'essayTextArea';

const EssayTextAreaForm = ({ essayFromStore, resetForm, updateAnswer }) => (
  <div className={`${baseClass}`}>
    <div className={`${baseClass}__elements`}>
      <h2>Your essay text</h2>
      <textarea key="essay-textarea" defaultValue={essayFromStore} onBlur={updateAnswer} />

      <Button key="essay-button" onClick={resetForm} variant="success" label="Start Over" />
    </div>

  </div>


);

EssayTextAreaForm.displayName = displayName;
EssayTextAreaForm.propTypes = propTypes;

export default EssayTextAreaForm;

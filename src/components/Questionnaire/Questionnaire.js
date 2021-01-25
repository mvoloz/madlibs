import React from 'react';
import InputField from '../InputField';

import { FIELD_NAMES } from '../../constants';

import './questionnaire.scss';

const displayName = 'Questionnaire';

const Questionnaire = () => (
  <div className="questionnaire">
    <h2>About Me</h2>
    {Object.keys(FIELD_NAMES).map((field) => (
      <InputField key={field} id={field} />
    ))}
  </div>
);

Questionnaire.displayName = displayName;

export default Questionnaire;

import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import './essay.scss';

const displayName = 'Essay';
const propTypes = {
  textBody: PropTypes.string.isRequired,
};

const Essay = ({ textBody }) => (
  <>
    <h2>Your essay text</h2>
    <div className="essay__textBody">
      {parse(textBody)}
    </div>
  </>
);

Essay.displayName = displayName;
Essay.propTypes = propTypes;

export default Essay;

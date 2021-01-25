import React from 'react';
import PropTypes from 'prop-types';
import EssayContainer from '../Essay';
import QuestionnaireContainer from '../Questionnaire';
import EssayTextAreaForm from '../EssayTextAreaForm';
import { noOp } from '../../helpers';

import './App.scss';


const displayName = 'App';
const propTypes = {
  showEssayEditForm: PropTypes.bool,
  setShowEssayEditForm: PropTypes.func,
};

const defaultProps = {
  showEssayEditForm: false,
  setShowEssayEditForm: noOp,
};

const App = ({ showEssayEditForm, setShowEssayEditForm }) => (
  <div className="match-area">
    {showEssayEditForm ? <EssayTextAreaForm setShowEssayForm={setShowEssayEditForm} />
      : (
        <>
          <QuestionnaireContainer />
          <EssayContainer setShowEssayEditForm={setShowEssayEditForm} />
        </>
      )}
  </div>
);

App.displayName = displayName;
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

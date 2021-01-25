import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { resetFields, submitEssayText } from '../../madlibs';
import { getCustomEssay, getEssayTextFromStore } from '../InputField/selectors';
import EssayTextAreaForm from './EssayTextAreaForm';
import { isNewTextDifferent } from './utils';

const displayName = 'EssayTextAreaFormContainer';
const propTypes = {
  setShowEssayForm: PropTypes.func.isRequired,
};

const EssayTextAreaFormContainer = ({ setShowEssayForm }) => {
  const dispatch = useDispatch();

  const essayFromStore = useSelector((state) => getEssayTextFromStore(state));
  const isCustomEssay = useSelector((state) => getCustomEssay(state));

  /**
   * its a bit of a hack to get around the race condition
   * between textarea `onBlur` and reset form `onClick` events
   */
  const debouncedHideTextArea = useCallback(() => {
    setShowEssayForm(false);
  }, [setShowEssayForm]);

  const updateAnswer = useCallback((evt) => {
    const newText = evt.target.value;
    const customEssay = isCustomEssay ? true : isNewTextDifferent(newText, essayFromStore);

    dispatch(submitEssayText({ essayText: newText, customEssay }));
    debounce(debouncedHideTextArea, 100);
  }, [debouncedHideTextArea, dispatch, essayFromStore, isCustomEssay]);

  const resetForm = useCallback(() => {
    dispatch(resetFields());
    setShowEssayForm(false);
  }, [dispatch, setShowEssayForm]);

  return (
    <EssayTextAreaForm
      updateAnswer={updateAnswer}
      essayFromStore={essayFromStore}
      resetForm={resetForm}
    />
  );
};

EssayTextAreaFormContainer.displayName = displayName;
EssayTextAreaFormContainer.propTypes = propTypes;

export default EssayTextAreaFormContainer;

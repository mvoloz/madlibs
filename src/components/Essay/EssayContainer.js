import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Essay from './Essay';
import Button from '../Button';

import { canShowRegenButton, getAllFieldsFilledOut, getEssayText } from '../InputField/selectors';
import { noOp } from '../../helpers';
import { regenerateEssay } from '../../madlibs';

const displayName = 'EssayContainer';
const baseClass = 'essay';

const EssayContainer = ({ setShowEssayEditForm }) => {
  const dispatch = useDispatch();

  const essayText = useSelector((state) => getEssayText(state));
  const allFieldsFilledOut = useSelector((state) => getAllFieldsFilledOut(state));
  const showRegenEssay = useSelector((state) => canShowRegenButton(state));

  const handleEdit = useCallback(() => {
    setShowEssayEditForm(true);
  }, [setShowEssayEditForm]);

  const handleRgenEssay = useCallback(() => {
    dispatch(regenerateEssay());
  }, [dispatch]);

  return (
    <div className={baseClass}>
      <Essay textBody={essayText} />
      <div className={`${baseClass}__actions`}>
        {allFieldsFilledOut ? <Button variant="success" onClick={handleEdit} label="Edit" /> : null }
        {showRegenEssay ? <Button variant="primary" onClick={handleRgenEssay} label="Generate Essay" /> : null}
      </div>
    </div>
  );
};


EssayContainer.displayName = displayName;
EssayContainer.propTypes = {
  setShowEssayEditForm: PropTypes.func,
};

EssayContainer.defaultProps = {
  setShowEssayEditForm: noOp,
};
export default EssayContainer;

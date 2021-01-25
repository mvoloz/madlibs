import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import InputField from './InputField';

import { removeField, submitField } from '../../madlibs';
import { getRandomResponse } from '../../helpers';
import { COPY } from '../../constants';

import { getFieldValue } from './selectors';

import './inputField.scss';

const displayName = 'InputField';
const propTypes = {
  id: PropTypes.string.isRequired,
};

const InputFieldContainer = ({ id }) => {
  const dispatch = useDispatch();
  const fieldValueFromStore = useSelector((state) => getFieldValue(state, { id }));

  const updateAnswer = useCallback((evt) => {
    const fieldValue = evt.target.value;
    /**
     * this logic is a bit uglier than i would have liked, but it works.
     *
     */
    if ((fieldValue === fieldValueFromStore) || (fieldValue === '' && !fieldValueFromStore)) {
      return;
    }

    /**
     * ordinarily i'd handle this type of transformation logic
     * in a side effect, given that this particular app is fairly
     * small and straight forward, i didn't bring in sagas.
     */

    if (fieldValue === '') {
      dispatch(removeField({ id }));
      return;
    }

    const answer = fieldValue.trim();
    const randomizedResponse = getRandomResponse(id, answer);

    dispatch(submitField({ id, answer: randomizedResponse }));
  }, [dispatch, fieldValueFromStore, id]);

  return (
    <InputField
      id={id}
      label={COPY[id]}
      updateAnswer={updateAnswer}
      fieldValue={fieldValueFromStore}
    />
  );
};

InputFieldContainer.displayName = displayName;
InputFieldContainer.propTypes = propTypes;

export default InputFieldContainer;

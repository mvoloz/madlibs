import { createSelector } from 'reselect';
import { FEATURE_NO_ESSAY_REGEN } from '../../constants';
import { getEssayTextFromAnswers } from '../../helpers';
import { removeFormatting } from '../EssayTextAreaForm/utils';
import getIdFromProps from './utils';

export const getEssayText = (state) => state.essayText;

export const getCustomEssay = (state) => state.customEssay;
const getFieldOrder = (state) => state.fieldOrder;
const getFieldAnswers = (state) => state.fieldAnswers;

export const getAllFieldsFilledOut = createSelector(
  [getFieldOrder,
    getFieldAnswers],
  (fieldOrder, fieldAnswers) => fieldOrder.every((field) => fieldAnswers?.[field]?.originalAnswer),
);

export const getFieldValue = createSelector(
  getFieldAnswers,
  getIdFromProps,
  (fieldAnswers, id) => fieldAnswers[id]?.originalAnswer,
);

export const getEssayTextFromStore = createSelector(
  getFieldOrder,
  getFieldAnswers,
  getCustomEssay,
  getEssayText,
  (fieldOrder, fieldAnswers, customEssay, essayText) => (customEssay ? removeFormatting(essayText) : getEssayTextFromAnswers({ fieldOrder, fieldAnswers, textType: 'madlibAnswer' })),
);

export const canShowRegenButton = createSelector(
  getCustomEssay,
  (customEssay) => FEATURE_NO_ESSAY_REGEN && customEssay,
);

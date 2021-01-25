import { FIELD_NAMES } from './constants';
import { getEssayText, getEssayTextFromAnswers } from './helpers';


// Action types
// ----------------------------------------------------------------------------
export const RESET_FIELDS = 'MADLIBS.RESET_FIELDS';
export const SUBMIT_FIELD = 'MADLIBS.SUBMIT_FIELD';
export const REMOVE_FIELD = 'MADLIBS.REMOVE_FIELD';
export const SUBMIT_ESSAY_TEXT = 'MADLIBS.SUBMIT_ESSAY_TEXT';
export const REGENERATE_ESSAY = 'MADLIBS.REGENERATE_ESSAY';

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: '',
  customEssay: false,
};

// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      const {
        payload: { fieldName, answer },
      } = action;

      const {
        customEssay, essayText, fieldAnswers, fieldOrder,
      } = state;

      const updatedFieldAnswers = {
        ...fieldAnswers,
        [fieldName]: answer,
      };

      /**
       * tried to keep the reducers "pure" by front loading some of the transformations
       * that would typically be handled via side effects, but for this app, i didn't want
       * to bring in sagas just for handling the essay text.
       */

      const updatedEssay = getEssayText({
        fieldOrder, updatedFieldAnswers, customEssay, essayText,
      });

      return {
        ...state,
        fieldAnswers: updatedFieldAnswers,
        essayText: updatedEssay,
      };
    }

    case REMOVE_FIELD: {
      const {
        payload: { fieldName },
      } = action;
      const {
        customEssay, essayText, fieldAnswers, fieldOrder,
      } = state;

      const updatedFieldAnswers = {
        ...fieldAnswers,
        [fieldName]: {},
      };

      const updatedEssay = getEssayText({
        fieldOrder, updatedFieldAnswers, customEssay, essayText,
      });


      return {
        ...state,
        fieldAnswers: updatedFieldAnswers,
        essayText: updatedEssay,
      };
    }

    case SUBMIT_ESSAY_TEXT: {
      const {
        payload: { essayText, customEssay },
      } = action;


      return { ...state, essayText, customEssay };
    }

    case REGENERATE_ESSAY: {
      const {
        fieldOrder, fieldAnswers,
      } = state;

      return {
        ...state,
        customEssay: false,
        essayText: getEssayTextFromAnswers({ fieldOrder, fieldAnswers }),
      };
    }

    case RESET_FIELDS: {
      return { ...INITIAL_STATE };
    }

    default:
      return state;
  }
}

// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, payload: { fieldName: id, answer } };
}

export function removeField({ id }) {
  return { type: REMOVE_FIELD, payload: { fieldName: id } };
}

export function resetFields() {
  return { type: RESET_FIELDS };
}
export function submitEssayText({ essayText, customEssay }) {
  return { type: SUBMIT_ESSAY_TEXT, payload: { essayText, customEssay } };
}

export function regenerateEssay() {
  return { type: REGENERATE_ESSAY };
}

import {
  EMPTY_SPACE, FEATURE_NO_ESSAY_REGEN, FIELD_NAMES,
} from './constants';

export function getTextTemplates(fieldName) {
  switch (fieldName) {
    case FIELD_NAMES.hometown: {
      return [
        'Grew up in $answer.',
        'Hail from $answer.',
        '$answer born and bred.',
        '$answer, born and raised.',
        'Transplant from $answer.',
        '$answer native.',
        'Originally from $answer.',
      ];
    }

    case FIELD_NAMES.favoriteFood: {
      return [
        'Can’t get enough $answer.',
        'Addicted to $answer.',
        'Obsessed with $answer.',
        'Love going out for $answer.',
        'Love eating $answer.',
        'Can’t live without $answer.',
        '$answer please.',
      ];
    }

    case FIELD_NAMES.bar: {
      return [
        '$answer is my old haunt.',
        '$answer is my Cheers.',
        '$answer is my Paddy’s Pub.',
        'You can always catch me at $answer.',
        'Take me to $answer and I’ll marry you right now.',
        '$answer is my spot.',
        '$answer is my home-away-from-home.',
      ];
    }

    case FIELD_NAMES.loveToDo: {
      return [
        'I $answer constantly.',
        'Love to $answer.',
        'Can never $answer enough.',
        'I $answer whenever I get the chance.',
        'In my spare time I $answer.',
      ];
    }

    case FIELD_NAMES.music: {
      return [
        'I just got into $answer.',
        'Been jamming to $answer recently.',
        'I’d kill to see $answer live.',
        'Love listening to $answer.',
        '$answer is my new obsession.',
        '$answer is my new god.',
      ];
    }

    case FIELD_NAMES.messageIf: {
      return [
        'Message if you $answer.',
        'Hit me up if you $answer.',
        'If you $answer, we need to meet.',
        'Send me a message if you $answer.',
        'If you $answer, let’s chat.',
      ];
    }

    default:
      return [];
  }
}

export function getRandomResponse(fieldName, answer) {
  const responses = getTextTemplates(fieldName);
  const item = Math.floor(Math.random() * responses.length);

  return {
    originalAnswer: answer,
    madlibAnswer: responses[item].replace(/\$answer/g, answer),
    madlibAnswerWithHighlight: responses[item].replace(/\$answer/g, `<strong>${answer}</strong>`),
  };
}

export const getEssayTextFromAnswers = ({ fieldOrder, fieldAnswers, textType = 'madlibAnswerWithHighlight' }) => fieldOrder.reduce((acc, curr) => {
  const separator = acc.length > 0 ? EMPTY_SPACE : '';
  const madlibText = fieldAnswers[curr]?.madlibAnswer
    ? `${separator}${fieldAnswers[curr][textType]}`
    : '';


  return acc + madlibText;
}, '');

export const getEssayText = ({
  fieldOrder, updatedFieldAnswers, customEssay, essayText,
}) => (FEATURE_NO_ESSAY_REGEN && customEssay
  ? essayText
  : getEssayTextFromAnswers({ fieldOrder, fieldAnswers: updatedFieldAnswers }));

export const noOp = () => {};

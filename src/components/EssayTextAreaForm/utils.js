export const removeFormatting = (text) => text.replaceAll('<strong>', '').replaceAll('</strong>', '');
export const isNewTextDifferent = (newText, oldText) => newText !== removeFormatting(oldText);

## uncontrolled inputs
I chose uncontrolled due to how i was doing field validation.  I'm only doing minor validation that prevents store updates when field value matches the store or when store is `undefined` and fieldValue is empty.

## impure reducer
Ordinarily I would have opted for a library to handle side effects, (in this case updating the essay text); since this is a small app with only a handful of store updates, i felt it wold be overkill and instead chose to front-load some of the data transformations in the `inputField` component as well as call a function inside the reducer to generate the essay text.

## challenges
some of the logic for showing different elements relied on multiple conditionals and various scenarios which is a bit uglier than i would have liked.  in hindsight, i think some of it could be refactored to make use of react's built in reducers.  

Ran into an issue with a race condition between `onBlur` for the essay text and the `onClick` event.  Unforunately, i have not yet been able to solve it completely, but adding lodash `debounce` fixed the UI where it clears out the form properly.  I still see a redux action being fired for updating the essay first, then it gets cleared out right after.  I'm confident that with a bit more time debugging, i'd be able to solve it.

## additional comments
There was 1 item in the spec that I thought could improve the user experience with some minor modifications that are hidden behind a feature toggle.

When the user writes in their own essay and then removes a field, original spec would overwrite that `essayText` with the randomly generated one, my update keeps it in place and shows a button to generate randomized text.  To enable that feature toggle, set the env variable `REACT_APP_FEATURE_ESSAY_REGEN: true`

If time was not a constraint, would have added the proper accessibility tags along with proper responsive styling, currently only desktop is supported.
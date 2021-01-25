import React, { useState } from 'react';

import App from './App';

const displayName = 'AppContainer';

const AppContainer = () => {
  const [showEssayEditForm, setShowEssayEditForm] = useState(false);

  return <App showEssayEditForm={showEssayEditForm} setShowEssayEditForm={setShowEssayEditForm} />;
};

AppContainer.displayName = displayName;

export default AppContainer;

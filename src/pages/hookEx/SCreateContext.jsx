import React from 'react';
import MyContext from './MyContext';
import SUseContext from './SUseContext';
import SUseContext222 from './SUseContext222';

function SCreateContext() {
  return (
    <MyContext.Provider value="Hello, Context!">
      <SUseContext />
      <SUseContext222 />
    </MyContext.Provider>
  );
}

export default SCreateContext;

import React, { useContext } from 'react';
import MyContext from './MyContext';
import SUseContext333 from './SUseContext333';

function SUseContext222() {
  const value = useContext(MyContext);

  return <div>{value}여기는 222
  <SUseContext333></SUseContext333>
  </div>;
}

export default SUseContext222;

import React, { useContext } from 'react';
import MyContext from './MyContext';

function SUseContext() {
  const value = useContext(MyContext);

  return <div>{value}</div>;
}

export default SUseContext;

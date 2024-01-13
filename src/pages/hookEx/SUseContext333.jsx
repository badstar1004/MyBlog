import React, { useContext } from 'react';
import MyContext from './MyContext';

function SUseContex333() {
  const value = useContext(MyContext);

  return <div>{value}여기는333</div>;
}

export default SUseContex333;

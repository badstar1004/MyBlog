import React, { useState, useCallback, memo } from 'react';

function SUseCallback() {
  const [count, setCount] = useState(0);

  // useCallback을 사용하여 함수를 메모이제이션함
  const incrementCount = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <ChildComponent onIncrement={incrementCount} />
    </div>
  );
}

function ChildComponent({ onIncrement }) {
  console.log('ChildComponent 렌더링');
  return (
    <button onClick={onIncrement}>Increase Count</button>
  );
}

// // memo를 사용하는 컴포넌트에 명시적인 이름을 지정
// const ChildComponent = memo(function ChildComponent({ onIncrement }) {
//   console.log('ChildComponent 렌더링');
//   return <button onClick={onIncrement}>Increase Count</button>;
// });


export default SUseCallback;


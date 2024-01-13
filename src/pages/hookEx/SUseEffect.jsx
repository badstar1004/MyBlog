import React, { useState, useEffect } from 'react';

//counter
function SUseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 부수 효과: 문서 제목 업데이트
    document.title = `You clicked ${count} times`;
    console.log("실행" + count)

  }, [count]); // count가 변경될 때만 실행됨
  

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default SUseEffect;

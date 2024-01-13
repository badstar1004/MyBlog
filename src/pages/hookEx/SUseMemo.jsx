import React, { useState, useMemo } from 'react';

function ComplicatedCalculation(list) {
    console.log('복잡한 계산 수행중...');
    // list가 배열인지 확인하고, 배열이 아니면 빈 배열을 사용
    return Array.isArray(list) ? list.map(item => item * 2) : [];
  }

function SUseMemo() {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [counter, setCounter] = useState(0);

  // 복잡한 계산을 메모이제이션
  const calculatedList = useMemo(() => ComplicatedCalculation(list), [list]);
  // const nonMemocalculatedList = ComplicatedCalculation(list) //메모이제이션 하지 않은 경우

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>클릭 카운터 증가</button>
      <p>버튼 클릭 횟수: {counter}</p>
      <ul>
        {calculatedList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* <ul>
        {nonMemocalculatedList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default SUseMemo;

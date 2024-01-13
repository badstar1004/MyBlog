import React, { useState } from 'react';

//todo
function SUseState() {
  const [todo, setTodo] = useState(''); // 현재 작성 중인 todo
  const [todos, setTodos] = useState([]); // 작성된 todo 목록

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo('');
  };

  return (
    <div>
      <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SUseState;

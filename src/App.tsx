import { SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./redux/todoSlice";
import { RootState } from "./redux/store";
import { MdModeEditOutline,MdClose} from 'react-icons/md';


const Todo = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <main className="bg-white w-[36rem] h-64 px-12 py-4">
      <h1 className="text-center text-3xl pb-2 text-primary font-bold">
        TODOLIST
      </h1>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={text}
          className=" text-primary  text-center w-full px-3 h-12 border-gray border-2"
          onChange={handleInputChange}
        />{" "}
        <button
          onClick={handleAddTodo}
          className="px-6 h-12 bg-primary font-bold text-xl text-white"
        >
          {" "}
          +{" "}
        </button>{" "}
      </div>
      <ul className="py-4">
        {" "}
        {todos.map((todo,i) => (
          <li
            key={todo.id}
            
          >
            <button
              onClick={() => handleToggleComplete(todo.id)}
              className={`${i>=1? "border-t-0":"border-t-2"} flex px-4 py-2 border-y-2 border-gray/10 hover:bg-primary/10 w-full items-center justify-between`}
            >
              <div className="flex items-center gap-4 justify-center">
                <input type="checkbox" className="p-5" checked={todo.completed} />
                <p style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }} className="text-primary text-base">{todo.text}</p>
              </div>
              <div className="flex items-center gap-6 justify-center">
                <button>
                  <MdModeEditOutline className="text-primary text-2xl"/></button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                 <MdClose  className="text-primary text-2xl"/>
                </button>
              </div>
            </button>
          </li>
        ))}{" "}
      </ul>{" "}
    </main>
  );
};

export default Todo;


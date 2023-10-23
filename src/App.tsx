import { SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  editTodo,
  toggleComplete,
  deleteTodo,
  removedChecked,
} from "./redux/todoSlice";
import { RootState } from "./redux/store";
import { MdModeEditOutline, MdClose } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import ProgressBar from "./components/Progressbar";

const Todo = () => {
  const [text, setText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(0);
  const todos = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  console.log(todos);
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

  const handleEditChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditedText(event.target.value);
  };
  const handleUpdatedTodo = () => {
    dispatch(editTodo({ editedText, editItemId }));
  };
  const handleBlur = () => {
    setIsEditing(false);
  };
  const handleEditTodo = (id: number) => {
    const seletedItem = todos.find((item) => item.id === id)!;
    setEditItemId(seletedItem.id);
    setIsEditing(true);
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleClearedCheckedTodo = () => {
    dispatch(removedChecked(true));
  };
  const tasksDone = todos.reduce((counter, obj) => {
    if (obj.completed === true) counter += 1;
    return counter;
  }, 0);

  return (
    <main className="bg-white w-[36rem] h-auto px-12 py-4">
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
        {todos.map((todo, i) => (
          <li key={todo.id}>
            <div
              onClick={() => handleToggleComplete(todo.id)}
              className={`${
                i >= 1 ? "border-t-0" : "border-t-2"
              } flex px-4 py-2 border-y-2 border-gray/10 hover:bg-primary/10 w-full items-center justify-between`}
            >
              <div className="flex items-center gap-4 justify-center">
                <input
                  type="checkbox"
                  className="p-5"
                  checked={todo.completed}
                  readOnly
                />
                <p
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  className="text-primary text-base"
                >
                  {isEditing && editItemId === todo.id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={handleEditChange}
                      onBlur={handleBlur}
                    />
                  ) : (
                    <span>{todo.text}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-6 justify-center">
                {isEditing ? (
                  <button>
                    <TiTickOutline
                      onClick={() => handleUpdatedTodo()}
                      className="text-primary text-2xl"
                    />
                  </button>
                ) : (
                  <button>
                    <MdModeEditOutline
                      onClick={() => handleEditTodo(todo.id)}
                      className="text-primary text-2xl"
                    />
                  </button>
                )}
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  <MdClose className="text-primary text-2xl" />
                </button>
              </div>
            </div>
          </li>
        ))}{" "}
      </ul>{" "}
      <div className="flex items-center gap-5 my-4 justify-between">
        <ProgressBar todoslength={todos.length} completed={tasksDone} />

        <button
          onClick={() => handleClearedCheckedTodo()}
          className="bg-primary justify-center flex items-center py-1 w-full text-base text-white"
        >
          Removed checked <MdClose className="text-white text-xl" />
        </button>
      </div>
    </main>
  );
};

export default Todo;

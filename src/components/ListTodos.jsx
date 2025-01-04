import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { databases, ID } from "../appwrite";

const ListTodos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_TODOS
    );

    console.log(response);
    setTodos(response.documents);
  };

  const addTodo = async () => {
    const response = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_TODOS,
      ID.unique(),
      {
        title: newTodo,
      }
    );

    console.log(response);
    setNewTodo("");
    setTodos((prevState) => [...prevState, response]);
  };

  const deleteTodo = async (id) => {
    const response = await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_TODOS,
      id
    );

    console.log(response);
    setTodos((prevState) => prevState.filter((i) => i.$id !== id));
  };

  const markAsCompleted = async (id) => {
    console.log("id", id);
    const response = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_TODOS,
      id,
      {
        completed: true,
      }
    );

    console.log(response);
    setTodos(
      todos.map((todo) => (todo.id == id ? { ...todo, completed: true } : todo))
    );

    console.log(todos);
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-5">
        <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
          Todo React App
        </h1>
        <div className="mb-5 mt-5">
          <div className="flex">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              placeholder="Add todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2"
              onClick={addTodo}
            >
              <FaPlus /> Add
            </button>
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {todos &&
              todos.map((todo) => (
                <li key={todo.$id} className="flex items-center">
                  <svg
                    className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                      todo.completed
                        ? "text-green-500 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {todo.title}
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-2"
                    onClick={(e) => deleteTodo(todo.$id)}
                  >
                    <BsFillTrashFill /> Delete
                  </button>
                  {!todo.completed && (
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={(e) => markAsCompleted(todo.$id)}
                    >
                      <BsCheck2Circle />
                      Mark as Completed
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListTodos;

import { useState } from "react";

export default function TodoList() {
  type ListItem = {
    name: string;
    id: number;
    isChecked: boolean;
  };

  const [items, setItem] = useState<ListItem[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [isCompleted, setCompleted] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (todoName) setTodoName("");
  };

  const add = () => {
    if (todoName !== "") {
      setItem([
        ...items,
        { name: todoName, id: items.length + 1, isChecked: false },
      ]);
    }
  };

  const handleDelete = (id: number) => {
    console.log(id);
    setItem((prev) =>
      prev.filter((_item, index) => {
        return index !== id;
      })
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          onChange={(e) => {
            console.log(e.target.value);
            setTodoName(e.target.value);
          }}
          type="text"
          name="add"
          id="addTodo"
          placeholder="Add Item"
        />
        <button onClick={() => add()} type="submit">
          Add
        </button>
      </form>
      <div>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.length !== 0
            ? items.map((item, index) => {
                return (
                  <li
                    style={{
                      textDecoration: isCompleted ? "line-through" : "none",
                    }}
                    key={index}>
                    <input
                      onChange={() => setCompleted(true)}
                      aria-label="check"
                      type="checkbox"
                    />
                    {item.name}
                    <span style={{ paddingLeft: "20px" }}>
                      <button onClick={() => handleDelete(index)} type="button">
                        Delete
                      </button>
                    </span>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </>
  );
}

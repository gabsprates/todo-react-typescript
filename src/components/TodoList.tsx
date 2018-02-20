import * as React from "react";

export type ItemType = {
  id: number,
  text: string
};

type PropsType = {
  items: Array<ItemType>
};

const TodoList = (props: PropsType) => (
  <ul>
    {props.items.map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
);

export default TodoList;

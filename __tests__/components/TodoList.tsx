import * as React from "react";
import { render } from "enzyme";

import TodoList, { ItemType } from "../../src/components/TodoList";

const mock: Array<ItemType> = [
  { id: 0, text: "Assistir Tarzan" },
  { id: 1, text: "Assistir Toy Story" },
  { id: 2, text: "Assistir O Rei Leão" },
];

describe("Testando <TodoList />", () => {

  it("deve renderizar uma <ul> com 1 item", () => {
    const movie = mock.slice(0, 1);
    const wrapper = render(<TodoList items={movie} />);
    const li = wrapper.find("ul > li");
    expect(li.length).toEqual(1);
    expect(li.eq(0).text()).toBe(movie[0].text);
  });

  it("deve renderizar uma <ul> com 3 itens", () => {
    const wrapper = render(<TodoList items={mock} />);
    const li = wrapper.find("ul > li");
    expect(li.length).toEqual(3);

    mock.forEach((item, index) => {
      expect(li.eq(index).text()).toBe(item.text);
    });
  });

});

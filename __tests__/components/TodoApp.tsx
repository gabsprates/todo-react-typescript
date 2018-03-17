import * as React from "react";
import { render, shallow } from "enzyme";

import TodoApp from "../../src/components/TodoApp";

describe("Testando <TodoApp />", () => {
  it("deve renderizar o componente", () => {
    const wrapper = render(<TodoApp />);
    expect(wrapper.length).toEqual(1);
  });

  describe("tentando handlers", () => {
    it("deve chamar handleChange e alterar state.text quando mudar o valor do input", () => {
      const handle = jest.spyOn(TodoApp.prototype, "handleChange");
      const wrapper = shallow(<TodoApp />);
      const input = wrapper.find("form input");
      expect(wrapper.state("text")).toBe("");
      input.simulate("change", { target: { value: "Assistir Star Wars" } });
      expect(handle).toHaveBeenCalled();
      expect(wrapper.state("text")).toBe("Assistir Star Wars");
    });

    it("deve chamar handleSubmit e atualzar state.items quando submeter o form", () => {
      const handle = jest.spyOn(TodoApp.prototype, "handleSubmit");
      const wrapper = shallow(<TodoApp />);
      const instance = wrapper.instance() as TodoApp;
      const form = wrapper.find("form");
      instance.setState({ text: "Assistir Star Wars" });
      expect(wrapper.state("items").length).toEqual(0);
      form.simulate("submit", { preventDefault: () => { } });
      expect(handle).toHaveBeenCalled();
      expect(wrapper.state("items").length).toEqual(1);
      expect(wrapper.state("items")[0].text).toBe("Assistir Star Wars");
    });

    it("deve chamar handleReset e atualizar o state quando clicar no botão reset", () => {
      const handle = jest.spyOn(TodoApp.prototype, "handleReset");
      const wrapper = shallow(<TodoApp />);
      const instance = wrapper.instance() as TodoApp;
      const button = wrapper.find("form button[type='button']");
      instance.setState({ text: "Assistir The Clone Wars" });
      instance.setState({ items: [{ id: 0, text: "Assistir Rogue One" }] });
      expect(wrapper.state("text")).toBe("Assistir The Clone Wars");
      expect(wrapper.state("items").length).toEqual(1);
      button.simulate("click");
      expect(handle).toHaveBeenCalled();
      expect(wrapper.state("text")).toBe("");
      expect(wrapper.state("items").length).toEqual(0);
    });
  });
});

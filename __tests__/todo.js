/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const current = new Date();
    const alternative = 86400000;
    [
      {
        title: "kavya1",
        completed: false,
        dueDate: new Date(current.getTime()-alternative).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "kavya2",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "kavya3",
        completed: false,
        dueDate: new Date(current.getTime()+ alternative).toLocaleDateString("en-CA"),
      },
    ].forEach(add);
  });
  test("new todo", () => {
    expect(all.length).toEqual(3);
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("completed", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("overdue-retrieval checking", () => {
    expect(overdue().length).toEqual(1);
  });

  test("today due-retrieval checking", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("laters due- retrieval checking", () => {
    expect(dueLater().length).toEqual(1);
  });
});
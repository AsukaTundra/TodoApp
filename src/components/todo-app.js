import Header from "./header";
import Main from "./main";

const TodoApp = ({ todos }) => {
  return (
    <section className="todoapp">
      <Header />
      <Main todos={ todos }/>
    </section>
  );
};

export default TodoApp;
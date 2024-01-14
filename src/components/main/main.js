import TaskList from "../task-list";
import Footer from "../footer";

const Main = ({ todos }) => {
  return (
    <section className="main">
      <TaskList todos={ todos }/>
      <Footer />
    </section>
  );
};

export default Main;
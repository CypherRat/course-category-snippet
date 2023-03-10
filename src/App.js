import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { setCourse } from "./redux/actions";
import CourseCategories from "./components/CourseCategories";
import { useState } from "react";

function App() {
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [activeCourse, setActiveCourse] = useState();

  const courseArray = [
    "Public Speaking",
    "Stop Motion Animation",
    "Western Vocals",
  ];

  const updateCourse = (index) => {
    dispatch(setCourse(index));
    setActiveCourse(index);
  };
  return (
    <main className="home">
      <h1>Courses</h1>
      <div className="courses">
        {courseArray.map((course, index) => {
          return (
            <div
              className={`course ${activeCourse === index && "active"}`}
              onClick={() => updateCourse(index)}
              key={index}
            >
              {course}
            </div>
          );
        })}
      </div>
      <section className="categories">
        {course === null && <h2>Select a course</h2>}
        {course !== null && <CourseCategories categoryIndex={activeCourse} />}
      </section>
    </main>
  );
}

export default App;

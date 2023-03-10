import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../redux/actions";
import { responseJson } from "../response";
import "./course.scss";
import { useEffect } from "react";

export default function CourseCategories({ categoryIndex }) {
  const dispatch = useDispatch();
  const courseCategories = useSelector((state) => state.group);
  const courses = responseJson[0][categoryIndex];
  const [category, setCategory] = useState(0);
  const groupArray = courses.reduce(
    (groups, item) => ({
      ...groups,
      [item.min_age]: [...(groups[item.min_age] || []), item],
    }),
    {}
  );
  const setActiveCategory = (index, category) => {
    setCategory(index);
    dispatch(setGroup(category));
  };
  useEffect(() => {
    setCategory(0);
    const newGroupArray = courses.reduce(
      (groups, item) => ({
        ...groups,
        [item.min_age]: [...(groups[item.min_age] || []), item],
      }),
      {}
    );
    const colorArray = [
      { dark: "#3EBEFF", light: "#EDFCFF" },
      { dark: "#905CFF", light: "#DCCCFF" },
      { dark: "#F9B215", light: "#FFEDC8" },
    ];
    const box = document.getElementById("boxWrap");
    box.style.setProperty("--dark", colorArray[categoryIndex].dark);
    box.style.setProperty("--light", colorArray[categoryIndex].light);
    const defaultG = Object.values(newGroupArray)[0];
    dispatch(setGroup(defaultG));
  }, [dispatch, courses, categoryIndex]);

  return (
    <div className="categories">
      <div className="categories-selectors">
        {Object.keys(groupArray).length > 0 &&
          Object.entries(groupArray).map((group, index) => {
            const newCategory = group[1];
            return (
              <div
                className={`categories-selectors-label${
                  category === index ? " active" : ""
                }`}
                key={index}
                onClick={() => setActiveCategory(index, newCategory)}
              >
                {Object.values(group)[1].length <= 2 && (
                  <div className="categories-selectors-label-top">
                    {index === 0 ? "Junior" : "Senior"}
                  </div>
                )}
                <span>
                  <small>
                    Age ({group[1][0].min_age}-{group[1][0].max_age})
                  </small>
                </span>
              </div>
            );
          })}
      </div>
      <div className="categories-data" id="boxWrap">
        {courseCategories.length === 0 && <span>Select a category</span>}
        {courseCategories.length > 0 &&
          courseCategories.map((category, index) => {
            const [r_exact, r_approx, r_count] = category.rating.split(";");
            return (
              <div className="box" key={index}>
                <div className="box-main">
                  <div className="box-main-sessions">
                    <div className="box-main-sessions-label">
                      {category.num_classes} sessions
                    </div>
                    <div className="box-main-sessions-discount">
                      {Math.round(
                        ((category.original_price - category.discounted_price) /
                          category.original_price) *
                          100
                      )}
                      % off
                    </div>
                  </div>
                  <div className="box-main-title">{category.display_name}</div>
                  <div className="box-main-review">
                    {r_exact}/{r_approx} ⭐ ({r_count} reviews)
                  </div>
                </div>
                <div className="box-content">
                  <div className="box-content-pitch">{category.pitch}</div>
                  <div className="box-content-pointers">
                    <div className="box-content-pointers-title">
                      Students will achieve:
                    </div>
                    <div className="box-content-pointers-list">
                      <ul>
                        {category.curriculum_outcomes.map((outcome, index) => {
                          return <li key={index}>{outcome}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="box-content-action">
                    View Detailed Lesson Plan
                  </div>
                  <div className="box-content-price">
                    <div className="box-content-price-num">
                      <div className="box-content-price-num-after">
                        &#8377; {category.discounted_price}
                      </div>
                      <div className="box-content-price-num-before">
                        &#8377; {category.original_price}
                      </div>
                    </div>
                    <div className="box-content-price-class">
                      <span>
                        &#8377;{" "}
                        {Math.round(
                          parseFloat(
                            category.discounted_price / category.num_classes
                          ).toFixed(2)
                        )}
                      </span>{" "}
                      per class
                    </div>
                  </div>
                  <div className="box-content-note">
                    We'll schedule the slots as per your convenience.
                  </div>
                </div>
                <div className="box-cta">
                  <div className="box-cta-lookup">
                    <div className="box-cta-lookup-activities">
                      {category.num_classes +
                        parseInt(category.games_count) +
                        category.certificate_count}
                      {"+ "}
                      Activities
                    </div>
                    <div className="box-cta-lookup-games">
                      {category.games_count} games
                    </div>
                    <div className="box-cta-lookup-certificate">
                      {category.certificate_count} certificate
                    </div>
                  </div>
                  <div className="box-cta-button">
                    <button className="box-cta-button-buy">Buy Course</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

import React from "react";
import style from "./form.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addRecipe, getDietTypes } from "../../store/actions";

// Validación de errores
function validate(input) {
  const error = {};
  if (!input.name) error.name = "Your recipe need a name";
  if (!input.summary)
    error.summary = "Your recipe needs a summary of what it is about";
  if (input.score < 1 || input.score > 100)
    error.score = "The score must be between 1 and 100";
  if (input.healthScore < 1 || input.healthScore > 100)
    error.healthScore = "The health score must be between 1 and 100";
  if (!input.steps.length)
    error.steps = "Add a few steps so we can know how to cook it";
  if (!input.diets.length)
    error.diets = "Please, select at leat one type";
  return error;
}

function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.dietTypes);
  const history = useHistory();
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    score: 0,
    healthScore: 0,
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const validation = validate(newInput);
      setError(validation);
      return newInput;
    });
  }

  function handleCheckBox(e) {
    let arr = input.diets;
    let find = arr.indexOf(e.target.value);

    if (find >= 0) {
      arr.splice(find, 1);
    } else {
      arr.push(e.target.value);
    }

    setInput({
      ...input,
      diets: arr,
    });
    const validation = validate(input);
    setError(validation);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(error).length > 0) {
      alert("Please complete the information required");
    } else if (
      input.name === "" &&
      input.summary === "" &&
      input.score === "" &&
      input.healthScore === "" &&
      input.steps === "" &&
      !input.diets.length
    ) {
      alert("Please complete the form");
    } else if(
      input.name.length > 10 || input.name.length < 3
    ) {
      alert("The length of the field name must be between 3 and 255")
    } else {
      console.log(input.diets)
      dispatch(addRecipe(input));
      alert("You create a new recipe!");
      setInput({
        name: "",
        summary: "",
        score: 0,
        healthScore: 0,
        steps: "",
        diets: [],
      });
      history.push("/home");
    }
  }


  return (
    <div className={style.content}>
      <div className={style.title}>
        <h1>Create a recipe ✍️</h1>
        <Link to="/home">
          <button className={style.backButton}>Home</button>
        </Link>
      </div>
      <div className={style.section}>
        <div className={style.aside}></div>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.inputdiv}>
            <label className={style.label}>Name:</label>
            <input
              type="text"
              className={style.input}
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {error.name && <span className={style.error}>{error.name}</span>}
          </div>

          <div className={style.inputdiv}>
            <label className={style.label}>Summary:</label>
            <textarea
              type="text"
              className={style.textarea}
              name="summary"
              rows="3"
              cols="30"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />
            {error.summary && (
              <span className={style.error}>{error.summary}</span>
            )}
          </div>
          <div className={style.row}>
            <div className={style.inputdiv}>
              <label className={style.label}>Score:</label>
              <input
                type="number"
                className={style.input}
                name="score"
                value={input.score}
                onChange={(e) => handleChange(e)}
              />
              {error.score && (
                <span className={style.error}>{error.score}</span>
              )}
            </div>

            <div className={style.inputdiv}>
              <label className={style.label}>Health Score:</label>
              <input
                type="number"
                className={style.input}
                name="healthScore"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              {error.healthScore && (
                <span className={style.error}>{error.healthScore}</span>
              )}
            </div>
          </div>

          <div className={style.inputdiv}>
            <label className={style.label}>Steps:</label>
            <textarea
              type="number"
              className={style.input}
              name="steps"
              rows="3"
              cols="30"
              value={input.steps}
              onChange={(e) => handleChange(e)}
            />
            {error.steps && <span className={style.error}>{error.steps}</span>}
          </div>

          <div className={style.checkBox}>
            <label className={style.label}>Diet Types:</label>
            {diets.map((d) => {
              return (
                <div key={d} className={style.checkBoxCont}>
                  <input
                    type="checkbox"
                    name={d}
                    value={d}
                    onChange={(e) => handleCheckBox(e)}
                    selected={input.diets.includes(d)}
                  />
                  <label className={style.types}>{d}</label>
                </div>
              );
            })}
            {error.diets && (
              <span className={style.error}>{error.diets}</span>
            )}
          </div>
          
            {((input.name !== '') && (Object.values(error).length === 0) ? <button type="submit" className={style.createButton}> Create Recipe
          </button> : <p className={style.pError}>Please enter the information required!</p>)}
        </form>
      </div>
    </div>
  );
}

export default Form;

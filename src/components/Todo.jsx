import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

function Todo({ todo, updateTodo, removeTodo, isHighlighted, completeTodo }) {
  const displayMode = "displayMode";
  const editMode = "editMode";

  const [mode, setMode] = useState(displayMode);

  const [newTodoText, setNewTodoText] = useState(todo.text);

  const [checked, setChecked] = useState(!!todo.isCompleted);

  const onEditButtonClick = (e) => {
    e.preventDefault();
    setMode(editMode);
  };

  const onSubmitButtonClick = (e) => {
    e.preventDefault();
    const newTodo = todo;
    newTodo.text = newTodoText;

    updateTodo(todo.id, newTodo);
    setMode(displayMode);
  };

  const useStyles = makeStyles({
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    icon: {
      marginRight: 10,
      borderRadius: 3,
      width: 18,
      height: 18,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "$root.Mui-focusVisible &": {
        outline: "2px auto rgba(112,138,98,54)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    },
    checkedIcon: {
      backgroundColor: "#8AAA79",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 18,
        height: 18,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#708A62",
      },
    },
  });

  const StyledCheckbox = (props) => {
    const classes = useStyles();
    return (
      <Checkbox
        className={classes.root}
        onClick={() => completeTodo(todo.id)}
        onChange={() => setChecked(!checked)}
        checked={checked}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        inputProps={{ "aria-label": "decorative checkbox" }}
        {...props}
      />
    );
  };

  if (mode === displayMode) {
    return (
      <>
        <div className={`todo-item  ${isHighlighted ? "highlightedTodo" : ""}`}>
          <StyledCheckbox />
          <div
            className={`todo-text ${todo.isCompleted && "todo-is-completed"}`}
          >
            {todo.text}
          </div>
          <div className={`icon-edit ${todo.isCompleted ? 'icon-edit-completed' : ''}`}>
            <AiOutlineEdit onClick={onEditButtonClick} />
          </div>
          <div className={`icon-delete ${todo.isCompleted ? 'icon-delete-completed' : ''}`}>
            <AiOutlineCloseCircle onClick={() => removeTodo(todo.id)} />
          </div>
        </div>
      </>
    );
  } else if (mode === editMode) {
    return (
      <>
        <form className="submit-todo-form">
          <input
            type="text"
            placeholder="Update your todo"
            className="submit-todo-input"
            onChange={(event) => setNewTodoText(event.target.value)}
            value={newTodoText}
          />
          <button className="button-submit" onClick={onSubmitButtonClick}>
            <FaCheck />
          </button>
        </form>
      </>
    );
  }
}

export default Todo;

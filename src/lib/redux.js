// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { createStore } from "redux";

// the constants for each action type
export const Types = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
};

// action creators
export const archiveTask = id => ({ type: Types.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: Types.PIN_TASK, id });

// all of the reducers simply change the state of a single task
function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task => (
        task.id === action.id ? { ...task, state: taskState } : task
      )),
    };
  };
}

// reducer to change the contents of the store based on the action type
export const reducer = (state, action) => {
  switch (action.type) {
    case Types.ARCHIVE_TASK:
      return taskStateReducer("ARCHIVE_TASK")(state, action);
    case Types.PIN_TASK:
      return taskStateReducer("PIN_TASK")(state, action);
    default:
      return state;
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export default createStore(reducer, { tasks: defaultTasks });

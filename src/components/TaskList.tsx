import React from 'react';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onClick: (task: Task) => Promise<void>;
}

function TaskList({ tasks = [], onClick }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="flex bg-gray-300 hover:bg-gray-500 p-2">
          <div className="flex-grow mr-4">{`${task.description}`}</div>
          <div className="flex-grow-0 flex flex-col justify-center">
            <div className="flex-grow-0">
              <button
                onClick={() => onClick(task)}
                className="bg-red-400 hover:bg-red-500 text-white font-bold px-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskList;

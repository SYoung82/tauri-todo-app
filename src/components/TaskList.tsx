import React from 'react';

interface TaskListProps {
  tasks: string[];
  onClick: (index: number) => Promise<void>;
}

function TaskList({ tasks = [], onClick }: TaskListProps) {
  return (
    <>
      {tasks.map((task, index) => (
        <div key={index} className="flex bg-gray-300 hover:bg-gray-500 p-2">
          <div className="flex-grow mr-4">{`${task}`}</div>
          <div className="flex-grow-0 flex flex-col justify-center">
            <div className="flex-grow-0">
              <button
                onClick={() => onClick(index)}
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

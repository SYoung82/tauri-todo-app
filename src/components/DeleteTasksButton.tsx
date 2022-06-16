import React from 'react';

interface DeleteTasksButtonProps {
  onClick: (e: React.MouseEvent) => Promise<void>;
}

function DeleteTaskButton({ onClick }: DeleteTasksButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-grow-0 p-2"
    >
      Delete All Tasks
    </button>
  );
}

export default DeleteTaskButton;

import React from 'react';

interface TaskInputProps {
  content?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

function TaskInput({ content, onChange, onKeyDown }: TaskInputProps) {
  return (
    <input
      type="text"
      value={content}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="text-center box-border bg-[#222] text-2xl text-white flex-grow pl-2"
    />
  );
}

export default TaskInput;

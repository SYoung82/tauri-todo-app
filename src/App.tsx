import React, { useEffect, useState } from 'react';
import './App.css';
import { invoke } from '@tauri-apps/api';
import TaskInput from './components/TaskInput';
import DeleteTaskButton from './components/DeleteTasksButton';
import TaskList from './components/TaskList';

export interface Task {
  id: string;
  description: string;
  complete: boolean;
}

function App() {
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => setTasks(await invoke('get_tasks'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await invoke('add_task', { description: description })
        .then(() => setDescription(''))
        .then(() => fetchTasks());
    } else if (e.key === 'Escape') {
      setDescription('');
    }
  };

  const handleDeleteAll = async (e: React.MouseEvent) => {
    await invoke('delete_all_tasks').then(() => fetchTasks());
  };

  const handleDelete = async (task: Task) => {
    await invoke('delete_task_by_id', { id: task.id }).then(() => fetchTasks());
  };

  return (
    <div className="container flex flex-col w-full max-w-[100%]">
      <div className="fixed flex w-full max-w-[100%]">
        <TaskInput
          content={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <DeleteTaskButton onClick={handleDeleteAll} />
      </div>
      <div className="w-full max-w-[100%] mt-10">
        <TaskList tasks={tasks} onClick={handleDelete} />
      </div>
    </div>
  );
}

export default App;

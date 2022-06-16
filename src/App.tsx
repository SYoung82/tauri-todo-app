import React, { useEffect, useState } from 'react';
import './App.css';
import { invoke } from '@tauri-apps/api';
import TaskInput from './components/TaskInput';
import DeleteTaskButton from './components/DeleteTasksButton';
import TaskList from './components/TaskList';

function App() {
  const [content, setContent] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => setTasks(await invoke('get_tasks'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await invoke('add_task', { content })
        .then(() => setContent(''))
        .then(() => fetchTasks());
    } else if (e.key === 'Escape') {
      setContent('');
    }
  };

  const handleDeleteAll = async (e: React.MouseEvent) => {
    await invoke('delete_tasks').then(() => fetchTasks());
  };

  const handleDelete = async (index: number) => {
    await invoke('delete_task_by_index', { index }).then(() => fetchTasks());
  };

  return (
    <div className="container flex flex-col w-full max-w-[100%]">
      <div className="fixed flex w-full max-w-[100%]">
        <TaskInput
          content={content}
          onChange={(e) => setContent(e.target.value)}
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

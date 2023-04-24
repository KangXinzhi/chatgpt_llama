
import { lchown } from 'fs';
import { useState } from 'react';
import less from 'less';
import Chat from './pages/Chat';


function App() {
  const [theme, setTheme] = useState('dark');

  function toggleTheme(theme: string): void {
    less.modifyVars({'@background-color':'blue'}).then(() => {
      setTheme(theme);
      console.log('主题色修改成功');
    });
  }

  return (
    <div>
      <Chat />
    </div>
  )
}

export default App

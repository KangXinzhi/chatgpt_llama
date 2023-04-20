
import { lchown } from 'fs';
import { useState } from 'react';
import styles from './App.module.less'
import less from 'less';
import { theme } from './themes/theme.js'


function App() {
  const [theme, setTheme] = useState('dark');

  function toggleTheme(theme: string): void {
    less.modifyVars({'@background-color':'blue'}).then(() => {
      setTheme(theme);
      console.log('主题色修改成功');
    });
  }

  return (
    <div className={styles.container}>
      <button onClick={() => toggleTheme('dark')}>dark Theme</button>
      <button onClick={() => toggleTheme('light')}>light Theme</button>
    </div>
  )
}

export default App

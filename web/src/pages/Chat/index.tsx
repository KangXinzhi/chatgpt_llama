
import { useState } from 'react';
import styles from './index.module.less'
import LeftMenu from './components/LeftMenu'
import RightChat from './components/RightChat';


function Chat() {
  

  return (
    <div className={styles.container}>
      <LeftMenu/>
      <RightChat/>
    </div>
  )
}

export default Chat

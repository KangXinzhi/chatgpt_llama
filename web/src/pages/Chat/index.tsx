
import { useState } from 'react';
import LeftMenu from './components/LeftMenu'
import RightChat from './components/RightChat';
import AudioModal from './components/AudioModal';
import AiFloatButton from './components/AiFloatButton';

import styles from './index.module.less'
import { ContentProvider } from './components/ContentProvider';

function Chat() {

  return (
    <ContentProvider>
      <div className={styles.container}>
        <LeftMenu />
        <RightChat />
        <AiFloatButton />
        <AudioModal />
      </div>
    </ContentProvider>
  )
}

export default Chat

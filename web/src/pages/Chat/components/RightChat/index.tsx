
import { useState } from 'react';
import RightContext from '../RightContext';
import RightTextInput from '../RightTextInput';
import styles from './index.module.less'


function RightChat() {
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');

  return (
    <div className={styles.container}>
      <RightContext inputMessage={inputMessage} outputMessage={outputMessage}/>
      <RightTextInput setInputMessage={setInputMessage} setOutputMessage={setOutputMessage}/>
    </div>
  )
}

export default RightChat

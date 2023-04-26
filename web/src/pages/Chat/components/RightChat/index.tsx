import RightContext from '../RightContext';
import RightTextInput from '../RightTextInput';
import styles from './index.module.less'


function RightChat() {

  return (
    <div className={styles.container}>
      <RightContext />
      <RightTextInput />
    </div>
  )
}

export default RightChat

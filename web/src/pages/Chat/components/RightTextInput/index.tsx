import { useState } from 'react';
import { FloatButton, Input, Spin, Tooltip } from 'antd'
import { SendOutlined } from '@ant-design/icons';
import styles from './index.module.less'
import { useContent } from '../ContentProvider';

const { TextArea } = Input;

function RightTextInput() {
  const { openModel1, openModel2, msg, setMsg, handleSend } = useContent();

  const isPressed = openModel1 || openModel2



  return (
    <div className={styles.containerOut}>
      <div className={styles.container}>
        <TextArea
          placeholder="Send Message..."
          autoSize={{ minRows: 1 }}
          value={msg}
          onChange={(e) => { setMsg(e.target.value) }}
          bordered={false}
          style={{ width: '700px' }}
        />
      </div>
      <div className={styles.send}>
        {
          isPressed ? (
            <Spin />
          ) : (
            <Tooltip title="发送">
              <SendOutlined onClick={handleSend} />
            </Tooltip>
          )
        }
      </div>
    </div>

  )
}

export default RightTextInput
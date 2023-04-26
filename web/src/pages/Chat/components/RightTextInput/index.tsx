import { useState } from 'react';
import { FloatButton, Input, Spin, Tooltip } from 'antd'
import { SendOutlined } from '@ant-design/icons';
import styles from './index.module.less'
import { useContent } from '../ContentProvider';

const { TextArea } = Input;

function RightTextInput() {
  const { setInputMessage, setOutputMessage, isPressed,msg, setMsg } = useContent();

  const handleSend = () => {
    let temp = msg;
    setInputMessage(JSON.stringify(msg))
    setMsg('')
    // 将api_url替换为你的API接口地址
    const api_url = 'http://127.0.0.1:8000/predict';

    var testData = { prompt: temp };

    // 发送POST请求
    fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })
      .then(response => response.json())
      .then(data => {
        // 处理响应数据
        setOutputMessage(JSON.stringify(data.response.response))
      })
      .catch(error => {
        console.error(error);
      });
  }


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
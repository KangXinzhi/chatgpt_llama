import { useState } from 'react';
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons';
import styles from './index.module.less'

const { TextArea } = Input;

interface IProps {
  setInputMessage: (inputMessage: string) => void;
  setOutputMessage: (outputMessage: string) => void;
}

function RightTextInput(props: IProps) {
  const {setInputMessage, setOutputMessage} = props;

  const [msg, setMsg] = useState('')


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
        />
      </div>
      <SendOutlined onClick={handleSend} className={styles.sendIcon} />
    </div>

  )
}

export default RightTextInput
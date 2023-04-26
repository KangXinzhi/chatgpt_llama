
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './index.module.less'
import { useContent } from '../ContentProvider';


interface IMessage {
  type: 'input' | 'output'
  message: string
}

function RightContext() {
  const { inputMessage, outputMessage } = useContent();

  let [message, setMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    if (inputMessage) {
      let temp: IMessage[] = [...message, { type: 'input', message: inputMessage }]
      setMessage(temp)
    }
  }, [inputMessage])

  useEffect(() => {
    if (outputMessage) {
      let temp: IMessage[] = [...message, { type: 'output', message: outputMessage }]
      setMessage(temp)
    }
  }, [outputMessage])

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {
          message.map((item,key) => {
            return (
              <div 
                className={classnames(styles.chat, { [styles.chatOutput]: item.type === 'output' })} 
                key={`message-${key}`}
              >
                <div className={styles.chatMessage}>
                  <div className={styles.avatar}>
                    {item.type === 'input' ? (
                      <Avatar style={{ backgroundColor: '#f56a00' }}>I</Avatar>
                    ) : (
                      <Avatar style={{ backgroundColor: '#1890ff' }}>O</Avatar>
                    )}
                  </div>
                  <div className={styles.message}>
                    {JSON.parse(item.message).split("\n").filter((item: string) => item !== '').map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RightContext


import { FloatButton, Tooltip } from 'antd';

import { AudioOutlined, QuestionOutlined, RobotOutlined, SoundOutlined  } from '@ant-design/icons';

import { useContent } from '../ContentProvider';

import styles from './index.module.less'


function AiFloatButton() {
  const { handleOpenAudioModal, handleMouseDown, handleMouseUp, handleAudioPlay } = useContent();

  return (
    <FloatButton.Group
      trigger="hover"
      icon={<RobotOutlined />}
    >
      <div 
        className={styles.audioPress} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onMouseLeave={handleMouseUp}
      >
        <Tooltip title="按住说话">
          <FloatButton icon={<AudioOutlined />} />
        </Tooltip>
      </div>
      <FloatButton icon={<QuestionOutlined />} onClick={handleOpenAudioModal} />
      <FloatButton icon={<SoundOutlined />} onClick={handleAudioPlay} />
    </FloatButton.Group>
  )
}

export default AiFloatButton

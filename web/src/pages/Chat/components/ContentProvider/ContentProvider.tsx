import React, { useEffect, useState } from 'react'
import annyang from 'annyang'

import SpeechRecognitionSingleton from '../../utils/SpeechRecognitionSingleton'
import SpeechSynthesisSingleton from '../../utils/SpeechSynthesisSingleton'

interface Props {
  children: React.ReactNode
}

export type Context = {
  isAudioModalOpen: boolean
  inputMessage: string
  setInputMessage: (inputMessage: string) => void
  outputMessage: string
  setOutputMessage: (outputMessage: string) => void
  msg: string
  openModel1: boolean
  openModel2: boolean
  setMsg: (msg: string) => void
  handleMouseDown: () => void
  handleMouseUp: () => void
  handleCancelAudioModal: () => void
  handleOpenAudioModal: () => void
  handleAudioPlay: () => void
  handleSend: () => void
}

export const ContentContext = React.createContext<Context>({} as Context)

const recognition = SpeechRecognitionSingleton.getInstance();
const synth = SpeechSynthesisSingleton.getInstance();
// recognition.start();

let lastValue = '';


function ContentProvider({ children }: Props) {
  const [isAudioModalOpen, setAudioModalIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [msg, setMsg] = useState('')
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);

  const handleCancelAudioModal = () => {
    setAudioModalIsOpen(false);
  };

  const handleOpenAudioModal = () => {
    setAudioModalIsOpen(true);
  };

  const handleMouseDown = () => {
    setOpenModel1(true)
  };

  const handleMouseUp = () => {
    setOpenModel1(false)
  };

  const handleAudioPlay = () => {
    synth.speak(outputMessage);
  };

  recognition.onresult = function (event: { results: { transcript: any; }[][], timeStamp: number }) {
    let result = event.results?.[0]?.[0]?.transcript;
    console.log(result)
    console.log('111', 111)
    if (openModel1 || openModel2) {
      if (openModel2 && result.includes('结束输入')) {
        setOpenModel2(false)
      }
      if (lastValue === result) {
        setMsg(msg + ',')
      } else {
        setMsg(msg + result[result.length - 1])
      }
      lastValue = result;
    }
  }


  // useEffect(()=>{
  //   console.log(recognition)
  //   if(!recognition) return
  //   if (openModel1) {
  //     recognition.start();
  //   }else{
  //     recognition.abort();
  //   }
  // },[openModel1])

  useEffect(() => {
    if (openModel1 || openModel2) {
      annyang.abort();
      recognition.start();
    } else {
      annyang.start()
      recognition.abort();
    }
    console.log(recognition)
  }, [openModel1, openModel2])

  useEffect(() => {
    // annyang.setLanguage('zh-CN');
    annyang.addCommands({
      'test': () => {
        console.log('测试')
      },
      'start': () => {
        setOpenModel2(true)
      },
      'send': () => {
        console.log('send')
        handleSend()
      }
    })
  }, [])


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
    <ContentContext.Provider
      value={{
        isAudioModalOpen,
        inputMessage,
        setInputMessage,
        outputMessage,
        setOutputMessage,
        openModel1,
        openModel2,
        msg,
        setMsg,
        handleMouseDown,
        handleMouseUp,
        handleCancelAudioModal,
        handleOpenAudioModal,
        handleAudioPlay,
        handleSend
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ContentProvider

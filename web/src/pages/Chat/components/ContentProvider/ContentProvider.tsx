import React, { useEffect, useState } from 'react'
import SpeechRecognitionSingleton from '../../utils/SpeechRecognitionSingleton'
import annyang from 'annyang'

interface Props {
  children: React.ReactNode
}

export type Context = {
  isAudioModalOpen: boolean
  inputMessage: string
  setInputMessage: (inputMessage: string) => void
  outputMessage: string
  setOutputMessage: (outputMessage: string) => void
  isPressed: boolean
  setIsPressed: (isPressed: boolean) => void
  msg: string
  setMsg: (msg: string) => void
  handleMouseDown: () => void
  handleMouseUp: () => void
  handleCancelAudioModal: () => void
  handleOpenAudioModal: () => void
}

export const ContentContext = React.createContext<Context>({} as Context)

const recognition = SpeechRecognitionSingleton.getInstance();
function ContentProvider({ children }: Props) {
  const [isAudioModalOpen, setAudioModalIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [msg, setMsg] = useState('')
  const [isPressed, setIsPressed] = useState(false);

  const handleCancelAudioModal = () => {
    setAudioModalIsOpen(false);
  };

  const handleOpenAudioModal = () => {
    setAudioModalIsOpen(true);
  };

  const handleMouseDown = () => {
    //@ts-ignore
    annyang && annyang.abort();
    setIsPressed(true);
    recognition.start();
  };

  const handleMouseUp = () => {
    recognition.stop();

    //@ts-ignore
    annyang && annyang.start();
    setIsPressed(false);
  };

  recognition.onresult = function (event: { results: { transcript: any; }[][]; }) {
    const result = event.results?.[0]?.[0]?.transcript;
    if (result.include('end')) {
      handleMouseUp()
    }
    setMsg(msg + result)
  }

  useEffect(() => {
    // @ts-ignore
    annyang.addCommands({
      'start': handleMouseDown,
    })

    // @ts-ignore
    annyang.start()
  }, [])



  return (
    <ContentContext.Provider
      value={{
        isAudioModalOpen,
        inputMessage,
        setInputMessage,
        outputMessage,
        setOutputMessage,
        isPressed,
        setIsPressed,
        msg,
        setMsg,
        handleMouseDown,
        handleMouseUp,
        handleCancelAudioModal,
        handleOpenAudioModal,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ContentProvider

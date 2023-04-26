type SpeechRecognition = any;

class SpeechRecognitionSingleton {

  private static instance: SpeechRecognition;

  private constructor() {}

  public static getInstance(): SpeechRecognition {
    if (!SpeechRecognitionSingleton.instance) {
      // @ts-ignore
      const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
  
      recognition.lang = 'zh-CN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      SpeechRecognitionSingleton.instance = recognition;
    }

    return SpeechRecognitionSingleton.instance;
  }
}

export default SpeechRecognitionSingleton;
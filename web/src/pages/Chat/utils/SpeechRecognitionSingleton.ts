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
      recognition.interimResults = true; //将"interimResults（临时结果）"属性设置为false。当该属性为true时，SpeechRecognition对象会在识别的过程中不断输出临时的识别结果。
      recognition.maxAlternatives = 1;
      recognition.continuous = true; //recognition.continuous = true 的方式将其设置为“连续模式”，使语音识别在检测到语音输入结束后不会自动停止

      SpeechRecognitionSingleton.instance = recognition;
    }

    return SpeechRecognitionSingleton.instance;
  }
}

export default SpeechRecognitionSingleton;
// @ts-nocheck
class SpeechSynthesisSingleton {
  private static instance: SpeechSynthesisSingleton | null = null;
  private synth: SpeechSynthesis | null = null;

  private constructor() {
    // Initialize the speech synthesis object
    this.synth = window?.speechSynthesis || window?.webkitSpeechSynthesis;
  }

  public static getInstance(): SpeechSynthesisSingleton {
    if (!SpeechSynthesisSingleton.instance) {
      SpeechSynthesisSingleton.instance = new SpeechSynthesisSingleton();
    }
    return SpeechSynthesisSingleton.instance;
  }

  public speak(text: string): void {
    if (!this.synth) {
      console.error('SpeechSynthesis not supported');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.synth.speak(utterance);
  }
}

export default SpeechSynthesisSingleton;

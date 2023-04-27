/// <reference types="vite/client" />

declare module 'less/dist/less.min.js';


declare module 'annyang' {
  export interface Commands {
    [phrase: string]: (...args: any[]) => void
  }

  export interface Annyang {
    start(options?: { autoRestart?: boolean; continuous?: boolean }): void
    abort(): void
    pause(): void
    resume(): void
    addCommands(commands: Commands, context?: any): void
    removeCommands(commands?: Commands): void
    getSpeechRecognizer(): any
    setLanguage(language: string): void
    addCallback(type: string, callback: () => void, context?: any): void
    removeCallback(type: string, callback: () => void): void
  }

  const annyang: Annyang
  export default annyang
}
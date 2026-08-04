// Audio & Speech Utilities for Gymnex (Disabled / Silent)

class AudioSynth {
  init() {}
  playEliteHover() {}
  playEliteClick() {}
  playCardHover() {}
}

export const audioSynth = new AudioSynth();

export const speakTrainerInfo = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  Mic,
  MicOff,
  Loader2,
  RotateCcw,
} from "lucide-react";

function VoiceAssistant({ onQuestion }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      onQuestion(transcript);
      resetTranscript();
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-600 font-medium">
          Your browser doesn't support Speech Recognition.
        </p>
      </div>
    );
  }

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="bg-slate-50 rounded-xl p-5">

      <h3 className="text-lg font-bold mb-4">
        🎤 Voice Assistant
      </h3>

      <div className="flex items-center gap-4">

        {!listening ? (
          <button
            onClick={startListening}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Mic size={20} />
            Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl animate-pulse transition"
          >
            <MicOff size={20} />
            Stop Listening
          </button>
        )}

        {listening && (
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <Loader2 size={18} className="animate-spin" />
            Listening...
          </div>
        )}
      </div>

      <div className="mt-5">

        <label className="text-sm font-semibold text-gray-600">
          Transcript
        </label>

        <div className="mt-2 bg-white border rounded-xl min-h-[90px] p-4">

          {transcript ? (
            transcript
          ) : (
            <span className="text-gray-400">
              Start speaking...
            </span>
          )}

        </div>

      </div>

      <div className="flex justify-end mt-4">

        <button
          onClick={resetTranscript}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">

        <h4 className="font-semibold text-blue-700 mb-2">
          Usage Tips
        </h4>

        <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Click <strong>Start Listening</strong>.</li>
          <li>Ask your stadium-related question.</li>
          <li>Click <strong>Stop Listening</strong>.</li>
          <li>Your question is automatically sent to the AI assistant.</li>
        </ul>

      </div>

    </div>
  );
}

export default VoiceAssistant;

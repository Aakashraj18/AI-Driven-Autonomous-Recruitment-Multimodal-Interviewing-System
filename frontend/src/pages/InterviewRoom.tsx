import { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Phone,
  PhoneOff,
  Send,
  Bot,
  User,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useWebSocket } from '../hooks/useWebSocket';
import type { ConversationMessage } from '../types';

export default function InterviewRoom() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [manualInput, setManualInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Custom hooks ────────────────────────────
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: sttSupported,
    error: sttError,
  } = useSpeechToText();
  const { speak, stop: stopSpeaking, isSpeaking, isSupported: ttsSupported } =
    useTextToSpeech();
  const { isConnected, connect, disconnect, emit, on, off } = useWebSocket();

  // ── Auto-scroll chat ────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Timer ───────────────────────────────────
  useEffect(() => {
    if (isSessionActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── WebSocket event listeners ───────────────
  useEffect(() => {
    const handleAIResponse = (data: unknown) => {
      const { content } = data as { content: string };
      const msg: ConversationMessage = {
        role: 'ai',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, msg]);
      speak(content);
    };

    on('interview:evaluate', handleAIResponse);
    return () => {
      off('interview:evaluate', handleAIResponse);
    };
  }, [on, off, speak]);

  // ── Session controls ────────────────────────
  const startSession = () => {
    connect();
    setIsSessionActive(true);
    setMessages([]);
    setElapsedTime(0);
    emit('interview:start', { candidateId: 'demo', jobDescriptionId: 'demo' });

    // Simulate initial AI greeting for demo
    setTimeout(() => {
      const greeting: ConversationMessage = {
        role: 'ai',
        content:
          "Hello! Welcome to your technical interview. I'm your AI interviewer. Let's begin — could you please introduce yourself and tell me about your most impactful project?",
        timestamp: new Date(),
      };
      setMessages([greeting]);
      speak(greeting.content);
    }, 500);
  };

  const endSession = () => {
    stopListening();
    stopSpeaking();
    setIsSessionActive(false);
    emit('interview:end', {});
    disconnect();
  };

  // ── Send answer ─────────────────────────────
  const sendAnswer = (text: string) => {
    if (!text.trim()) return;

    const msg: ConversationMessage = {
      role: 'candidate',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    emit('interview:answer', { content: text.trim() });
    resetTranscript();
    setManualInput('');

    // Simulate AI follow-up for demo (no backend)
    setTimeout(() => {
      const followUps = [
        "That's interesting! Can you walk me through the technical architecture you used?",
        "Great answer. How did you handle error handling and edge cases in that scenario?",
        "Thank you. Can you describe a challenging bug you encountered and how you debugged it?",
        "Excellent. What testing strategies did you employ for this project?",
        "Good response. How would you approach scaling this system for 10x the current load?",
      ];
      const aiReply: ConversationMessage = {
        role: 'ai',
        content: followUps[Math.floor(Math.random() * followUps.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiReply]);
      speak(aiReply.content);
    }, 1500);
  };

  // ── Toggle mic ──────────────────────────────
  const toggleMic = () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        sendAnswer(transcript);
      }
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-6rem)] flex flex-col">
      {/* ── Page Header ─────────────────────────── */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Interview Room
          </h1>
          <p className="mt-1 text-surface-200/60 text-sm">
            AI-powered multimodal interview with real-time evaluation.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              isConnected
                ? 'bg-accent-500/10 border-accent-500/20'
                : 'bg-surface-800 border-surface-700'
            }`}
          >
            {isConnected ? (
              <Wifi className="w-3.5 h-3.5 text-accent-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-surface-200/40" />
            )}
            <span
              className={`text-xs font-medium ${
                isConnected ? 'text-accent-300' : 'text-surface-200/40'
              }`}
            >
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>

          {isSessionActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-mono font-bold text-primary-300">
                {formatTime(elapsedTime)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Interview Area ─────────────────── */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!isSessionActive && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                  <Bot className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ready to Begin
                </h3>
                <p className="text-sm text-surface-200/50 max-w-sm">
                  Start the session to connect with the AI interviewer.
                  Enable your microphone for voice interaction.
                </p>
                {(!sttSupported || !ttsSupported) && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-warning-500/10 border border-warning-500/20">
                    <AlertTriangle className="w-4 h-4 text-warning-400 shrink-0" />
                    <p className="text-xs text-warning-300">
                      {!sttSupported && 'Speech-to-Text not supported. '}
                      {!ttsSupported && 'Text-to-Speech not supported. '}
                      Use Chrome for best experience.
                    </p>
                  </div>
                )}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 animate-slide-up ${
                  msg.role === 'candidate' ? 'flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'ai'
                      ? 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/20'
                      : 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/20'
                  }`}
                >
                  {msg.role === 'ai' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'ai'
                      ? 'bg-surface-800/80 text-surface-100 rounded-tl-md'
                      : 'bg-primary-500/15 text-white rounded-tr-md'
                  }`}
                >
                  {msg.content}
                  <p className="text-[10px] text-surface-200/30 mt-1.5">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* ── Live Transcript ──────────────────── */}
          {isListening && transcript && (
            <div className="mx-6 mb-2 px-4 py-2.5 rounded-xl bg-primary-500/5 border border-primary-500/20 animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-primary-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-primary-400 uppercase tracking-wider">
                  Live Transcript
                </span>
              </div>
              <p className="text-sm text-surface-200/70 italic">{transcript}</p>
            </div>
          )}

          {sttError && (
            <div className="mx-6 mb-2 px-4 py-2 rounded-xl bg-danger-500/10 border border-danger-500/20">
              <p className="text-xs text-danger-400">{sttError}</p>
            </div>
          )}

          {/* ── Input Bar ───────────────────────── */}
          <div className="p-4 border-t border-surface-700/30 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              {/* Mic Toggle */}
              <button
                id="mic-toggle"
                onClick={toggleMic}
                disabled={!isSessionActive || !sttSupported}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
                  isListening
                    ? 'bg-danger-500 text-white shadow-lg shadow-danger-500/30 scale-105'
                    : 'bg-surface-800 text-surface-200/60 hover:bg-primary-500/20 hover:text-primary-400'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
                {isListening && (
                  <span className="absolute inset-0 rounded-xl border-2 border-danger-400 animate-pulse-ring" />
                )}
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  id="interview-input"
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendAnswer(manualInput);
                  }}
                  disabled={!isSessionActive}
                  placeholder={
                    isSessionActive
                      ? 'Type your answer or use the microphone...'
                      : 'Start the session first...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-900/80 border border-surface-700 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all disabled:opacity-40"
                />
              </div>

              {/* Send */}
              <button
                id="send-answer"
                onClick={() => sendAnswer(manualInput)}
                disabled={!isSessionActive || !manualInput.trim()}
                className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-primary-500/20"
              >
                <Send className="w-5 h-5" />
              </button>

              {/* TTS Toggle */}
              <button
                id="tts-toggle"
                onClick={() => (isSpeaking ? stopSpeaking() : null)}
                disabled={!ttsSupported}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 ${
                  isSpeaking
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'bg-surface-800 text-surface-200/40 hover:text-white'
                }`}
              >
                {isSpeaking ? (
                  <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar: Controls & Info ──── */}
        <div className="w-72 shrink-0 space-y-5">
          {/* Session Control */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Session Control
            </h3>
            {!isSessionActive ? (
              <button
                id="start-session"
                onClick={startSession}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/25 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                Start Interview
              </button>
            ) : (
              <button
                id="end-session"
                onClick={endSession}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-danger-500 to-danger-600 text-white hover:from-danger-400 hover:to-danger-500 shadow-lg shadow-danger-500/25 transition-all active:scale-[0.98]"
              >
                <PhoneOff className="w-4 h-4" />
                End Interview
              </button>
            )}
          </div>

          {/* Interview Stats */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Session Info
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: 'Messages',
                  value: messages.length.toString(),
                  color: 'text-primary-400',
                },
                {
                  label: 'Your Answers',
                  value: messages
                    .filter((m) => m.role === 'candidate')
                    .length.toString(),
                  color: 'text-accent-400',
                },
                {
                  label: 'AI Questions',
                  value: messages
                    .filter((m) => m.role === 'ai')
                    .length.toString(),
                  color: 'text-warning-400',
                },
                {
                  label: 'Duration',
                  value: formatTime(elapsedTime),
                  color: 'text-surface-200/60',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between py-2 border-b border-surface-700/30 last:border-0"
                >
                  <span className="text-xs text-surface-200/50">
                    {stat.label}
                  </span>
                  <span className={`text-sm font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Status */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Audio Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-200/50">Microphone</span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isListening ? 'text-danger-400' : 'text-surface-200/40'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isListening ? 'bg-danger-400 animate-pulse' : 'bg-surface-700'
                    }`}
                  />
                  {isListening ? 'Recording' : 'Off'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-200/50">AI Voice</span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isSpeaking ? 'text-accent-400' : 'text-surface-200/40'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSpeaking ? 'bg-accent-400 animate-pulse' : 'bg-surface-700'
                    }`}
                  />
                  {isSpeaking ? 'Speaking' : 'Silent'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

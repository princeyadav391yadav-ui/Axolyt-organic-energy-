import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Waves, Sparkles, Trees } from 'lucide-react';

export const AudioAmbianceController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const activeSourcesRef = useRef<AudioNode[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Update volume when slider or mute state changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.35; // gentle ambient ceiling
      masterGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.08);
    }
  }, [volume, isMuted]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startAudio = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    const targetGain = isMuted ? 0 : volume * 0.35;
    masterGain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 1.2);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // 1. Generate Continuous Stream & Waterfall White/Pink Noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise approximation for natural river flow
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const waterfallSource = ctx.createBufferSource();
    waterfallSource.buffer = noiseBuffer;
    waterfallSource.loop = true;

    // Low-pass filter for deep soothing waterfall resonance
    const waterfallFilter = ctx.createBiquadFilter();
    waterfallFilter.type = 'lowpass';
    waterfallFilter.frequency.setValueAtTime(450, ctx.currentTime);

    // Subtle LFO modulation for water ripples
    const rippleLfo = ctx.createOscillator();
    rippleLfo.frequency.setValueAtTime(0.18, ctx.currentTime); // 0.18 Hz gentle current
    const rippleGain = ctx.createGain();
    rippleGain.gain.setValueAtTime(90, ctx.currentTime);
    rippleLfo.connect(rippleGain);
    rippleGain.connect(waterfallFilter.frequency);
    rippleLfo.start();

    const waterfallGain = ctx.createGain();
    waterfallGain.gain.setValueAtTime(0.65, ctx.currentTime);

    waterfallSource.connect(waterfallFilter);
    waterfallFilter.connect(waterfallGain);
    waterfallGain.connect(masterGain);
    waterfallSource.start();

    // 2. High-Canopy Wind & Leaf Rustle
    const leafNoiseSource = ctx.createBufferSource();
    leafNoiseSource.buffer = noiseBuffer;
    leafNoiseSource.loop = true;

    const leafFilter = ctx.createBiquadFilter();
    leafFilter.type = 'bandpass';
    leafFilter.frequency.setValueAtTime(1100, ctx.currentTime);
    leafFilter.Q.setValueAtTime(1.8, ctx.currentTime);

    const leafGain = ctx.createGain();
    leafGain.gain.setValueAtTime(0.12, ctx.currentTime);

    leafNoiseSource.connect(leafFilter);
    leafFilter.connect(leafGain);
    leafGain.connect(masterGain);
    leafNoiseSource.start();

    // 3. Procedural Forest Bird Song Chimes
    const playChirp = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const c = audioCtxRef.current;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const chirpGain = c.createGain();

      // Bird chirp frequency curve
      const baseFreq = 2600 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 700, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 200, now + 0.16);

      chirpGain.gain.setValueAtTime(0.0001, now);
      chirpGain.gain.linearRampToValueAtTime(0.06, now + 0.03);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(chirpGain);
      chirpGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.25);

      // Repeat second chirp syllable for realism
      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
          const c2 = audioCtxRef.current;
          const now2 = c2.currentTime;
          const osc2 = c2.createOscillator();
          const chirpGain2 = c2.createGain();

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(baseFreq + 400, now2);
          osc2.frequency.exponentialRampToValueAtTime(baseFreq + 1000, now2 + 0.07);
          osc2.frequency.exponentialRampToValueAtTime(baseFreq + 300, now2 + 0.15);

          chirpGain2.gain.setValueAtTime(0.0001, now2);
          chirpGain2.gain.linearRampToValueAtTime(0.05, now2 + 0.03);
          chirpGain2.gain.exponentialRampToValueAtTime(0.0001, now2 + 0.2);

          osc2.connect(chirpGain2);
          chirpGain2.connect(masterGain);

          osc2.start(now2);
          osc2.stop(now2 + 0.22);
        }, 160);
      }

      // Schedule next organic birdsong
      const nextDelay = 3500 + Math.random() * 5500;
      timerRef.current = window.setTimeout(playChirp, nextDelay);
    };

    // Trigger first bird chirp after 2 seconds
    timerRef.current = window.setTimeout(playChirp, 2000);

    activeSourcesRef.current = [waterfallSource, leafNoiseSource, rippleLfo];
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      setTimeout(() => {
        activeSourcesRef.current.forEach((src) => {
          try {
            (src as AudioScheduledSourceNode).stop?.();
            src.disconnect();
          } catch {
            // node already stopped
          }
        });
        activeSourcesRef.current = [];
        if (ctx.state === 'running') {
          ctx.suspend();
        }
      }, 550);
    }

    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 border border-emerald-400/30 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-emerald-400/50">
        {/* Soft background ambient gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-emerald-800/10 to-teal-900/30 transition-opacity duration-700 pointer-events-none ${
            isPlaying ? 'opacity-100' : 'opacity-20'
          }`}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          {/* Left: Play Toggle & Track Info */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause forest ambiance' : 'Play forest ambiance'}
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg ${
                isPlaying
                  ? 'bg-emerald-400 text-emerald-950 shadow-emerald-400/30 hover:bg-emerald-300 scale-105'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1">
                  <Trees className="w-3.5 h-3.5" />
                  Sensory Ambiance
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                Cascading Waterfall &amp; Forest Canopy
              </h4>
              <p className="text-[11px] text-emerald-200/70">
                {isPlaying
                  ? 'Playing tranquil stream waters, gentle breeze, and wild songbirds'
                  : 'Click play to immerse yourself in the AXOLYT rainforest soundscape'}
              </p>
            </div>
          </div>

          {/* Right: Volume & Soundwave Controls */}
          <div className="flex items-center gap-3 sm:border-l sm:border-emerald-500/20 sm:pl-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              disabled={!isPlaying}
              aria-label={isMuted ? 'Unmute ambiance' : 'Mute ambiance'}
              className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/40 disabled:opacity-40 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-emerald-400/60" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            <div className="flex flex-col gap-1 w-24">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                disabled={!isPlaying}
                aria-label="Ambiance volume"
                className="w-full accent-emerald-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer disabled:opacity-40"
              />
              <span className="text-[9px] text-emerald-300/60 text-right font-mono">
                {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useEffect, useState, useRef } from "react";

export default function CrtOverlay() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("crt-played")) return;
    sessionStorage.setItem("crt-played", "true");

    setShow(true);

    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      playBootSound(ctx);
    } catch {}

    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const removeTimer = setTimeout(() => setShow(false), 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      ctxRef.current?.close();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700"
      style={{
        opacity: fading ? 0 : 1,
        background: fading ? "transparent" : "hsl(215, 45%, 8%)",
      }}
    >
      <div className="absolute inset-0 animate-crt-flash" />
      <div className="absolute inset-0 animate-crt-scanlines" />
      <div className="absolute inset-0 animate-crt-wobble" />
      <div className="absolute inset-0 animate-crt-glitch" />
      <div className="absolute inset-0 animate-crt-flicker" />
    </div>
  );
}

function playBootSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.12;
  master.connect(ctx.destination);

  const lowHum = ctx.createOscillator();
  lowHum.type = "sine";
  lowHum.frequency.value = 60;
  const lowGain = ctx.createGain();
  lowGain.gain.setValueAtTime(0, now);
  lowGain.gain.linearRampToValueAtTime(0.4, now + 0.08);
  lowGain.gain.linearRampToValueAtTime(0.2, now + 0.3);
  lowGain.gain.linearRampToValueAtTime(0, now + 0.7);
  lowHum.connect(lowGain);
  lowGain.connect(master);
  lowHum.start(now);
  lowHum.stop(now + 0.7);

  const whine = ctx.createOscillator();
  whine.type = "sawtooth";
  whine.frequency.value = 12000;
  const whineGain = ctx.createGain();
  whineGain.gain.setValueAtTime(0, now);
  whineGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
  whineGain.gain.linearRampToValueAtTime(0, now + 0.4);
  whine.connect(whineGain);
  whineGain.connect(master);
  whine.start(now);
  whine.stop(now + 0.4);

  const pop = ctx.createOscillator();
  pop.type = "square";
  pop.frequency.value = 800;
  const popGain = ctx.createGain();
  popGain.gain.setValueAtTime(0, now);
  popGain.gain.linearRampToValueAtTime(0.6, now + 0.005);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  pop.connect(popGain);
  popGain.connect(master);
  pop.start(now);
  pop.stop(now + 0.04);

  const noise = ctx.createBufferSource();
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.5, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  noise.connect(noiseGain);
  noiseGain.connect(master);
  noise.start(now);
}

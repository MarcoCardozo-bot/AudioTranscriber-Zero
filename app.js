// js/app.js
import { midiFromNotes } from "./midi-export.js";
import { makePdf }     from "./pdf-export.js";

const fileIn  = document.getElementById("fileInput");
const anaBtn  = document.getElementById("analBtn");
const result  = document.getElementById("result");
const sheet   = document.getElementById("sheet");
const midiBtn = document.getElementById("midiBtn");
const pdfBtn  = document.getElementById("pdfBtn");

fileIn.addEventListener("change", handleFile);

let globalNotes = [];

async function handleFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;

  anaBtn.disabled = false;
  anaBtn.onclick = () => analyse(file);
}

async function analyse(file) {
  anaBtn.disabled = true;
  result.hidden = true;

  // 1) lê áudio para arraybuffer
  const audioBuf = await file.arrayBuffer();

  // 2) cria contexto (autoplay-friendly)
  const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 22050 });
  if (ctx.state === "suspended") await ctx.resume();

  // 3) decodifica
  const buffer = await ctx.decodeAudioData(audioBuf);
  const left   = buffer.getChannelData(0);

  // 4) roda BasicPitch
  const model = new basicpitch.Model();
  const frames = await model.predict(left, buffer.sampleRate);
  model.dispose();

  // 5) converte frames → notas
  globalNotes = basicpitch.frame2notes(frames);

  // 6) mostra
  renderNotes();
  result.hidden = false;
  anaBtn.disabled = false;
}

function renderNotes() {
  sheet.innerHTML = "";
  globalNotes.forEach(n =>
    sheet.insertAdjacentHTML("beforeend",
      `<div>MIDI ${n.midi}  ${n.time.toFixed(2)}s  ${n.duration.toFixed(2)}s</div>`));
}

midiBtn.onclick = () => {
  const midi = midiFromNotes(globalNotes);
  const blob = new Blob([midi], { type: "audio/midi" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "transcrição.mid"; a.click();
};

pdfBtn.onclick = () => makePdf(globalNotes);

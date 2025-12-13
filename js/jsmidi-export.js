// js/midi-export.js
// exporta notas [{midi, time, duration}] → Uint8Array MIDI

/* eslint-disable */
export function midiFromNotes(notes, bpm = 120) {
  const ppq   = 480;
  const mpb   = 60000 / bpm;          // ms por batida
  const tpq   = mpb / 1000 * ppq;     // ticks por 1 s
  const track = new Uint8Array(20000); let offs = 0;
  const write = (...bytes) => { bytes.forEach(b => track[offs++] = b); };

  // cabeçalho chunk
  write(0x4D, 0x54, 0x68, 0x64);             // "MThd"
  write(0x00, 0x00, 0x00, 0x06);             // tamanho 6
  write(0x00, 0x00);                          // formato 0
  write(0x00, 0x01);                          // ntracks = 1
  write(...u16be(ppq));                       // PulsesPerQuarter

  // track chunk
  const trkStart = offs;
  write(0x4D, 0x54, 0x72, 0x6B);             // "MTrk"
  offs += 4;                                  // espaço pro tamanho

  // tempo
  writeVarLen(0); write(0xFF, 0x51, 0x03); writeTempo(mpb);

  // notas
  notes.sort((a,b) => a.time - b.time);
  notes.forEach(n => {
    const on  = Math.round(n.time  * tpq);
    const off = Math.round((n.time + n.duration) * tpq);
    const ch  = 0, vel = 100, key = n.midi;
    writeVarLen(on - last);
    write(0x90 | ch, key, vel);             // NoteOn
    last = on;
    writeVarLen(off - on);
    write(0x80 | ch, key, 0);               // NoteOff
    last = off;
  });

  // fim
  writeVarLen(0); write(0xFF, 0x2F, 0x00);

  // preenche tamanho
  const trackSz = offs - trkStart - 4;
  new DataView(track.buffer).setUint32(trkStart + 4, trackSz);

  return track.slice(0, offs);

  // helpers
  function writeVarLen(v) {
    if (v >>> 21) write((v >>> 21) & 0x7F | 0x80);
    if (v >>> 14) write((v >>> 14) & 0x7F | 0x80);
    if (v >>>  7) write((v >>>  7) & 0x7F | 0x80);
    write(v & 0x7F);
  }
  function writeTempo(us) {
    write((us >>> 16) & 0xFF, (us >>> 8) & 0xFF, us & 0xFF);
  }
  function u16be(v) { return [(v >>> 8) & 0xFF, v & 0xFF]; }
  let last = 0;
}

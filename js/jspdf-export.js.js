// js/pdf-export.js
// gera PDF com partitura simples a partir das notas
import jsPDF from "https://cdn.skypack.dev/jspdf@2.5.1";

export function makePdf(notes, bpm = 120) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = pdf.internal.pageSize.width;
  const h = pdf.internal.pageSize.height;
  const margin = 15;
  const staffY = 30;
  const lineSpace = 4;
  const lineN = 5;
  const c = { x: margin, y: staffY };

  // desenha pauta
  for (let i = 0; i < lineN; i++)
    pdf.line(c.x, c.y + i * lineSpace, w - margin, c.y + i * lineSpace);

  // escalas
  const startTime = Math.min(...notes.map(n => n.time));
  const colScale = 20; // mm por segundo
  const rowMidi = 60;  // centraliza no mi do teclado (midi 60)

  notes.forEach(n => {
    const x = c.x + (n.time  - startTime) * colScale;
    const y = c.y + (rowMidi - n.midi) * (lineSpace / 2);
    // cabeça de nota (simplificada)
    pdf.setDrawColor(0);
    pdf.ellipse(x, y, 1.5, 1, "F");
  });

  pdf.save("partitura.pdf");
}

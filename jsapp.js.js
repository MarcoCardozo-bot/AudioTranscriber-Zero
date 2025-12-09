// Gravação
let recorder, audioCtx, analyser, stream, source, dataArray, bufferLength;
const canv=document.getElementById('waveform'),ctx=canv.getContext('2d');
document.getElementById('recBtn').onclick=async()=>{
  stream=await navigator.mediaDevices.getUserMedia({audio:true});
  audioCtx=new AudioContext();source=audioCtx.createMediaStreamSource(stream);
  analyser=audioCtx.createAnalyser();source.connect(analyser);
  analyser.fftSize=512;bufferLength=analyser.frequencyBinCount;dataArray=new Uint8Array(bufferLength);
  recorder=new MediaRecorder(stream); recorder.start();
  drawWave(); document.getElementById('stopBtn').disabled=false;
  recorder.ondataavailable=e=>chunks.push(e.data);
  chunks=[];
};
let chunks=[];
document.getElementById('stopBtn').onclick=()=>{
  recorder.stop();stream.getTracks().forEach(t=>t.stop());
  recorder.onstop=()=>{audioBlob=new Blob(chunks,{type:'audio/wav'});document.getElementById('analBtn').disabled=false;};
};
// Waveform animada
function drawWave(){
  requestAnimationFrame(drawWave);analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle='#222';ctx.fillRect(0,0,canv.width,canv.height);
  let barWidth=canv.width/bufferLength,x=0;
  for(let i=0;i<bufferLength;i++){
    let barHeight=dataArray[i]/2;
    ctx.fillStyle='rgb('+(barHeight+100)+',50,50)';
    ctx.fillRect(x,canv.height-barHeight/2,2,barHeight);
    x+=2;
  }
}
// Análise off-line (Basic Pitch)
let audioBlob;
document.getElementById('analBtn').onclick=async()=>{
  if(!audioBlob){alert('Grave ou carregue um áudio primeiro');return;}
  const audioBuf=await audioBlob.arrayBuffer();
  const audioCtx2=new AudioContext({sampleRate:22050});
  const buf=await audioCtx2.decodeAudioData(audioBuf);
  const mono=buf.getChannelData(0);
  const model=await BasicPitch.load();
  const notes=model.transcribe(mono);
  // Gera MIDI
  const midi=midiExport(notes);
  document.getElementById('midiBtn').onclick=()=>download(midi,'transcricao.mid','audio/midi');
  // Gera partitura PNG → PDF (placeholder)
  document.getElementById('pdfBtn').onclick=()=>pdfExport(notes);
  document.getElementById('result').hidden=false;
};
// Upload de arquivo
document.getElementById('fileInput').onchange=e=>{
  const file=e.target.files[0]; if(!file)return;
  audioBlob=file; document.getElementById('analBtn').disabled=false;
};
// Download helper
function download(data,name,mime){
  const blob=new Blob([data],{type:mime});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=name;a.click();
}

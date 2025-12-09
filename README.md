# AudioTranscriber-Zero
It's a smart app created for those who need to transform audio into text quickly. Record directly through the microphone or send any audio file — the app takes care of the rest. With updated technology and an intuitive interface, it detects speech with high precision and delivers a clean, organized, and ready-to-use transcription.
# AudioTranscriber-Zero

Grave ou carregue um arquivo de áudio e obtenha:
- Transcrição de notas (via Basic Pitch)
- Arquivo `.mid` pronto para usar em qualquer DAW
- Visor de waveform em tempo real
- Tudo **rodando 100 % off-line** (sem servidor, nem cadastro)

> Ideal para aulas de música, cifras rápidas ou backup de melodias no pen-drive.

---

## 🚀 Como usar (sem internet!)

1. Baixe o ZIP:  
   ➜ [https://github.com/MarcoCardozo-bot/AudioTranscriber-Zero/archive/refs/heads/main.zip](https://github.com/MarcoCardozo-bot/AudioTranscriber-Zero/archive/refs/heads/main.zip)  

2. Extraia a pasta para qualquer lugar (PC, pen-drive, tablet).  

3. Abra o arquivo `index.html` no **Chrome / Edge / Firefox**.  
   *(Não funciona direto pelo IE.)*

4. Grave sua voz/violão/clarinete:  
   - Clique em “🔴 Gravar” e tote o que quiser.  
   - Aperte “⏹ Parar” quando terminar.  
   *(Ou então clique em “Escolher arquivo” e selecione qualquer .mp3 / .wav do seu computador.)*

5. Clique em “Analisar áudio”.  
   - Aparecem automaticamente os botões de **baixar MIDI** e (em breve) **baixar PDF**.

---

## 📁 Por dentre do ZIP

AudioTranscriber-Zero/ ├─ index.html # Página principal ├─ sw.js # Service Worker (torna PWA) ├─ manifest.json # Ícone & instalação ├─ css/style.css # Estilização (tema dark) └─ js/ ├─ app.js # Lógica: gravação + waveform + chama IA ├─ basicpitch.min.js # Modelo de ML (transcrição) ├─ midi-export.js # Gera o arquivo .mid └─ pdf-export.js # (placeholder) futura partitura




---

## ⚙️ Requisitos

- Navegador moderno com suporte a **Web Audio API** e **getUserMedia**.  
- **Microfone** (se for fazer gravação).  

---

## 🖥️ Desenvolvimento (opcional)

Quer melhorar o código?  
Faça fork nesse repo → edite à vontade → mande pull request ou crie Issues.

---

## 🔐 Privacidade

Nada é enviado à nuvem. A transcrição acontece **dentro do seu próprio navegador**.

---

### Licença

MIT – use, copie e distribua à vontade. Só mantenha os créditos. 😉

---

**Autor:** Marco Cardozo  
**Repositório:** https://github.com/MarcoCardozo-bot/AudioTranscriber-Zero

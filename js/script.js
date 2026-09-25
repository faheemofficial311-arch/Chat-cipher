// ---- cipher rules ----
const SPECIAL = { Z: '5', E: '9', K: '7', Y: '3', S: '4' };
const REV_SPECIAL = { '5': 'Z', '9': 'E', '7': 'K', '3': 'Y', '4': 'S' };

function posOf(ch) { return ch.toUpperCase().charCodeAt(0) - 64; } // A=1 .. Z=26
function letterAt(pos) { return String.fromCharCode(64 + pos); }  // 1..26 -> A..Z
function isLetter(ch) { return /[a-zA-Z]/.test(ch); }

function encryptChar(ch) {
  if (!isLetter(ch)) return ch;
  const upper = ch.toUpperCase();
  if (SPECIAL[upper]) return SPECIAL[upper];          // fixed swap -> digit
  const newPos = 26 - posOf(ch);                       // mirror swap
  const newLetter = letterAt(newPos);
  return (ch === upper) ? newLetter : newLetter.toLowerCase();
}

function decryptChar(ch) {
  if (/[0-9]/.test(ch)) return REV_SPECIAL[ch] || ch;  // digit -> original letter
  if (!isLetter(ch)) return ch;
  const upper = ch.toUpperCase();
  const origPos = 26 - posOf(ch);
  const origLetter = letterAt(origPos);
  return (ch === upper) ? origLetter : origLetter.toLowerCase();
}

function encrypt(msg) {
  const substituted = msg.split('').map(encryptChar).join('');
  return substituted.split('').reverse().join('');
}

function decrypt(msg) {
  const unreversed = msg.split('').reverse().join('');
  return unreversed.split('').map(decryptChar).join('');
}

// ---- UI wiring ----
let mode = 'encrypt';
const tabs = document.querySelectorAll('.tab');
const inLabel = document.getElementById('inLabel');
const outLabel = document.getElementById('outLabel');
const input = document.getElementById('input');
const output = document.getElementById('output');
const copiedTag = document.getElementById('copiedTag');

function setMode(m) {
  mode = m;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === m));
  if (m === 'encrypt') {
    inLabel.textContent = 'PLAIN MESSAGE';
    outLabel.textContent = 'CIPHERTEXT';
    input.placeholder = 'Type your message...';
  } else {
    inLabel.textContent = 'CIPHERTEXT';
    outLabel.textContent = 'DECODED MESSAGE';
    input.placeholder = 'Paste the ciphertext...';
  }
  output.value = '';
}

tabs.forEach(t => t.addEventListener('click', () => setMode(t.dataset.mode)));

document.getElementById('runBtn').addEventListener('click', () => {
  const val = input.value;
  output.value = mode === 'encrypt' ? encrypt(val) : decrypt(val);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  input.value = '';
  output.value = '';
});

document.getElementById('swapBtn').addEventListener('click', () => {
  const carry = output.value;
  setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  input.value = carry;
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  if (!output.value) return;
  try {
    await navigator.clipboard.writeText(output.value);
    copiedTag.classList.add('show');
    setTimeout(() => copiedTag.classList.remove('show'), 1200);
  } catch (e) {
    output.select();
    document.execCommand('copy');
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    document.getElementById('runBtn').click();
  }
});

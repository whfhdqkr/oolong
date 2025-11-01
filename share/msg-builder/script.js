const chat=document.getElementById('chat');
const msg=document.getElementById('msg');
const sendBtn=document.getElementById('send');
const clearBtn=document.getElementById('clear');

const selA=document.getElementById('selA');
const selB=document.getElementById('selB');
const showA=document.getElementById('showA');
const showB=document.getElementById('showB');
const uploadA=document.getElementById('uploadA');
const uploadB=document.getElementById('uploadB');

const colorA=document.getElementById('colorA');
const colorB=document.getElementById('colorB');
const colorBasicA=document.getElementById('colorBasicA');
const colorBasicB=document.getElementById('colorBasicB');
const colorHighlightA=document.getElementById('colorHighlightA');
const colorHighlightB=document.getElementById('colorHighlightB');

const marginVertical=document.getElementById('marginVertical');
const marginHorizontal=document.getElementById('marginHorizontal');

const editPanel=document.getElementById('editPanel');
const editBox=document.getElementById('editBox');
const applyEdit=document.getElementById('applyEdit');
const cancelEdit=document.getElementById('cancelEdit');

const fontSizeInput = document.getElementById('fontSize');

const bgUpload = document.getElementById('bgUpload');
const removeBg = document.getElementById('removeBg');

const alphaA = document.getElementById('alphaA');
const alphaB = document.getElementById('alphaB');

const alignSide = document.getElementById('alignSide');
const alignCenter = document.getElementById('alignCenter');

const saveImageBtn = document.getElementById('saveImage');

const lineHeightInput = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');

const fontUpload = document.getElementById('fontUpload');
const resetFont = document.getElementById('resetFont');


let active='A';
let imgA='',imgB='';
let editingIndex=null; // 배열 기반 수정용 인덱스
let messages=[];       // 모든 메시지를 담는 배열

// --- 옵션 토글 ---
const toggleProfile=document.getElementById('toggleProfile');
const profilePanel=toggleProfile.parentElement;
toggleProfile.addEventListener('click',()=>profilePanel.classList.toggle('active'));

const toggleBubble=document.getElementById('toggleBubble');
const bubblePanel=toggleBubble.parentElement;
toggleBubble.addEventListener('click',()=>bubblePanel.classList.toggle('active'));

const toggleBG=document.getElementById('toggleBg');
const bGPanel=toggleBG.parentElement;
toggleBG.addEventListener('click',()=>bGPanel.classList.toggle('active'));

const toggleAlign=document.getElementById('toggleAlign');
const alignPanel=toggleAlign.parentElement;
toggleAlign.addEventListener('click',()=>alignPanel.classList.toggle('active'));

const toggleFont = document.getElementById('toggleFont');
const fontPanel = toggleFont.parentElement;
toggleFont.addEventListener('click', () => fontPanel.classList.toggle('active'));

// --- 유틸 ---
function escapeHTML(s){
  return s.replace(/[&<>"']/g,c=>(
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
  ));
}

// 따옴표 하이라이트 포함 HTML 생성
function processTextForDisplay(text, sender) {
  const color = (sender === 'A' ? colorHighlightA.value : colorHighlightB.value);

  // HTML 이스케이프
  let html = escapeHTML(text);

  // --- 모든 종류의 따옴표 쌍("…", “…”, 「…」, 『…』 등)을 잡기 위한 정규식 ---
  // “문장” 또는 "문장" 등 다양한 따옴표 패턴을 지원
  const quoteRegex = /(&quot;|“|”|「|」|『|』)([^"“”「」『』]+)(&quot;|“|”|「|」|『|』)/g;

  html = html.replace(
    quoteRegex,
    `<span style="color:${color}; font-weight:500;">$1$2$3</span>`
  );

  html = html.replace(/\n/g, '<br>');
  return html;
}

// --- 미리보기 렌더링 (messages 배열 기반) ---
function renderMessages(){
  chat.innerHTML='';
  messages.forEach((m,i)=>{
    const wrap=document.createElement('div');
    const isCenter = alignCenter.checked;
      if(isCenter)
          {
              wrap.className='msg '+(m.sender==='A'?'centerA':'centerB');
          }
      else
          {
              wrap.className='msg '+(m.sender==='A'?'left':'right');
          }
    

    const av=document.createElement('div');
    av.className='avatar';
    const show=(m.sender==='A'?showA.checked:showB.checked);
    const img=(m.sender==='A'?imgA:imgB);
    if(show && img){
      av.style.display='flex';
      av.innerHTML=`<img src="${img}">`;
    }

    const bub=document.createElement('div');
    bub.className='bubble';
    bub.style.color = (m.sender === 'A' ? colorBasicA.value : colorBasicB.value);
    bub.innerHTML=processTextForDisplay(m.text,m.sender);

    bub.onclick=()=>openEditPanel(i);

    wrap.appendChild(av);
    wrap.appendChild(bub);
    chat.appendChild(wrap);
  });
  chat.scrollTop=chat.scrollHeight;
}

// --- 아바타 표시 갱신 ---
function refreshAvatarVisibility(){
  renderMessages();
}

// --- 색상/마진 실시간 반영 ---
function applyBubbleColors() {
  // 투명도 적용 (hex → rgba)
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const aColor = hexToRgba(colorA.value, alphaA.value);
  const bColor = hexToRgba(colorB.value, alphaB.value);

  document.documentElement.style.setProperty('--a', aColor);
  document.documentElement.style.setProperty('--b', bColor);
}
function applyChatMargin(){
  const v=marginVertical.value||0;
  const h=marginHorizontal.value||0;
  chat.style.padding=`${v}px ${h}px`;
}
function applyFontSize() {
  const size = fontSizeInput.value || 16;
  document.documentElement.style.setProperty('--bubble-font-size', `${size}px`);
}
function applyLineHeight() {
  const lh = lineHeightInput.value;
  document.documentElement.style.setProperty('--bubble-line-height', lh);
  lineHeightValue.textContent = lh;
}

marginVertical.addEventListener('input',applyChatMargin);
marginHorizontal.addEventListener('input',applyChatMargin);
colorA.oninput = applyBubbleColors;
colorB.oninput = applyBubbleColors;
alphaA.oninput = applyBubbleColors;
alphaB.oninput = applyBubbleColors;
applyBubbleColors(); // 초기 적용
colorBasicA.oninput = renderMessages;
colorBasicB.oninput = renderMessages;
colorHighlightA.oninput = renderMessages;
colorHighlightB.oninput = renderMessages;
fontSizeInput.addEventListener('input', applyFontSize);
applyFontSize(); // 초기 적용
alignSide.addEventListener('change', renderMessages);
alignCenter.addEventListener('change', renderMessages);
lineHeightInput.addEventListener('input', applyLineHeight);
applyLineHeight(); // 초기 적용

// --- 메시지 추가 ---
function sendMessage(){
  const text=msg.value.trim();
  if(!text) return;
  messages.push({sender:active,text});
  msg.value='';
  renderMessages();
}

// --- 메시지 수정 ---
function openEditPanel(index){
  editingIndex=index;
  editBox.value=messages[index].text;
  editPanel.classList.add('active');
}

applyEdit.onclick=()=>{
  if(editingIndex===null) return;
  messages[editingIndex].text=editBox.value;
  editPanel.classList.remove('active');
  editingIndex=null;
  renderMessages();
};

cancelEdit.onclick=()=>{
  editingIndex=null;
  editPanel.classList.remove('active');
};

// --- 배경 이미지 업로드 / 제거 ---
bgUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    chat.style.backgroundImage = `url('${ev.target.result}')`;
  };
  reader.readAsDataURL(file);
});

removeBg.addEventListener('click', () => {
  chat.style.backgroundImage = '';
});

// --- 폰트 설정 ---
fontUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    // 이전 커스텀 폰트 제거
    const oldFont = document.getElementById('customFont');
    if (oldFont) oldFont.remove();

    // 새로운 @font-face 생성
    const fontName = 'CustomChatFont';
    const style = document.createElement('style');
    style.id = 'customFont';
    style.textContent = `
      @font-face {
        font-family: '${fontName}';
        src: url('${ev.target.result}');
      }
    `;
    document.head.appendChild(style);

    // 적용
    document.documentElement.style.setProperty('--chat-font', `'${fontName}'`);
  };
  reader.readAsDataURL(file);
  e.target.value = ''; // 같은 파일 재업로드 가능
});

resetFont.addEventListener('click', () => {
  const oldFont = document.getElementById('customFont');
  if (oldFont) oldFont.remove();
  document.documentElement.style.setProperty('--chat-font', 'sans-serif');
});

// --- 미리보기 이미지로 저장 ---
saveImageBtn.addEventListener('click', () => {
  html2canvas(document.querySelector('.frame')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'chat-preview.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// --- 이벤트 연결 ---
sendBtn.addEventListener('click',sendMessage);
msg.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

clearBtn.onclick=()=>{
  messages=[];
  renderMessages();
};

showA.onchange=refreshAvatarVisibility;
showB.onchange=refreshAvatarVisibility;

function loadImg(input, cb) {
  const f = input.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    cb(r.result);
    renderMessages();
  };
  r.readAsDataURL(f);
  input.value = ''; // 같은 파일 재업로드 가능하도록 초기화
}

uploadA.onchange = () => loadImg(uploadA, src => imgA = src);
uploadB.onchange = () => loadImg(uploadB, src => imgB = src);

// --- 캐릭터 선택 ---
function setActive(a){
  active=a;
  selA.classList.toggle('active',a==='A');
  selB.classList.toggle('active',a==='B');
}
selA.addEventListener('click',()=>setActive('A'));
selB.addEventListener('click',()=>setActive('B'));
setActive('A');

// --- 초기화 ---
applyChatMargin();
applyBubbleColors();
renderMessages();

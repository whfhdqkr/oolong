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

const bubbleMaxWidth=document.getElementById('bubbleMaxWidth');

const editPanel=document.getElementById('editPanel');
const editBox=document.getElementById('editBox');
const applyEdit=document.getElementById('applyEdit');
const cancelEdit=document.getElementById('cancelEdit');
const deleteEdit=document.getElementById('deleteEdit');

const fontSizeInput = document.getElementById('fontSize');

const bgTypeRadios = document.querySelectorAll('input[name="bgType"]');
const bgUpload = document.getElementById('bgUpload');
const removeBg = document.getElementById('removeBg');
const colorBG = document.getElementById('colorBG');
const colorBGStart = document.getElementById('colorBGStart');
const colorBGEnd = document.getElementById('colorBGEnd');


const alphaA = document.getElementById('alphaA');
const alphaB = document.getElementById('alphaB');

const alignSide = document.getElementById('alignSide');
const alignCenter = document.getElementById('alignCenter');

const saveImageBtn = document.getElementById('saveImage');

const lineHeightInput = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');

const letterSpacing = document.getElementById('letterSpacing');
const letterSpacingValue = document.getElementById('letterSpacingValue');

const fontTypeRadios = document.querySelectorAll('input[name="fontType"]');
const selectedFont = document.getElementById('selectedFont');

const fontURLPath = document.getElementById('fontURLPath');
const fontURLFormat = document.getElementById('fontURLFormat');
const updateURLFont = document.getElementById('updateURLFont');

const fontUpload = document.getElementById('fontUpload');
//const resetFont = document.getElementById('resetFont');


let active='A';
let imgA='',imgB='';
let editingIndex=null; // 배열 기반 수정용 인덱스
let messages=[];       // 모든 메시지를 담는 배열

let uploadedBgImage = null;

// --- 옵션 토글 ---

// --- 프로필 표시 체크 시 업로드 영역 슬라이드 ---
const toggleProfile=document.getElementById('toggleProfile');
const profilePanel=toggleProfile.parentElement;
toggleProfile.addEventListener('click',()=>{
    profilePanel.classList.toggle('active');
    toggleProfileUpload();
});
function toggleProfileUpload() {
  const uploadAContainer = uploadA.parentElement; // Char 프로필 input div
  const uploadBContainer = uploadB.parentElement; // User 프로필 input div

  // Char
  if (showA.checked) {
    uploadAContainer.classList.add('active');
  } else {
    uploadAContainer.classList.remove('active');
  }

  // User
  if (showB.checked) {
    uploadBContainer.classList.add('active');
  } else {
    uploadBContainer.classList.remove('active');
  }
}
// 초기 상태 적용 + 이벤트 등록
showA.addEventListener('change', toggleProfileUpload);
showB.addEventListener('change', toggleProfileUpload);


// --- 컬러 옵션 영역 슬라이드 ---
const toggleColor=document.getElementById('toggleColor');
const colorPanel=toggleColor.parentElement;
toggleColor.addEventListener('click',()=> {
    colorPanel.classList.toggle('active');
    toggleBGOption();
});
function toggleBGOption() {
    const selectedType = document.querySelector('input[name="bgType"]:checked').value;
    
    const colorBGContainer = document.getElementById('bgColorUI'); // 단색 input div
    const colorStartBGContainer = document.getElementById('bgGradientUI'); // 그라디언트 input div
    const uploadBGContainer = document.getElementById('bgUploadUI'); // BG 이미지 input div
    
    if (selectedType === 'solid'){
      colorBGContainer.classList.add('active');
      uploadBGContainer.classList.remove('active');
      colorStartBGContainer.classList.remove('active');
        
        UpdateBGSolid();
    }
    else if (selectedType === 'gradient'){
      colorStartBGContainer.classList.add('active');
      colorBGContainer.classList.remove('active');
      uploadBGContainer.classList.remove('active');
        
        UpdateBGGradient();
    }
    else if (selectedType === 'image'){
      uploadBGContainer.classList.add('active');
      colorBGContainer.classList.remove('active');
      colorStartBGContainer.classList.remove('active');
        
        UpdateBGImage();
    }
    else{
        //예외처리
    }
}
// 초기 상태 적용 + 이벤트 등록
bgTypeRadios.forEach(radio => {
  radio.addEventListener('change', toggleBGOption);
});

// --- 뷰포트 영역 슬라이드 ---
const toggleView=document.getElementById('toggleView');
const veiwPanel=toggleView.parentElement;
toggleView.addEventListener('click',()=>veiwPanel.classList.toggle('active'));

// --- 폰트 옵션 영역 슬라이드 ---
const toggleFont = document.getElementById('toggleFont');
const fontPanel = toggleFont.parentElement;
toggleFont.addEventListener('click', () => {
    fontPanel.classList.toggle('active');
    toggleFontOption();
});
function toggleFontOption()
{
    const selectedType = document.querySelector('input[name="fontType"]:checked').value;
    
    const basicFontUIContainer = document.getElementById('basicFontUI'); // 단색 input div
    const urlFontUIContainer = document.getElementById('urlFontUI'); // 그라디언트 input div
    const uploadFontUIContainer = document.getElementById('uploadFontUI'); // BG 이미지 input div
    
    if (selectedType === 'basic'){
      basicFontUIContainer.classList.add('active');
      urlFontUIContainer.classList.remove('active');
      uploadFontUIContainer.classList.remove('active');
        
        UpdateBasicFont();
    }
    else if (selectedType === 'url'){
      urlFontUIContainer.classList.add('active');
      basicFontUIContainer.classList.remove('active');
      uploadFontUIContainer.classList.remove('active');
        
        UpdateUrlFont();
    }
    else if (selectedType === 'upload'){
      uploadFontUIContainer.classList.add('active');
      basicFontUIContainer.classList.remove('active');
      urlFontUIContainer.classList.remove('active');
        
        UpdateCustomFont();
    }
    else{
        //예외처리
    }
}
fontTypeRadios.forEach(radio => {
  radio.addEventListener('change', toggleFontOption);
});

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
    if(show){
      av.style.display='flex';
      if(img)
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
colorBasicA.oninput = renderMessages;
colorBasicB.oninput = renderMessages;
colorHighlightA.oninput = renderMessages;
colorHighlightB.oninput = renderMessages;
alignSide.addEventListener('change', renderMessages);
alignCenter.addEventListener('change', renderMessages);
// --- 아바타 표시 갱신 ---
function refreshAvatarVisibility(){
  renderMessages();
}
showA.onchange=refreshAvatarVisibility;
showB.onchange=refreshAvatarVisibility;

// --- 색상/마진/크기 등 실시간 반영 ---
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
colorA.oninput = applyBubbleColors;
colorB.oninput = applyBubbleColors;
alphaA.oninput = applyBubbleColors;
alphaB.oninput = applyBubbleColors;
function applyChatMargin(){
  const v=marginVertical.value||0;
  const h=marginHorizontal.value||0;
    document.documentElement.style.setProperty('--margin-top', `${v}px`);
    document.documentElement.style.setProperty('--margin-bottom', `${v}px`);
    document.documentElement.style.setProperty('--margin-left', `${h}px`);
    document.documentElement.style.setProperty('--margin-right', `${h}px`);
}
marginVertical.addEventListener('input',applyChatMargin);
marginHorizontal.addEventListener('input',applyChatMargin);
function applyBubbleWidth() {
    const maxW = bubbleMaxWidth.value||250;
    document.documentElement.style.setProperty('--bubble-max-width', `${maxW}px`);
}
bubbleMaxWidth.addEventListener('input',applyBubbleWidth);
function applyFontSize() {
  const size = fontSizeInput.value || 16;
  document.documentElement.style.setProperty('--bubble-font-size', `${size}px`);
}
fontSizeInput.addEventListener('input', applyFontSize);
function applyLineHeight() {
  const lh = lineHeightInput.value;
  document.documentElement.style.setProperty('--bubble-line-height', lh);
  lineHeightValue.textContent = lh;
}
lineHeightInput.addEventListener('input', applyLineHeight);
function applyLettertSpace() {
    const ls = letterSpacing.value;
    document.documentElement.style.setProperty('--bubble-letter-spacing', ls + 'px');
    letterSpacingValue.textContent = ls + 'px';
}
letterSpacing.addEventListener('input', applyLettertSpace);


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

deleteEdit.onclick=()=>{
    messages.splice(editingIndex,1);
    renderMessages();
    editingIndex=null;
    editPanel.classList.remove('active');
};

// --- 배경 설정 ---
function UpdateBGSolid(){
    chat.style.background = colorBG.value;
    chat.style.backgroundSize = '';
}
colorBG.oninput = UpdateBGSolid;

function UpdateBGGradient(){
    const start = colorBGStart.value;
    const end = colorBGEnd.value;
    chat.style.background = `linear-gradient(135deg, ${start}, ${end})`;
    chat.style.backgroundSize = '';
}
colorBGStart.oninput = UpdateBGGradient;
colorBGEnd.oninput = UpdateBGGradient;

function UpdateBGImage(){
    if(uploadedBgImage != null)
        chat.style.backgroundImage = `url('${uploadedBgImage}')`;
}

// --- 배경 이미지 업로드 / 제거 ---
bgUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
      uploadedBgImage = event.target.result;
      UpdateBGImage();
  };
  reader.readAsDataURL(file);
});

removeBg.addEventListener('click', () => {
  chat.style.backgroundImage = '';
});

// --- 폰트 설정 ---
function UpdateBasicFont()
{
    const fontName = document.querySelector("select[name=selectedFont] option:checked").value;
    document.documentElement.style.setProperty('--chat-font', fontName);
}
selectedFont.addEventListener('change', e =>{
    UpdateBasicFont();
});

function UpdateUrlFont()
{
    // 새로운 @font-face 생성
    const fontName = 'URLChatFont';
    const style = document.createElement('style');
    
    const url = fontURLPath.value;
    const format = fontURLFormat.value;
    
    style.id = 'urlFont';
    style.textContent = `
      @font-face {
        font-family: '${fontName}';
        src: url('${url}') format('${format}');
      }
    `;
    document.head.appendChild(style);

    // 적용
    document.documentElement.style.setProperty('--chat-font', `'${fontName}'`);
}
updateURLFont.addEventListener('click', e => {
    UpdateUrlFont();
});

function UpdateCustomFont()
{
    const oldFont = document.getElementById('customFont');
    if (oldFont) {
        document.documentElement.style.setProperty('--chat-font', 'CustomChatFont');
    }
}

fontUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    // 이전 커스텀 폰트 제거
    const oldFont = document.getElementById('customFont');
    if (oldFont) {
        oldFont.remove();
    }
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



// --- 미리보기 이미지로 저장 ---
saveImageBtn.addEventListener('click', () => {
  const frame = document.querySelector('.frame');

  html2canvas(frame, {
    scale: 2,          // 📍 해상도 2배로 (3으로 하면 더 선명)
    useCORS: true,     // 외부 이미지 있을 경우 깨짐 방지
    backgroundColor: null // 배경 투명하게 저장하려면
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `chat-preview_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// --- 이벤트 연결 ---
sendBtn.addEventListener('click',sendMessage);

clearBtn.onclick=()=>{
  messages=[];
  renderMessages();
};

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

// --- 첫 데이터 형성 ---
function SetDefaultMessages() {
    msg.value = '바이란은 고개를 까딱 기울인 채, 아무런 표정이 없는 매끄러운 얼굴로 은시호를 내려다볼 뿐이었다. 그의 광학 센서에서 새어 나오는 푸른빛이 어둠 속에서 유일한 광원처럼 번뜩였다. “길을 잘못 들었다…라. [SCAN LOG] 생체 반응: 심박 수 분당 120회 이상. 아드레날린 수치 급상승. 동공 확장. 전형적인 공포 반응이다만. 친구여, 여긴 누구나 길을 잃는 곳이지. 다만, 모두가 길을 다시 찾지는 못해.”';
    sendMessage();
    msg.value = '"저 그냥 지나갈게요..."';
    active = 'B';
    sendMessage();
    active = 'A';
}

// --- 초기화 ---
applyChatMargin();
applyBubbleColors();
applyBubbleWidth();
applyFontSize();
applyLineHeight();
applyLettertSpace();
setActive('A');
SetDefaultMessages();
renderMessages();


// =============================
// 옵션 저장/불러오기 기능
// =============================

// 현재 UI 상태를 JSON으로 추출
function getCurrentOptions() {
  return {
    profile: {
      showA: showA.checked,
      showB: showB.checked,
      imgA,
      imgB,
    },
    color: {
      colorA: colorA.value,
      colorB: colorB.value,
      alphaA: alphaA.value,
      alphaB: alphaB.value,
      basicA: colorBasicA.value,
      basicB: colorBasicB.value,
      highlightA: colorHighlightA.value,
      highlightB: colorHighlightB.value,
    },
    background: {
      type: document.querySelector('input[name="bgType"]:checked').value,
      colorBG: colorBG.value,
      colorBGStart: colorBGStart.value,
      colorBGEnd: colorBGEnd.value,
      uploadedBgImage,
    },
    layout: {
      align: alignCenter.checked ? "center" : "side",
      marginVertical: marginVertical.value,
      marginHorizontal: marginHorizontal.value,
      bubbleMaxWidth: bubbleMaxWidth.value,
    },
    font: {
      size: fontSizeInput.value,
      lineHeight: lineHeightInput.value,
      letterSpacing: letterSpacing.value,
        type: document.querySelector('input[name="fontType"]:checked').value,
        selectedFont: document.querySelector("select[name=selectedFont] option:checked").value,
        fontURLPath: fontURLPath.value,
        fontURLFormat: fontURLFormat.vale,
    },
  };
}

// JSON → UI에 반영
function applyOptions(json) {
  try {
    // profile
    showA.checked = json.profile.showA ?? true;
    showB.checked = json.profile.showB ?? true;
    imgA = json.profile.imgA || '';
    imgB = json.profile.imgB || '';

    // color
    colorA.value = json.color.colorA || '#fff3d6';
    colorB.value = json.color.colorB || '#eafcff';
    alphaA.value = json.color.alphaA || 1;
    alphaB.value = json.color.alphaB || 1;
    colorBasicA.value = json.color.basicA || '#000000';
    colorBasicB.value = json.color.basicB || '#000000';
    colorHighlightA.value = json.color.highlightA || '#ff4d4f';
    colorHighlightB.value = json.color.highlightB || '#4f7eff';

    // background
    document.querySelectorAll('input[name="bgType"]').forEach(r => {
      r.checked = (r.value === json.background.type);
    });
    colorBG.value = json.background.colorBG || '#f7f8fa';
    colorBGStart.value = json.background.colorBGStart || '#f7f8fa';
    colorBGEnd.value = json.background.colorBGEnd || '#ffffff';
    uploadedBgImage = json.background.uploadedBgImage || null;

    // layout
    if (json.layout.align === "center") alignCenter.checked = true;
    else alignSide.checked = true;
    marginVertical.value = json.layout.marginVertical || 50;
    marginHorizontal.value = json.layout.marginHorizontal || 50;
    bubbleMaxWidth.value = json.layout.bubbleMaxWidth || 350;

    // font
    fontSizeInput.value = json.font.size || 12;
    lineHeightInput.value = json.font.lineHeight || 1.4;
    letterSpacing.value = json.font.letterSpacing || 0;
      document.querySelectorAll('input[name="fontType"]').forEach(r => {
      r.checked = (r.value === json.font.type);
    });
      let sel = document.querySelector("select[name=selectedFont]").options;
            for (let i=0; i<sel.length; i++) {
            if (sel[i].value == json.font.selectedFont) {
                sel[i].selected = true;
            }
        }
      fontURLPath.value = json.font.fontURLPath;
      fontURLFormat.value = json.font.fontURLFormat;
      
    // UI 반영
    applyBubbleColors();
    toggleProfileUpload();
    toggleBGOption();
      toggleFontOption();
    renderMessages();
  } catch (err) {
    alert('옵션 적용 중 오류가 발생했습니다.');
    console.error(err);
  }
}

// JSON 파일로 내보내기
function saveOptionsToFile() {
  const data = JSON.stringify(getCurrentOptions(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `chat_options_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

// JSON 파일 불러오기
function loadOptionsFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
        const json = JSON.parse(e.target.result);
        applyOptions(json);
        alert('옵션이 성공적으로 불러와졌습니다.');
        applyChatMargin();
        applyBubbleColors();
        applyBubbleWidth();
        applyFontSize();
        applyLineHeight();
        applyLettertSpace();
        setActive('A');
        renderMessages();
    } catch (err) {
        alert('JSON 파일이 올바르지 않습니다.');
    }
  };
  reader.readAsText(file);
}

document.getElementById('saveOptions').addEventListener('click', saveOptionsToFile);
document.getElementById('loadOptions').addEventListener('change', loadOptionsFromFile);

const chat=document.getElementById('chat');
const bgImg=document.getElementById('bg-img');
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

const defaultFontTypeRadios = document.querySelectorAll('input[name="defaultFontType"]');
const selectedDefaultFont = document.getElementById('selectedDefaultFont');

const defaultFontURLPath = document.getElementById('defaultFontURLPath');
const defaultFontURLFormat = document.getElementById('defaultFontURLFormat');
const updateDefaultURLFont = document.getElementById('updateDefaultURLFont');
const defaultFontUpload = document.getElementById('defaultFontUpload');


const useHighlightFont = document.getElementById('useHighlightFont');
const highlightFontType = document.querySelectorAll('input[name="highlightFontType"]');
const selectedHighlightFont = document.getElementById('selectedHighlightFont');

const highlightFontURLPath = document.getElementById('highlightFontURLPath');
const highlightFontURLFormat = document.getElementById('highlightFontURLFormat');
const updateURLHighlightFont = document.getElementById('updateURLHighlightFont');
const highlightFontUpload = document.getElementById('highlightFontUpload');


let active='A';
let imgA='',imgB='';
let editingIndex=null; // 배열 기반 수정용 인덱스
let messages=[];       // 모든 통 메시지를 담는 배열
let highlightMsg=[];       //모든 형광펜 하이라이트를 담는 배열 {bubIdx, start, length}


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

// --- 기본 폰트 옵션 영역 슬라이드 ---
const toggleDefaultFont = document.getElementById('toggleDefaultFont');
const DefaultFontPanel = toggleDefaultFont.parentElement;
toggleDefaultFont.addEventListener('click', () => {
    DefaultFontPanel.classList.toggle('active');
    toggleDefaultFontOption();
});
function toggleDefaultFontOption()
{
    const selectedType = document.querySelector('input[name="defaultFontType"]:checked').value;
    
    const basicDefaultFontUIContainer = document.getElementById('basicDefaultFontUI'); // 단색 input div
    const urlDefaultFontUIContainer = document.getElementById('urlDefaultFontUI'); // 그라디언트 input div
    const uploadDefaultFontUIContainer = document.getElementById('uploadDefaultFontUI'); // BG 이미지 input div
    
    if (selectedType === 'basic'){
      basicDefaultFontUIContainer.classList.add('active');
      urlDefaultFontUIContainer.classList.remove('active');
      uploadDefaultFontUIContainer.classList.remove('active');

        UpdateDefaultBasicFont();
    }
    else if (selectedType === 'url'){
      urlDefaultFontUIContainer.classList.add('active');
      basicDefaultFontUIContainer.classList.remove('active');
      uploadDefaultFontUIContainer.classList.remove('active');
        
        UpdateUrlDefaultFont();
    }
    else if (selectedType === 'upload'){
      uploadDefaultFontUIContainer.classList.add('active');
      basicDefaultFontUIContainer.classList.remove('active');
      urlDefaultFontUIContainer.classList.remove('active');
        
        UpdateCustomDefaultFont();
    }
    else{
        //예외처리
    }
}
defaultFontTypeRadios.forEach(radio => {
  radio.addEventListener('change', toggleDefaultFontOption);
});

// --- 대사 폰트 옵션 영역 슬라이드 ---
const toggleHighlightFont = document.getElementById('toggleHighlightFont');
const highlightFontPanel = toggleHighlightFont.parentElement;
toggleHighlightFont.addEventListener('click', () => {
    highlightFontPanel.classList.toggle('active');
    toggleDefaultFontOption();
});
function toggleHighlightFontOption()
{
    const highlightFontUIContainer = document.getElementById('HighlightFontUI');
    
    if(useHighlightFont.checked){

        highlightFontUIContainer.classList.add('active');
        
        const selectedType = document.querySelector('input[name="highlightFontType"]:checked').value;
    
        const basicHighlightFontUIContainer = document.getElementById('highlightBasicFontUI'); // 단색 input div
        const urlHighlightFontUIContainer = document.getElementById('urlHighlightFontUI'); // 그라디언트 input div
        const uploadHighlightFontUIContainer = document.getElementById('uploadHighlightFontUI'); // BG 이미지 input div

        if (selectedType === 'basic'){
          basicHighlightFontUIContainer.classList.add('active');
          urlHighlightFontUIContainer.classList.remove('active');
          uploadHighlightFontUIContainer.classList.remove('active');

            UpdateHighlightBasicFont();
        }
        else if (selectedType === 'url'){
          urlHighlightFontUIContainer.classList.add('active');
          basicHighlightFontUIContainer.classList.remove('active');
          uploadHighlightFontUIContainer.classList.remove('active');

            UpdateUrlHighlightFont();
        }
        else if (selectedType === 'upload'){
          uploadHighlightFontUIContainer.classList.add('active');
          basicHighlightFontUIContainer.classList.remove('active');
          urlHighlightFontUIContainer.classList.remove('active');

            UpdateCustomHighlightFont();
        }
        else{
            //예외처리
        }
        
      } else {
        highlightFontUIContainer.classList.remove('active');
        renderMessages();
      }
}
useHighlightFont.addEventListener('change', toggleHighlightFontOption);
highlightFontType.forEach(radio => {
  radio.addEventListener('change', toggleHighlightFontOption);
});

// --- 형광펜 영역 슬라이드 ---
const toggleHighlightTool=document.getElementById('toggleHighlightTool');
const highlightToolPanel=toggleHighlightTool.parentElement;
toggleHighlightTool.addEventListener('click',()=>highlightToolPanel.classList.toggle('active'));

// --- 유틸 ---
function escapeHTML(s){
  return s.replace(/[&<>"']/g,c=>(
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
  ));
}

function addHighlight(index, startOffset, length) {

}

// 따옴표 하이라이트 포함 HTML 생성
function processTextForDisplay(text, sender,index) {
  
    let dialogues=[];
    const quotePairs = {
        '"': '"',
        '“': '”',
        '”': '”',
        '「': '」',
        '」': '」',
        '『': '』',
        '』': '』'
      };

      let stack = null;
      let buffer = '';

    const tokens = text.split(/("|“|”|「|」|『|』)/g);
    var i = 0;
      for (const token of tokens) {
          //alert(`[1] token : ${token}`);
        if (quotePairs[token]) {
            //alert(`[2-1] quotePairs[token] : ${quotePairs[token]}`);
          // 여는 따옴표
          if (!stack) {
            stack = token;
            buffer = token;
              //alert(`[3-1] 여는 따옴표 stack, buffer : ${token}`);
          } else if (quotePairs[stack] === token) {
            // 닫는 따옴표
            buffer += token;
              //alert(`[3-2] 버블 : ${messages.length - 1}, 닫는 따옴표 buffer : ${buffer}, startOffset : ${text.indexOf(buffer)}`);
              dialogues.push({bubID:index, diaIdx:i, startOffset:text.indexOf(buffer), length: buffer.length});
              i++;
            buffer = '';
            stack = null;
          } else {
            // 다른 종류 따옴표 → 그냥 붙이기
            buffer += token;
              //alert(`[3-3] 중첩 buffer : ${buffer}`);
          }
        } else if (stack) {
          buffer += token;
            //alert(`[2-2] buffer : ${buffer}`);
        }
      }
    
  const color = (sender === 'A' ? colorHighlightA.value : colorHighlightB.value);

  // HTML 이스케이프
    //let html = escapeHTML(text);

  // --- 모든 종류의 따옴표 쌍("…", “…”, 「…」, 『…』 등)을 잡기 위한 정규식 ---
  // “문장” 또는 "문장" 등 다양한 따옴표 패턴을 지원
    //const patterns = [
    //  { open: '&quot;', close: '&quot;' },
    //  { open: '“', close: '”' },
    //  { open: '「', close: '」' },
    //  { open: '『', close: '』' }
    //];
    //
    
    let fontName = null;
    
    if (useHighlightFont.checked) {
        const selectedType = document.querySelector('input[name="highlightFontType"]:checked').value;

        if (selectedType === 'basic') {
            fontName = document.querySelector("select[name=selectedHighlightFont] option:checked").value;
        }
        else if (selectedType === 'url') {
            fontName = 'URLChatHightFont';
        }
        else if (selectedType === 'upload') {
            fontName = 'CustomChatHighlightFont';
        }
    }
    //
    //for (const { open, close } of patterns) {
    //  const regex = new RegExp(`${open}([^${open}${close}]+?)${close}`, 'g');
    //  html = html.replace(regex, `<span style="color:${color};font-family: ${fontName}">${open}$1${close}</span>`);
    //}
    
    
    const sortedMarks = highlightMsg.sort((a,b) => {return a.bubIdx - b.bubIdx; }).sort((c,d) => {return c.startOffset - d.startOffset;});
    
    let newHTML = '';
    var processingPoint = 0;
    var highlightIdx = -1;
    if(sortedMarks.length > 0) highlightIdx = 0;
    var dialogueIdx = -1;
    if(dialogues.length > 0) dialogueIdx = 0;

    
    if(highlightIdx >= 0 && highlightIdx < sortedMarks.length) {
        //하이라이트 존재
        outer: while(highlightIdx < sortedMarks.length) {
            if(sortedMarks[highlightIdx].bubIdx != index){
                //버블 인덱스 다르면 건너뜀
                highlightIdx++;
                continue;
            }
            //alert(`[outer] bubble = ${index}\nsortedMarks[${highlightIdx}] = ${sortedMarks[highlightIdx].startOffset}`);

            if(dialogueIdx >= 0 && dialogueIdx < dialogues.length) {
                //대사도 존재

                inner: while(dialogueIdx < dialogues.length) {
                    if(dialogues[dialogueIdx].bubID != index){
                        //버블 인덱스 다르면 건너뜀
                        dialogueIdx++;
                        continue inner;
                    }
                    //alert(`[inner] bubble = ${index}\nsortedMarks[${highlightIdx}] = ${sortedMarks[highlightIdx].startOffset}\ndialogues[${dialogueIdx}] = ${dialogues[dialogueIdx].startOffset}`);

                    if(sortedMarks[highlightIdx].startOffset <= dialogues[dialogueIdx].startOffset){
                        //형광펜이 먼저 시작
                        if(processingPoint < sortedMarks[highlightIdx].startOffset) {
                            //먼저 processingPoint 처리
                            newHTML += text.substring(processingPoint , sortedMarks[highlightIdx].startOffset);
                            processingPoint = sortedMarks[highlightIdx].startOffset;
                            //alert(`[case 5]span 처리 안해도 되는 지문\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                        }
                        if(sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length <= dialogues[dialogueIdx].startOffset) {
                            //형광펜이 다음 대사보다 먼저 끝남
                            //형광펜 처리
                            newHTML += `<span class="highlighted-text">${text.substring(processingPoint , sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length)}</span>`;
                            processingPoint = sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length;
                            //alert(`[case1]형광펜이 다음 대사보다 먼저 시작, 다음 대사 시작점보다 먼저 혹은 동시에 끝남\n하이라이트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이라이트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                            highlightIdx++;
                            continue outer;
                        }
                        else {
                            //형광펜이 다음 대사 시작보다 뒤에 끝남
                            //형광펜 일부 처리
                            newHTML += `<span style="highlighted-text">${text.substring(processingPoint , dialogues[dialogueIdx].startOffset)}</span>`;
                            processingPoint = dialogues[dialogueIdx].startOffset;
                            
                            if(sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length > dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length) {
                                //형광펜이 대사 끝보다 나중에 끝남
                                //형광펜 + 대사 부분 처리 (대사 전체 처리)
                                newHTML += `<span class="highlighted-text" style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length)}</span>`;
                                processingPoint = dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length;
                                //alert(`[case2-1]형광펜이 다음 대사보다 먼저 시작, 다음 대사 시작점을 넘겨서 끝남, 다음 대사 끝보다 나중에 끝남\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n하이하리트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이하리트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                                
                                dialogueIdx++;
                                continue inner;
                            }
                            else {
                                //형광펜이 대사 끝보다 먼저 끝남
                                //형광펜 + 대사 부분 처리 (대사 일부분만 처리)
                                newHTML += `<span class="highlighted-text" style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length)}</span>`;
                                processingPoint = sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length;
                                //alert(`[case2-2]형광펜이 다음 대사보다 먼저 시작, 다음 대사 시작점을 넘겨서 끝남, 다음 대사 끝보다 먼저 끝남\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n하이하리트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이하리트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                                
                                highlightIdx++;
                                continue outer;
                            }
                        }
                    }
                    
                    if(sortedMarks[highlightIdx].startOffset > dialogues[dialogueIdx].startOffset) {
                        //대사가 먼저 시작
                        if(processingPoint < dialogues[dialogueIdx].startOffset) {
                            //먼저 processingPoint 처리
                            newHTML += text.substring(processingPoint , dialogues[dialogueIdx].startOffset);
                            processingPoint = dialogues[dialogueIdx].startOffset;
                            //alert(`[case 6]span 처리 안해도 되는 지문\n\n${newHTML}\nprocessingPoint = ${processingPoint}`);
                        }
                        if(dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length <= sortedMarks[highlightIdx].startOffset) {
                            //대사가 다음 형광펜보다 먼저 끝남
                            //대사 처리
                            newHTML += `<span style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length)}</span>`;
                            processingPoint = dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length;
                            //alert(`[case3]대사가 다음 형광펜보다 먼저 시작, 다음 형광펜 시작점보다 먼저 혹은 동시에 끝남\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n하이하리트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                            dialogueIdx++;
                            continue inner;
                        }
                        else {
                            //대사가 다음 형관펜 시작보다 뒤에 끝남
                            //대사 앞부분 처리
                            newHTML += `<span style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , sortedMarks[highlightIdx].startOffset)}</span>`;
                            processingPoint = sortedMarks[highlightIdx].startOffset;
                            
                            
                            if(sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length < dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length) {
                                //대사가 형광펜 끝보다 나중에 끝남
                                //대사+형광펜 부분 처리 (형광펜 전부 처리)
                                newHTML += `<span class="highlighted-text" style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length)}</span>`;
                                processingPoint = sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length;
                                //alert(`[case4-1]대사가 다음 형광펜보다 먼저 시작, 다음 형광펜 시작점보다 먼저 끝남, 다음 형광펜 끝보다 나중에 끝남\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n하이하리트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이하리트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                                
                                highlightIdx++;
                                continue outer;
                            }
                            else {
                                //대사+형광펜 부분 처리 (형광펜 일부만 처리됨)
                                newHTML += `<span class="highlighted-text" style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length)}</span>`;
                                processingPoint = dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length;
                                //alert(`[case4-2]대사가 다음 형광펜보다 먼저 시작, 다음 형광펜 시작점보다 먼저 끝남, 다음 형광펜 끝보다 먼저 끝남\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n하이하리트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이하리트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                                
                                dialogueIdx++;
                                continue inner;
                            }
                        }
                    }

                    //동시에 시작
                    //alert(`[case 7] 대사, 하이라이트 동시에 시작`);
                }
            }
            else {
                //하이라이트만 존재
                //alert(`[just highlight] bubble = ${index}\nsortedMarks[${highlightIdx}] = ${sortedMarks[highlightIdx].startOffset}\nprocessingPoint = ${processingPoint}`);
                if(processingPoint < sortedMarks[highlightIdx].startOffset) {
                    //먼저 processingPoint 처리
                    newHTML += text.substring(processingPoint , sortedMarks[highlightIdx].startOffset);
                    processingPoint = sortedMarks[highlightIdx].startOffset;
                    //alert(`[case 10]span 처리 안해도 되는 지문\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                }
                newHTML += `<span class="highlighted-text">${text.substring(processingPoint , sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length)}</span>`;
                processingPoint = sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length;
                //alert(`[case11]형광펜만 처리\n하이라이트 시작 지점 = ${sortedMarks[highlightIdx].startOffset}\n하이라이트 끝나는 지점 = ${sortedMarks[highlightIdx].startOffset + sortedMarks[highlightIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
                highlightIdx++;
                //continue outer;
            }
        }
    }
    
    if(dialogueIdx >= 0 && dialogueIdx < dialogues.length) {
        //대사만 존재
        while(dialogueIdx < dialogues.length) {
            if(dialogues[dialogueIdx].bubID != index){
                //버블 인덱스 다르면 건너뜀
                dialogueIdx++;
                continue;
            }
            
            //alert(`[just dialogues] bubble = ${index}\ndialogues[${dialogueIdx}] = ${dialogues[dialogueIdx].startOffset}\nprocessingPoint = ${processingPoint}`);
            
            if(processingPoint < dialogues[dialogueIdx].startOffset) {
                //먼저 processingPoint 처리
                newHTML += text.substring(processingPoint , dialogues[dialogueIdx].startOffset);
                processingPoint = dialogues[dialogueIdx].startOffset;
                //alert(`[case 8] span 처리 안해도 되는 지문\n\n${newHTML}\nprocessingPoint = ${processingPoint}`);
            }
            
            newHTML += `<span style="color:${color};font-family: ${fontName}">${text.substring(processingPoint , dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length)}</span>`;
            processingPoint = dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length;
            //alert(`[case 9]대사만 처리\n대사 시작 지점 = ${dialogues[dialogueIdx].startOffset}\n대사 끝나는 지점 = ${dialogues[dialogueIdx].startOffset + dialogues[dialogueIdx].length}\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
            dialogueIdx++;
        }
    }
    
    if(processingPoint < text.length) {
        newHTML += text.substring(processingPoint , text.length);
        processingPoint = text.length;
            //alert(`[case 10]나머지 지문 처리\n\n${newHTML}\n\nprocessingPoint = ${processingPoint}`);
    }
    
    html = newHTML.replace(/\n/g, '<br>');
    //html = newHTML.replace(/\n/g, '\u200B<br>\u200B');
    
    return html;
    
    
    //alert(`highlightMsg[0] index : ${bufferHighlightMark.bubIdx}, start : ${bufferHighlightMark.startOffset}, lenght : ${bufferHighlightMark.length}`);
    
    
    //const quotePairs = {
    //    '&quot;': '&quot;',
    //    '“': '”',
    //    '”': '”',
    //    '「': '」',
    //    '」': '」',
    //    '『': '』',
    //    '』': '』'
    //  };
//
    //  let result = '';
    //  let stack = null;
    //  let buffer = '';
//
    //  const tokens = html.split(/(&quot;|“|”|「|」|『|』)/g);
//
    //  for (const token of tokens) {
    //      //alert(`[1] token : ${token}`);
    //    if (quotePairs[token]) {
    //        //alert(`[2-1] quotePairs[token] : ${quotePairs[token]}`);
    //      // 여는 따옴표
    //      if (!stack) {
    //        stack = token;
    //        buffer = token;
    //          //alert(`[3-1] 여는 따옴표 stack, buffer : ${token}`);
    //      } else if (quotePairs[stack] === token) {
    //        // 닫는 따옴표
    //        buffer += token;
    //          //alert(`[3-2] 닫는 따옴표 buffer : ${buffer}`);
    //        result += `<span style="color:${color};font-family: ${fontName}">${buffer}</span>`;
    //        buffer = '';
    //        stack = null;
    //          
    //      } else {
    //        // 다른 종류 따옴표 → 그냥 붙이기
    //        buffer += token;
    //          //alert(`[3-3] 중첩 buffer : ${buffer}`);
    //      }
    //    } else if (stack) {
    //      buffer += token;
    //        //alert(`[2-2] buffer : ${buffer}`);
    //    } else {
    //      result += token;
    //        //alert(`[2-3] buffer : ${buffer}`);
    //    }
    //  }
    //  if (buffer) result += buffer;
    //
    //  html = result.replace(/\n/g, '<br>');
    //  return html;
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
    bub.innerHTML=processTextForDisplay(m.text,m.sender,m.index);
      bub.id = 'bubble'+i.toString();
      //alert(`[!] bub.id : ${bub.id}, inner : ${bub.innerHTML}`);

    bub.onclick=()=>openEditPanel(m.index);

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
    var tmpIndex = 0;
    if(messages.length > 0)
        tmpIndex = messages[messages.length-1].index+1;
  messages.push({index:tmpIndex,sender:active,text});
    
    
  msg.value='';
  renderMessages();
}

//let selectionMsgIndex = -1;
// --- 메시지 수정 ---
function openEditPanel(index){
  selectionMsgIndex = index;
  editingIndex=index;
    var idx = messages.findIndex(m => {return m.index == index;});
    if(idx >= 0)
        editBox.value=messages[idx].text;
    else
        editBox.value='error : can not find bubble';
  //editBox.value=messages[index].text;
  editPanel.classList.add('active');
}

applyEdit.onclick=()=>{
  if(editingIndex===null) return;
    var idx = messages.findIndex(m => {return m.index == editingIndex;});
    if(idx >= 0)
        messages[idx].text=editBox.value;
    else
        editBox.value='error : can not find bubble';
  //messages[editingIndex].text=editBox.value;
  editPanel.classList.remove('active');
  editingIndex=null;
  renderMessages();
};

cancelEdit.onclick=()=>{
  selectionMsgIndex = -1;
  editingIndex=null;
  editPanel.classList.remove('active');
};

deleteEdit.onclick=()=>{
    //var msgIdx = messages.findIndex(m => {return m.index == editingIndex;});
    //if(msgIdx < 0) {
    //    alert('error: can not find bubble');
    //}
    //messages.splice(msgIdx,1);
    
    messages = messages.filter(m => {return m.index != editingIndex;});
    highlightMsg = highlightMsg.filter(h => {return h.bubIdx != editingIndex;});
    
    //highlightMsg.forEach((h,i) => {
    //   if(h.bubIdx == editingIndex)
    //       highlightMsg.splice(i,1);
    //});
    
    renderMessages();
  selectionMsgIndex = -1;
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
    if(uploadedBgImage != null) {
        chat.style.backgroundImage = `url('${uploadedBgImage}')`;
        //bgImg.src = uploadedBgImage;
        //chat.innerHTML = `<img src="${uploadedBgImage}">`;
        chat.style.backgroundSize = "cover";
        chat.style.backgroundPosition = "center";
    }
        
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

// --- 기본 폰트 설정 ---
function UpdateDefaultBasicFont()
{
    const fontName = document.querySelector("select[name=selectedDefaultFont] option:checked").value;
    document.documentElement.style.setProperty('--chat-font', fontName);
}
selectedDefaultFont.addEventListener('change', e =>{
    UpdateDefaultBasicFont();
});
function UpdateUrlDefaultFont()
{
    // 새로운 @font-face 생성
    const fontName = 'URLChatFont';
    const style = document.createElement('style');
    
    const url = defaultFontURLPath.value;
    const format = defaultFontURLFormat.value;
    
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
updateDefaultURLFont.addEventListener('click', e => {
    UpdateUrlDefaultFont();
});
function UpdateCustomDefaultFont()
{
    const oldFont = document.getElementById('customDefaultFont');
    if (oldFont) {
        document.documentElement.style.setProperty('--chat-font', 'CustomChatFont');
    }
}
defaultFontUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    // 이전 커스텀 폰트 제거
    const oldFont = document.getElementById('customDefaultFont');
    if (oldFont) {
        oldFont.remove();
    }
    // 새로운 @font-face 생성
      const fontName = 'CustomChatDefaultFont';
    const style = document.createElement('style');
      style.id = 'customDefaultFont';
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

// --- 대사 폰트 설정 ---
function UpdateHighlightBasicFont() {
    //const fontName = document.querySelector("select[name=selectedHighlightFont] option:checked").value;
    //document.documentElement.style.setProperty('--chat-font', fontName);
    renderMessages();
}
selectedHighlightFont.addEventListener('change', e => {
    UpdateHighlightBasicFont();
});

function UpdateUrlHighlightFont() {
    // 새로운 @font-face 생성
    const fontName = 'URLChatHightFont';
    const style = document.createElement('style');

    const url = highlightFontURLPath.value;
    const format = highlightFontURLFormat.value;

    style.id = 'urlFont';
    style.textContent = `
      @font-face {
        font-family: '${fontName}';
        src: url('${url}') format('${format}');
      }
    `;
    document.head.appendChild(style);

    // 적용
    //document.documentElement.style.setProperty('--chat-font', `'${fontName}'`);
    renderMessages();
}
updateURLHighlightFont.addEventListener('click', e => {
    UpdateUrlHighlightFont();
});

function UpdateCustomHighlightFont() {
    const oldFont = document.getElementById('customHighlightFont');
    if (oldFont) {
        //document.documentElement.style.setProperty('--chat-font', 'CustomChatFont');
        renderMessages();
    }
}

highlightFontUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        // 이전 커스텀 폰트 제거
        const oldFont = document.getElementById('customHighlightFont');
        if (oldFont) {
            oldFont.remove();
        }
        // 새로운 @font-face 생성
        const fontName = 'CustomChatHighlightFont';
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
        //document.documentElement.style.setProperty('--chat-font', `'${fontName}'`);
        renderMessages();
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // 같은 파일 재업로드 가능
});

// --- 형광펜 기능 ---
const highlightColorInput = document.getElementById('highlightColor');
const applyHighlightBtn = document.getElementById('applyHighlight');
const removeHighlightBtn = document.getElementById('removeHighlight');

// 선택 영역을 형광펜으로 감싸기
applyHighlightBtn.addEventListener('click', () => {
  const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    let str = range.toString();

    selection.collapseToStart();
    var idx = messages.findIndex(m => {return m.index == editingIndex;});
    if(idx < 0) {
        alert('error : can not find bubble');
        return;
    }
    //const start = messages[editingIndex].text.indexOf(selection.anchorNode.nodeValue) + range.startOffset;
    const start = messages[idx].text.indexOf(selection.anchorNode.nodeValue) + range.startOffset;
    //alert(`bubIndex :${editingIndex} ,앵커노트 : ${selection.anchorNode.nodeValue}, range : ${str}, start : ${start}, lenght ${str.length}`);
    
    //const msg = editingIndex + ',' + range.startOffset + ',' + str.length;
    highlightMsg.push({bubIdx: editingIndex, startOffset: start, length: str.length});

  renderMessages();
  
  selection.removeAllRanges();
});

// 형광펜 제거
removeHighlightBtn.addEventListener('click', () => {
    highlightMsg = [];
    renderMessages();
});

function applyHilightColors() {
  // 투명도 적용 (hex → rgba)
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const aColor = hexToRgba(highlightColorInput.value, 1);

  document.documentElement.style.setProperty('--highlight-bg', aColor);
}
highlightColorInput.oninput = applyHilightColors;


// --- 미리보기 이미지로 저장 ---
saveImageBtn.addEventListener('click', () => {
  const frame = document.querySelector('.frame');

  //html2canvas(frame, {
  //  scale: 2,          // 해상도 2배로 (3으로 하면 더 선명)
  //  useCORS: true,     // 외부 이미지 있을 경우 깨짐 방지
  //  letterRendering: true,  // 글자 누락 방지
  //  backgroundColor: null, // 배경 투명하게 저장하려면
  //  foreignObjectRendering: false, // false로 해야 inline clipping 완화
  //  allowTaint: true
  //}).then(canvas => {
  //  const link = document.createElement('a');
  //  link.download = `chat-preview_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
  //  link.href = canvas.toDataURL('image/png');
  //  link.click();
  //});
    

    domtoimage.toPng(frame, {
        quality: 1,              // (JPEG용) PNG에서는 무시됨
        //scale: 2,                // 해상도 2배
        bgcolor: 'transparent',  // 투명 배경
        //style: {
        //    transform: 'scale(2)',
        //    transformOrigin: 'top left',
        //},
        //width: frame.scrollWidth * 2,  // 캔버스 크기를 2배로 맞춤
        //height: frame.scrollHeight * 2
                     
    })
  .then((dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `chat-preview_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
    link.click();
  })
  .catch(console.error);
    
});

// --- 이벤트 연결 ---
sendBtn.addEventListener('click',sendMessage);

clearBtn.onclick=()=>{
  messages=[];
    highlightMsg=[];
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
    //msg.value = '“대사1:가나다라마바사아자차카타파하”지문1:거너더러머버서어저처커터퍼허"대사2:고노도로모보소오조초코토포호"지문2:구누두루무부수우주추쿠투푸후';
    msg.value = '바이란은 고개를 까딱 기울인 채, 아무런 표정이 없는 매끄러운 얼굴로 은시호를 내려다볼 뿐이었다. 그의 광학 센서에서 새어 나오는 푸른빛이 어둠 속에서 유일한 광원처럼 번뜩였다. “길을 잘못 들었다…라. [SCAN LOG] 생체 반응: 심박 수 분당 120회 이상. 아드레날린 수치 급상승. 동공 확장. 전형적인 공포 반응이다만. 친구여, 여긴 누구나 길을 잃는 곳이지. 다만, 모두가 길을 다시 찾지는 못해.”';
    //sendMessage();
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
        type: document.querySelector('input[name="defaultFontType"]:checked').value,
        selectedFont: document.querySelector("select[name=selectedDefaultFont] option:checked").value,
        fontURLPath: defaultFontURLPath.value,
        fontURLFormat: defaultFontURLFormat.vale,
      },
      highlightFont: {
          useHighlightFont: useHighlightFont.checked,
          highlightFontType: document.querySelector('input[name="highlightFontType"]:checked').value,
          selectedHighlightFont: document.querySelector("select[name=selectedHighlightFont] option:checked").value,
          highlightFontURLPath: highlightFontURLPath.value,
          highlightFontURLFormat: highlightFontURLFormat.vale,
      }
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
      let sel1 = document.querySelector("select[name=selectedDefaultFont]").options;
            for (let i=0; i<sel1.length; i++) {
                if (sel1[i].value == json.font.selectedFont) {
                sel1[i].selected = true;
            }
        }
      defaultFontURLPath.value = json.font.fontURLPath;
      defaultFontURLFormat.value = json.font.fontURLFormat;

      // highlight font
      useHighlightFont.checked = json.highlightFont.useHighlightFont ?? true;
      document.querySelectorAll('input[name="highlightFontType"]').forEach(r => {
          r.checked = (r.value === json.highlightFont.highlightFontType);
      });
      let sel2 = document.querySelector("select[name=selectedHighlightFont]").options;
      for (let i = 0; i < sel2.length; i++) {
          if (sel2[i].value == json.highlightFont.selectedHighlightFont) {
              sel2[i].selected = true;
          }
      }
      highlightFontURLPath.value = json.highlightFont.highlightFontURLPath;
      highlightFontURLFormat.value = json.highlightFont.highlightFontURLFormat;

  } catch (err) {
    alert('옵션 적용 중 오류가 발생했습니다.');
    console.error(err);
    }

    // UI 반영
    applyBubbleColors();
    toggleProfileUpload();
    toggleBGOption();
    toggleDefaultFontOption();
    toggleHighlightFontOption();
    renderMessages();
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

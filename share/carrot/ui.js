// templete functions
// do not modify the function name!!

function renderOutput(data){
    const txt = data.trim();

    try {
        const newJson = JSON.parse(txt);
        
        renderPost(newJson);
        renderChat(newJson);

    } catch (err) {
        //alert("JSON 파싱 오류: " + err.message);
    }
}

function coustomInit() {
    const wishBtn = document.getElementById('wishBtn');

    wishBtn.addEventListener('click', () => {
        wishBtn.classList.toggle('fa-regular');
        wishBtn.classList.toggle('fa-solid');
        wishBtn.classList.toggle('active');
    });

}

// custom functions
function getMannerTempDetails(temp) {
    const t = parseFloat(temp);
    if (t < 30) return { color: "#1561a9", icon: "fa-face-frown" };          // 낮은 온도 (파란색)
    if (t < 36.5) return { color: "#319e45", icon: "fa-face-smile" };        // 보통 (녹색)
    if (t < 40) return { color: "#ffb900", icon: "fa-face-smile" };          // 좋음 (노란색)
    if (t < 50) return { color: "#ff8a3d", icon: "fa-face-laugh-squint" };   // 매우 좋음 (주황색)
    return { color: "#ed4444", icon: "fa-face-laugh-beam" };                 // 최고 (빨간색)
}

function renderPost(json) {
    const p = json.post;
    const container = document.getElementById('postContainer');

    //이미지
    container.querySelector('.image-slider span').textContent = p.image;
    
    // 프로필 정보
    container.querySelector('.nickname').textContent = p.name;
    container.querySelector('.avatar span').textContent = p.profile;
    container.querySelector('.location').textContent = p.location;
    
    // 매너온도
    container.querySelector('.temp-num').textContent = `${p.temp}°C`;
    container.querySelector('.temp-fill').style.width = `${p.temp}%`;
    
    // 매너온도 관련 요소 선택
    const tempNumEl = container.querySelector('.temp-num');
    const tempFillEl = container.querySelector('.temp-fill');
    const tempIconEl = container.querySelector('.temp-text i');
    const tempTextContainer = container.querySelector('.temp-text');

    // 온도 정보 가져오기
    const tempDetails = getMannerTempDetails(p.temp.replace('°C',''));

    // 값 및 게이지 업데이트
    tempNumEl.textContent = `${p.temp.replace(/°|C|c|℃/g, '')}°C`;
    tempFillEl.style.width = `${p.temp.replace(/°|C|c|℃/g, '')}%`;

    // 색상 적용
    tempNumEl.style.color = tempDetails.color;
    tempFillEl.style.background = tempDetails.color;

    // 아이콘 변경 (기존 클래스 제거 후 새 클래스 추가)
    tempIconEl.className = `fa-regular ${tempDetails.icon}`;
    tempIconEl.style.color = tempDetails.color;

    // 본문 정보
    container.querySelector('.post-title').textContent = p.title;
    container.querySelector('.post-category').textContent = `${p.category} ∙ ${p.time}`;
    
    container.querySelector('.price').textContent = p.price;
    container.querySelector('.post-body').textContent = p.text;
    
    // 통계 정보 (채팅 n ∙ 관심 n ∙ 조회 n)
    container.querySelector('.post-stats').textContent = 
        `채팅 ${p.chat} ∙ 관심 ${p.inter} ∙ 조회 ${p.hits}`;
    
}
function renderChat(json) {
    const chatMessages = document.querySelector('.chat-messages');
    // 기존 메시지 삭제 (하단 스크롤 버튼 제외)
    const scrollBtn = chatMessages.querySelector('.scroll-down-btn');
    chatMessages.innerHTML = '';
    if(scrollBtn) chatMessages.appendChild(scrollBtn);

    let lastRow = null;
    let lastTime = null;
    let lastIsSeller = null;

    json.chat.forEach((msg) => {
        // 병합 조건: 화자가 같고 시간이 같을 때
        const shouldMerge = lastRow && 
                            lastIsSeller === msg.isSeller && 
                            lastTime === msg.time;

        if (shouldMerge) {
            // 1. 기존 시간 요소 제거 (마지막에만 붙이기 위해)
            const contentDiv = lastRow.querySelector('.message-content');
            const oldTime = contentDiv.querySelector('.time');
            if (oldTime) oldTime.remove();

            // 2. 새 버블 추가
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.textContent = msg.text;
            contentDiv.appendChild(bubble);

            // 3. 시간 다시 추가 (가장 아래로)
            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            timeSpan.textContent = msg.time;
            contentDiv.appendChild(timeSpan);

        } else {
            // 새 메시지 줄 생성
            const row = document.createElement('div');
            // 판매자(true)면 other, 구매자(false)면 me
            const isMe = msg.isSeller === false || msg.isSeller === "false";
            row.className = `message-row ${isMe ? 'me' : 'other'}`;

            let htmlContent = '';
            
            // 상대방(판매자)일 경우 아바타 추가
            if (!isMe) {
                htmlContent += `
                    <div class="avatar">
                        <span>${json.post.profile}</span>
                    </div>`;
            }

            htmlContent += `
                <div class="message-content">
                    <div class="bubble">${msg.text}</div>
                    <span class="time">${msg.time}</span>
                </div>`;
            
            row.innerHTML = htmlContent;
            chatMessages.insertBefore(row, scrollBtn);

            // 상태 업데이트
            lastRow = row;
            lastTime = msg.time;
            lastIsSeller = msg.isSeller;
        }
    });

    // 채팅방 상단 이름 업데이트
    document.querySelector('.chat-username').textContent = json.post.name;
}
// templete functions
// Caution: Do not modify the function name!!

function renderOutput(data) {
    const renderArea = document.getElementById('renderArea');
    const templateSelect = document.getElementById('templateSelect');
    if (!templateSelect) return;
    
    const templateType = templateSelect.value;
    
    if (!data) return;

    try {
        const jsonData = JSON.parse(data);
        const { setting, chat } = jsonData;

        // 1. 헤더 생성부 (기존과 동일)
        let headerHtml = `<div class="chat-header-base">`;
        if (templateType === 'kakao') {
            headerHtml += `<div class="left"><i class="fas fa-chevron-left"></i> <span style="margin-left:10px">${setting.name}</span></div>
                           <div class="right"><i class="fas fa-search"></i><i class="fas fa-bars" style="margin-left:15px"></i></div>`;
        } else if (templateType === 'line') {
            headerHtml += `<div><i class="fas fa-chevron-left"></i></div><div style="font-weight:bold">${setting.name}</div>
                           <div><i class="fas fa-search"></i><i class="fas fa-bars" style="margin-left:15px"></i></div>`;
        } else if (templateType === 'insta') {
            headerHtml += `<div class="left"><i class="fas fa-arrow-left"></i> <span style="margin-left:15px; font-weight:bold">${setting.name}</span></div>
                           <div class="right"><i class="fas fa-phone"></i><i class="fas fa-video" style="margin-left:15px"></i></div>`;
        } else if (templateType === 'iphone') {
            headerHtml += `<div style="color:#007aff; align-self:flex-start;"><i class="fas fa-chevron-left"></i></div>
                           <div style="font-size:12px; margin-top:-15px;">${setting.profile}</div>
                           <div style="font-size:11px; font-weight:bold">${setting.name} <i class="fas fa-chevron-right" style="font-size:8px"></i></div>`;
        } else if (templateType === 'galaxy') {
            headerHtml += `<div><i class="fas fa-arrow-left"></i></div><div style="font-size:1.1rem">${setting.name}</div>
                           <div><i class="fas fa-search"></i><i class="fas fa-ellipsis-v" style="margin-left:15px"></i></div>`;
        }
        headerHtml += `</div>`;

        // 2. 대화창 생성부 (개선된 로직)
        let chatHtml = `<div class="chat-body"><div class="chat-date-separator">${setting.date}</div>`;
        
        chat.forEach((msg, index) => {
            const prevMsg = chat[index - 1];
            const nextMsg = chat[index + 1];

            const isMe = msg.sender === 'user';
            const isPicture = msg.picture && msg.picture.trim() !== "";
            
            // 판별 조건
            const isSameAsPrev = prevMsg && prevMsg.sender === msg.sender && prevMsg.time === msg.time;
            const isSameAsNext = nextMsg && nextMsg.sender === msg.sender && nextMsg.time === msg.time;

            // 1) 프로필/이름 노출: 이전 메시지와 발신자가 다를 때만 (카톡, 라인 한정)
            const canShowProfile = (templateType === 'kakao' || templateType === 'line');
            const showProfile = !isMe && !isSameAsPrev && canShowProfile;

            // 2) 시간 노출: 다음 메시지와 시간/발신자가 다를 때만 (마지막 메시지에만 표시)
            const showTime = !isSameAsNext;

            // 3) 꼬리 노출: 이전 메시지와 시간/발신자가 같으면 꼬리 제거 클래스 추가
            const tailClass = isSameAsPrev ? 'no-tail' : '';
            const bubbleClass = isPicture ? 'picture-bubble' : `bubble ${tailClass}`;
            const displayContent = isPicture ? msg.picture : msg.content;

            chatHtml += `
                <div class="message-row ${isMe ? 'me' : 'other'} ${isSameAsPrev ? 'continuous' : ''}">
                    ${showProfile ? `<div class="profile-area">${setting.profile}</div>` : 
                      (!isMe && canShowProfile ? `<div class="profile-area" style="visibility:hidden"></div>` : '')}
                    <div class="bubble-group">
                        ${showProfile ? `<div class="sender-name">${setting.name}</div>` : ''}
                        <div style="display:flex; align-items:flex-end; ${isMe ? 'flex-direction:row-reverse' : ''}">
                            <div class="${bubbleClass}">${displayContent}</div>
                            ${showTime ? `<span class="message-time">${msg.time}</span>` : ''}
                        </div>
                    </div>
                </div>`;
        });
        chatHtml += `</div>`;

        // 3. 푸터 생성부 (기존과 동일)
        let footerHtml = `<div class="chat-footer-base">`;
        if (templateType === 'kakao') {
            footerHtml += `<i class="fas fa-plus"></i><div class="input-mock">메시지 입력<i class="far fa-smile"></i></div><span style="font-weight:bold">#</span>`;
        } else if (templateType === 'line') {
            footerHtml += `<i class="fas fa-plus"></i><i class="fas fa-camera"></i><i class="far fa-image"></i><div class="input-mock">메시지 입력</div><i class="far fa-smile"></i>`;
        } else if (templateType === 'insta') {
            footerHtml += `<i class="fas fa-camera" style="color:#0095f6"></i><div class="input-mock">메시지 입력...</div><i class="fas fa-microphone"></i><i class="far fa-image"></i><i class="far fa-sticky-note"></i>`;
        } else if (templateType === 'iphone') {
            footerHtml += `<i class="fas fa-camera" style="color:#8e8e93"></i><i class="fab fa-app-store-ios" style="color:#8e8e93"></i><div class="input-mock">iMessage</div><i class="fas fa-microphone" style="color:#8e8e93"></i>`;
        } else if (templateType === 'galaxy') {
            footerHtml += `<i class="fas fa-plus-circle"></i><i class="far fa-image"></i><i class="fas fa-camera"></i><div class="input-mock">메시지 입력</div><i class="far fa-paper-plane"></i>`;
        }
        footerHtml += `</div>`;

        renderArea.innerHTML = `<div id="contentContainer" class="theme-${templateType}">${headerHtml}${chatHtml}${footerHtml}</div>`;

    } catch (e) {
        renderArea.innerHTML = '<div style="color:red; padding:20px; text-align:center;">⚠️ JSON 형식을 확인해주세요.</div>';
    }
}

// 템플릿 선택 변경 시 즉시 반영
document.getElementById('templateSelect').addEventListener('change', () => {
    const data = document.getElementById('inputText').value;
    renderOutput(data);
});


// custom functions
// Define the custom function required for render

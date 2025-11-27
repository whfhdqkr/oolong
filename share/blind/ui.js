const input = document.getElementById("inputText");
const toast = document.getElementById("toast");

const postContentArea = document.getElementById('postContentArea');
const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentInput');
const mainContent = document.getElementById('mainContent');

// --- Render Post Content ---
function renderPost(data) {
    const post = data.post || {};
    
    const views = post.views || 0;
    const likes = post.likes || 0;
    const commentCount = post.comment_count || 0;
    
    postContentArea.innerHTML = `
        <div class="post-category">${post.category || '미분류'}</div>
        <h1 class="post-title">${post.title || '제목 없음'}</h1>
                
        <div class="author-info">
            <!-- 아바타 아이콘 추가 -->
            <div class="info-text">
                <span class="company">${post.company || '회사 정보 없음'} · ${post.author_nickname || '익명'}</span>
                <span class="meta-data">
                    <i class="fa-regular fa-clock"></i> ${post.time || 'N/A'} · 조회 ${views.toLocaleString()}
                </span>
            </div>            
        </div>

        <div class="post-body-text">${post.content || '내용 없음'}</div>

        <div class="post-stats">
            <div class="stat-item" id="postLikeBtn" onclick="toggleLike(this)">
                <i class="fa-regular fa-thumbs-up"></i>
                <span>좋아요 ${likes.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <i class="fa-regular fa-comment"></i>
                <span>댓글 ${commentCount}</span>
            </div>
        </div>
    `;
}

// --- Render Comments ---
function renderComments(data) {
    commentList.innerHTML = ''; 

    if (!data) {
        console.error("renderComments: Data object is null or undefined.");
        return;
    }

    const post = data.post || {};
    const comments = Array.isArray(data.comments) ? data.comments : [];
    
    if (comments.length === 0) {
        return;
    }

    const authorNickname = post.author_nickname;
    
    // ID를 기준으로 댓글을 쉽게 찾기 위한 맵 생성 (comments가 배열임을 보장하므로 안전)
    const commentMap = comments.reduce((map, comment) => {
        // comment 객체와 id가 유효한 경우에만 맵에 추가
        if (comment && comment.id !== undefined) {
             map[comment.id] = comment;
        }
        return map;
    }, {});


    const allCommentIds = comments.map(c => c.id);
    
    // replies 배열에 포함되지 않은 댓글만 부모 댓글로 간주
    const parentCommentIds = allCommentIds.filter(id => {
        return !comments.some(c => c.replies && Array.isArray(c.replies) && c.replies.includes(id));
    });

    // 최종 렌더링 순서 결정 (부모 댓글 + 바로 아래 대댓글)
    const renderedComments = [];

        parentCommentIds.forEach(id => {
        const parent = commentMap[id];
        if (parent) {
            // 1. 부모 댓글을 먼저 추가 (push를 사용하여 시간순서 유지)
            renderedComments.push(parent); 
            
            // 2. 대댓글을 바로 뒤에 추가
            (Array.isArray(parent.replies) ? parent.replies : []).forEach(replyId => {
                const reply = commentMap[replyId];
                if (reply) {
                    renderedComments.push(reply);
                }
            });
        }
    });

    // 최종 렌더링
    renderedComments.forEach(comment => {
        const commentLikes = comment.likes || 0;

        const isReply = comments.some(p => p.replies && Array.isArray(p.replies) && p.replies.includes(comment.id));
        const isAuthor = comment.nickname === authorNickname;

        // 대댓글 스타일 조정
        const itemClass = isReply ? 'comment-item reply-item' : 'comment-item';
        const avatarStyle = isReply ? `width:26px; height:26px; font-size:12px;` : `width:30px; height:30px; font-size:14px;`;
        const authorBadge = isAuthor ? ' <span class="is-author">작성자</span>' : '';
        const replyArrow = isReply ? `<div class="reply-arrow"><i class="fa-solid fa-share fa-flip-vertical"></i></div>` : '';
        const replyAction = isReply ? '' : `<div class="action-btn" onclick="focusInput('@${comment.nickname}')"><i class="fa-regular fa-comment-dots"></i> 대댓글 쓰기</div>`;

        const li = document.createElement('li');
        li.className = itemClass;
        li.setAttribute('data-comment-id', comment.id);
        li.innerHTML = `
            ${replyArrow}
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-company">${comment.company || '회사 정보 없음'} · ${comment.nickname || '익명'}${authorBadge}</span>
                </div>
                <div class="comment-body">${comment.content || '내용 없음'}</div>
                <div class="comment-footer">
                    <span>${comment.time || 'N/A'}</span>
                    <div class="action-btn" onclick="toggleLike(this, 'comment')">
                        <i class="fa-regular fa-thumbs-up"></i> 
                        <span class="like-count">${commentLikes.toLocaleString()}</span>
                    </div>
                    ${replyAction}
                </div>
            </div>
        `;
        commentList.appendChild(li);
    });
}

// -- save image --
document.getElementById("saveBtn").addEventListener("click", async () => {
  //const node = document.getElementById("app-container");

    const frame = document.getElementById('app-container');
    
    await new Promise(r => requestAnimationFrame(() =>
        requestAnimationFrame(r)
      ));

    html2canvas(frame, {
        backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "capture.png";
      a.click();
    });
});

// --- Event Handlers ---

// show toast
function showToastMsg(msg) {
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

    toast.textContent = msg;
    toast.classList.add("show");
}

// ooc buttons
document.getElementById("oocBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText(ooc);

    showToastMsg("ooc가 복사되었습니다.");
});
document.getElementById("oocBtnChar").addEventListener("click", async () => {
    await navigator.clipboard.writeText(oocChar);

    showToastMsg("ooc가 복사되었습니다.");
});
document.getElementById("oocBtnUser").addEventListener("click", async () => {
    await navigator.clipboard.writeText(oocUser);

    showToastMsg("ooc가 복사되었습니다.");
});

document.getElementById('clearBtn').addEventListener("click", () => {
    input.value = '';
    postContentArea.innerHTML = '';
    commentList.innerHTML = ''; 
    showToastMsg("json이 초기화되었습니다.");
});

document.getElementById("launchBtn").addEventListener("click", () => {
    const txt = input.value.trim();

    if (!txt) {
        alert("JSON을 입력하세요.");
        return;
    }

    try {
        const newJson = JSON.parse(txt);
        
        renderPost(newJson);
        renderComments(newJson);

    } catch (err) {
        alert("JSON 파싱 오류: " + err.message);
    }
});

window.toggleLike = function(element) {
    const icon = element.querySelector('i');
    const countSpan = element.querySelector('span');
    let currentLikes = parseInt(countSpan.innerText.replace(/[^\d]/g, ''));
            
    if (icon.classList.contains('fa-regular')) {
        // Like
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        element.classList.add('active');
        currentLikes++;
    } else {
        // Unlike
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        element.classList.remove('active');
        currentLikes--;
    }

    // Update display text (for post: '좋아요 N', for comment: just 'N')
    if (element.id === 'postLikeBtn') {
         countSpan.innerText = `좋아요 ${currentLikes.toLocaleString()}`;
    } else {
         countSpan.innerText = currentLikes.toLocaleString();
    }
}

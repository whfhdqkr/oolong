const jsonScreen = document.getElementById("jsonScreen");
const tarotScreen = document.getElementById("tarotScreen");

const jsonInput = document.getElementById("jsonInput");

const saveModalBtn = document.getElementById("saveModalBtn");



// show toast
function showToastMsg(msg) {
    const toast = document.getElementById("toast");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

    toast.textContent = msg;
    toast.classList.add("show");
}

// ooc button
document.getElementById("oocBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText(ooc);

    showToastMsg("ooc가 복사되었습니다.");

});

document.getElementById('clearBtn').addEventListener("click", () => {
    jsonInput.value = '';
    showToastMsg("json이 초기화되었습니다.");
});

// luanch button
document.getElementById("launchBtn").addEventListener("click", () => {
    //const txt = document.getElementById('jsonInput').value.trim();
    const txt = jsonInput.value.trim();

    if (!txt) {
        alert("JSON을 입력하세요.");
        return;
    }

    try {
        modal.style.display = 'none';
        
        const newJson = JSON.parse(txt);
        
        // **새로 추가된 유효성 검사 로직**
        //const validationError = validateTarotJson(newJson);
        //if (validationError) {
        //    alert("JSON 형식 오류: " + validationError);
        //    return;
        //}
        
        cardData = newJson;
        
        //reset cards
        document.querySelectorAll('.card-container').forEach(container => {
            container.classList.remove("flipped");
        });
        
        //screen change
        jsonScreen.style.display = "none";
        tarotScreen.style.display = "flex";
        
        ["char", "user", "relationship"].forEach(key => {
            const data = cardData[key];
            //const theme = data.theme;
            const num = romanToNumber(data.number);
            const isReverse = data.direction.includes("down");

            const cardInfo = cardAInfo.find(c => c.num === num);
            const front = document.querySelector(`.card-container[data-card="${key}"] .card-front`);

            front.style.backgroundImage = `url("cards/${num}.jpg")`;
            front.style.backgroundSize = "cover";
            front.style.backgroundPosition = "center";
            
            document.documentElement.style.setProperty(`--theme-${key}`, data.theme);

            // 카드 앞면 자체 회전 (역방향이면 뒤집기)
            front.style.transform = isReverse ? "rotateY(180deg) rotate(180deg)" : "rotateY(180deg) rotate(0)";
        });

    } catch (err) {
        alert("JSON 파싱 오류: " + err.message);
        tarotScreen.style.display = "none";
        jsonScreen.style.display = "block";
    }
});

// bakc button
document.getElementById("backBtn").addEventListener("click", () => {
    tarotScreen.style.display = "none";
    jsonScreen.style.display = "block";
});

const modal = document.getElementById('tarotModal');
const closeBtn = document.getElementById('close-button');

// card click
document.querySelectorAll('.card-container').forEach(container => {
    container.addEventListener('click', function() {
        //document.querySelector('.modal-wrapper').scrollTo(0.0);
        
        const cardType = this.dataset.card;
        const data = cardData[cardType];

        const isFlipped = this.classList.contains('flipped');
        
        // card flip
        if (!isFlipped) {
            this.classList.add('flipped');
        }
        
        const delay = isFlipped ? 0 : 900;

        // update modal
        setTimeout(() => {
            //const modalImg = document.getElementById("modal-card-img");
            const cardImg = document.querySelector('.card-img');
            const num = romanToNumber(data.number);
            const isReverse = data.direction.includes("down");
            const cardInfo = cardAInfo.find(c => c.num == num);
            const theme = data.theme || "#8a8a8a";
            
            let title = cardType == "relationship" ? "관계 카드" : (data.name + "의 카드");
            
            document.documentElement.style.setProperty('--theme-select', theme);
            
            
            const bubbleChar = document.getElementById('char-comment');
            const bubbleUser = document.getElementById('user-comment');

            bubbleChar.style.borderColor = cardData.char.theme;
            bubbleUser.style.borderColor = cardData.user.theme;
            
            cardImg.style.backgroundImage = `url("cards/${num}.jpg")`;
            cardImg.style.transform = isReverse ? "rotate(180deg)" : "rotate(0deg)";

            //modalImg.src = `cards/${num}.jpg`;
            //modalImg.style.transform = isReverse ? "rotate(180deg)" : "rotate(0deg)";
            
            document.getElementById('modalTitle').textContent = title;

            document.querySelector('#modal-card-info .card-number').textContent = cardInfo?.numRom ?? "";
            document.querySelector('#modal-card-info .card-name').textContent = cardInfo?.name ?? "";
            document.querySelector('#modal-card-info .card-direction').textContent = isReverse ? "역방향" : "정방향";
            document.querySelector('#modal-card-info .card-keyword').textContent = isReverse ? cardInfo?.reverseKey ?? "" : cardInfo?.forwardKey ?? "";

            document.getElementById('modal-interpretation').textContent = data.interpretation;
            document.getElementById('char-comment').textContent = data.comment;
            document.getElementById('user-comment').textContent = data.userComment;
            
            const themeRGB = hexToRgb(theme);
            const black = { r: 0, g: 0, b: 0 };
            const contrastBlack = contrastRatio(themeRGB, black);
            
            if(contrastBlack < 4.5) {
                //alert(contrastBlack);
                document.querySelector('#modal-card-info .card-number').style.background = "#ffffff";
                document.querySelector('#modal-card-info .card-name').style.background = "#ffffff";
            }
            else {
                document.querySelector('#modal-card-info .card-number').style.background = "none";
                document.querySelector('#modal-card-info .card-name').style.background = "none";
            }

            modal.style.display = 'flex';
        //}, this.classList.contains('flipped') ? 0 : 400);
        }, delay);
    });
});

// close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

//modal save
saveModalBtn.addEventListener('click', async () => {
    const frame = document.querySelector('.modal-content');
    
    await new Promise(r => requestAnimationFrame(() =>
        requestAnimationFrame(r)
      ));
    
    try {
        const dataUrl = await domtoimage.toPng(frame, {
            quality: 1,
            bgcolor: 'transparent',

            //width: frame.offsetWidth * 2,
            //height: frame.offsetHeight * 2,
//
            //style: {
            //    transform: 'scale(2)',
            //    transformOrigin: 'top left'
            //}
        });

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `tarot_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;

        a.click();

        await new Promise(res => setTimeout(res, 200));


    } catch (e) {
        console.error(e);
    }

});

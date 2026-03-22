// ==============================
// DOM refs
// ==============================
const jsonScreen   = document.getElementById("jsonScreen");
const tarotScreen  = document.getElementById("tarotScreen");
const jsonInput    = document.getElementById("jsonInput");
const saveModalBtn = document.getElementById("saveModalBtn");
const modal        = document.getElementById('tarotModal');
const closeBtn     = document.getElementById('close-button');

// ==============================
// Toast
// ==============================
function showToastMsg(msg) {
    const toast = document.getElementById("toast");
    setTimeout(() => toast.classList.remove("show"), 2500);
    toast.textContent = msg;
    toast.classList.add("show");
}

// ==============================
// 캐릭터 이름 동기화
// ==============================
function updateCharNames() {
    charNames.a = document.getElementById("charNameA").value.trim() || "NPC";
    charNames.b = document.getElementById("charNameB").value.trim() || "PC";
    // 프리셋 칩 레이블 갱신
    renderSpreadSelector();
    // OOC + 질문 갱신
    resetOocUserEdited();
    refreshPresetQuestion();
    refreshOocTextarea();
}
document.getElementById("charNameA").addEventListener("input", updateCharNames);
document.getElementById("charNameB").addEventListener("input", updateCharNames);

// ==============================
// 현재 슬롯 목록 반환
// ==============================
function getCurrentSlots() {
    if (currentSpread.id === "custom") return [...customSlotList];
    return currentSpread.slots.map(s => applyCharNames(s));
}

function getCurrentKeys() {
    if (currentSpread.id === "custom") {
        return customSlotList.map((_, i) => `slot${i+1}`);
    }
    return currentSpread.keys;
}

function getCurrentQuestion() {
    if (currentSpread.id === "custom") {
        return document.getElementById("customQuestion")?.value || "";
    }
    return document.getElementById("presetQuestion")?.value || applyCharNames(currentSpread.defaultQuestion || "");
}

// ==============================
// 78장 드롭다운
// ==============================
function buildCardOptions() {
    const opts = [{ value: "", label: "── 카드 선택 ──" }];
    opts.push({ value: "__group__", label: "── 메이저 아르카나 (22장) ──", disabled: true });
    cardAInfo.forEach(c => opts.push({ value: String(c.num), label: `${c.numRom}  ${c.name}` }));
    SUITS.forEach(suit => {
        opts.push({ value: "__group__", label: `── ${suit.symbol} ${suit.label} (14장) ──`, disabled: true });
        RANKS.forEach((rank, rankIdx) => {
            opts.push({ value: `${suit.key}:${rankIdx}`, label: `${rank.numRom}  ${rank.name} of ${suit.label}` });
        });
    });
    return opts;
}
const CARD_OPTIONS = buildCardOptions();

function buildSelectEl(id, currentVal) {
    const sel = document.createElement("select");
    sel.id = id;
    CARD_OPTIONS.forEach(opt => {
        const el = document.createElement("option");
        el.value = opt.value;
        el.textContent = opt.label;
        if (opt.disabled || opt.value === "__group__") el.disabled = true;
        if (opt.value === currentVal) el.selected = true;
        sel.appendChild(el);
    });
    return sel;
}

// ==============================
// 테마 프리셋
// ==============================
const THEME_PRESETS = [
    "#ffffff","#111111","#c0392b","#e67e22",
    "#f1c40f","#27ae60","#2980b9","#8e44ad",
    "#1abc9c","#e91e8c","#607d8b","#795548"
];

// ==============================
// 카드 칩 미리보기
// ==============================
function updateCardChip(panelEl, cardValue) {
    const chip  = panelEl.querySelector('.card-chip-preview');
    if (!chip) return;
    const imgEl  = chip.querySelector('.chip-img');
    const nameEl = chip.querySelector('.chip-name');
    const keyEl  = chip.querySelector('.chip-key');
    if (!cardValue) { imgEl.style.backgroundImage=""; nameEl.textContent="선택 없음"; keyEl.textContent=""; return; }
    const info = getCardInfo(cardValue);
    const path = getCardImgPath(cardValue);
    imgEl.style.backgroundImage = path ? `url("${path}")` : "";
    if (info) {
        nameEl.textContent = `${info.numRom} ${info.name}`;
        keyEl.textContent  = info.suitLabel ? `${info.suitSymbol} ${info.suitLabel}` : "메이저 아르카나";
    } else { nameEl.textContent = cardValue; keyEl.textContent = ""; }
}

// ==============================
// 카드 폼 패널 빌드 (접기 없음)
// ==============================
function buildCardFormPanel(slotIndex, slotLabel, key, existingData) {
    const d = existingData || {};
    const panel = document.createElement("div");
    panel.className = "card-form-panel";
    panel.dataset.key  = key;
    panel.dataset.slot = slotIndex;

    const cardVal = d.number !== undefined ? String(d.number) : "";
    const isDown  = String(d.direction || "up").toLowerCase().includes("down");

    panel.innerHTML = `
      <div class="card-form-header-flat">
        <span class="card-form-header-index">${slotIndex + 1}</span>
        <span class="card-form-header-slot">${slotLabel}</span>
      </div>
      <div class="card-form-body">
        <div class="form-row">
          <label>🃏 카드</label>
          <div class="card-select-wrap" id="wrap-select-${key}"></div>
        </div>
        <div class="card-chip-preview">
          <div class="chip-img"></div>
          <div><div class="chip-name">선택 없음</div><div class="chip-key"></div></div>
        </div>
        <div class="form-row">
          <label>↕️ 방향</label>
          <div class="direction-toggle">
            <button type="button" class="dir-btn ${!isDown?"active-up":""}" data-dir="up">🔼 정방향</button>
            <button type="button" class="dir-btn ${isDown?"active-down":""}" data-dir="down">🔽 역방향</button>
          </div>
        </div>
        <div class="form-row">
          <label>🎨 테마 컬러</label>
          <div class="theme-row">
            <input type="color" id="color-picker-${key}" value="${d.theme||"#888888"}" />
            <input type="text"  id="color-text-${key}"   value="${d.theme||"#888888"}" placeholder="#rrggbb" maxlength="7" />
          </div>
          <div class="theme-presets" id="theme-presets-${key}"></div>
        </div>
        <div class="form-row">
          <label>📖 해석</label>
          <textarea id="interp-${key}" placeholder="이 카드의 해석...">${d.interpretation||""}</textarea>
        </div>
        <div class="form-row-inline">
          <div class="form-row">
            <label>💬 ${charNames.a} 코멘트</label>
            <textarea id="comment-${key}" placeholder="${charNames.a} 코멘트...">${d.comment||""}</textarea>
          </div>
          <div class="form-row">
            <label>💬 ${charNames.b} 코멘트</label>
            <textarea id="userComment-${key}" placeholder="${charNames.b} 코멘트...">${d.userComment||""}</textarea>
          </div>
        </div>
      </div>`;

    // inject select
    const selectWrap = panel.querySelector(`#wrap-select-${key}`);
    const selEl = buildSelectEl(`card-select-${key}`, cardVal);
    selectWrap.appendChild(selEl);
    selEl.addEventListener("change", () => { updateCardChip(panel, selEl.value); syncJsonFromForms(); });
    updateCardChip(panel, cardVal);

    // 방향 버튼
    panel.querySelectorAll('.dir-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            panel.querySelectorAll('.dir-btn').forEach(b => b.classList.remove("active-up","active-down"));
            btn.classList.add(btn.dataset.dir==="up"?"active-up":"active-down");
            syncJsonFromForms();
        });
    });

    // 컬러
    const colorPicker = panel.querySelector(`#color-picker-${key}`);
    const colorText   = panel.querySelector(`#color-text-${key}`);
    colorPicker.addEventListener("input", () => { colorText.value=colorPicker.value; syncJsonFromForms(); });
    colorText.addEventListener("input", () => {
        const v = colorText.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(v)) colorPicker.value = v;
        syncJsonFromForms();
    });

    const presetsWrap = panel.querySelector(`#theme-presets-${key}`);
    THEME_PRESETS.forEach(hex => {
        const dot = document.createElement("div");
        dot.className="theme-dot"; dot.style.background=hex; dot.title=hex;
        dot.addEventListener("click", () => { colorPicker.value=hex; colorText.value=hex; syncJsonFromForms(); });
        presetsWrap.appendChild(dot);
    });

    ["interp","comment","userComment"].forEach(prefix => {
        const el = panel.querySelector(`#${prefix}-${key}`);
        if (el) el.addEventListener("input", syncJsonFromForms);
    });

    return panel;
}

// ==============================
// Read form data
// ==============================
function readFormData(key, slotLabel) {
    const panel = document.querySelector(`.card-form-panel[data-key="${key}"]`);
    if (!panel) return null;
    const selEl  = panel.querySelector(`#card-select-${key}`);
    const dirBtn = panel.querySelector('.dir-btn.active-up, .dir-btn.active-down');
    const colorT = panel.querySelector(`#color-text-${key}`);
    const interp = panel.querySelector(`#interp-${key}`);
    const comm   = panel.querySelector(`#comment-${key}`);
    const userC  = panel.querySelector(`#userComment-${key}`);
    const cardValue = selEl?.value || "";
    const info = getCardInfo(cardValue);
    return {
        label:          slotLabel,
        name:           info ? (info.suitLabel ? `${info.numRom} ${info.name}` : info.name) : "",
        number:         cardValue,
        theme:          colorT?.value || "#888888",
        direction:      dirBtn?.dataset.dir || "up",
        interpretation: interp?.value || "",
        comment:        comm?.value   || "",
        userComment:    userC?.value  || ""
    };
}

// ==============================
// Sync Forms → JSON
// ==============================
function syncJsonFromForms() {
    const keys  = getCurrentKeys();
    const slots = getCurrentSlots();
    const obj   = {};
    keys.forEach((key, i) => { obj[key] = readFormData(key, slots[i] || key); });
    jsonInput.value = JSON.stringify(obj, null, 2);
}

// ==============================
// Sync JSON → Forms
// ==============================
function syncFormsFromJson(jsonStr) {
    try {
        const obj  = JSON.parse(jsonStr);
        const keys = getCurrentKeys();
        let matched = false;
        keys.forEach(key => { if (obj[key]) { fillFormFromData(key, obj[key]); matched = true; } });
        if (!matched) {
            const objKeys = Object.keys(obj);
            keys.forEach((key, i) => { if (obj[objKeys[i]]) fillFormFromData(key, obj[objKeys[i]]); });
        }
        showToastMsg("폼에 적용되었습니다.");
    } catch(e) { showToastMsg("JSON 파싱 오류: " + e.message); }
}

function fillFormFromData(key, data) {
    const panel = document.querySelector(`.card-form-panel[data-key="${key}"]`);
    if (!panel) return;
    const selEl  = panel.querySelector(`#card-select-${key}`);
    const colorP = panel.querySelector(`#color-picker-${key}`);
    const colorT = panel.querySelector(`#color-text-${key}`);
    const interp = panel.querySelector(`#interp-${key}`);
    const comm   = panel.querySelector(`#comment-${key}`);
    const userC  = panel.querySelector(`#userComment-${key}`);
    const numStr = data.number !== undefined ? String(data.number) : "";
    if (selEl && numStr) {
        const opt = Array.from(selEl.options).find(o => o.value === numStr);
        if (opt) { selEl.value = numStr; updateCardChip(panel, numStr); }
    }
    const isDown = String(data.direction||"up").toLowerCase().includes("down");
    panel.querySelectorAll('.dir-btn').forEach(btn => {
        btn.classList.remove("active-up","active-down");
        if (btn.dataset.dir==="up"  && !isDown) btn.classList.add("active-up");
        if (btn.dataset.dir==="down"&&  isDown) btn.classList.add("active-down");
    });
    if (data.theme) { const h=data.theme.startsWith("#")?data.theme:"#"+data.theme; if(colorP)colorP.value=h; if(colorT)colorT.value=h; }
    if (interp) interp.value = data.interpretation || "";
    if (comm)   comm.value   = data.comment        || "";
    if (userC)  userC.value  = data.userComment    || "";
}

// ==============================
// Render card forms
// ==============================
function renderCardForms(existingData) {
    const container = document.getElementById("cardForms");
    container.innerHTML = "";
    const keys  = getCurrentKeys();
    const slots = getCurrentSlots();
    keys.forEach((key, i) => {
        container.appendChild(buildCardFormPanel(i, slots[i] || key, key, existingData?.[key]));
    });
    syncJsonFromForms();
}

// ==============================
// 카드 테이블 동적 렌더 (타로 배치)
// ==============================
function renderTarotTable(keys, slots) {
    const table = document.getElementById("tarotTable");
    table.innerHTML = "";
    const n = keys.length;

    // 배치 레이아웃 결정
    // 1: 단일 / 2: 나란히 / 3: 삼각 or 가로 / 4: 다이아 / 5: 십자 / 6~7: 2행 / 8~10: 3행
    table.className = `tarot-table layout-${n}`;

    keys.forEach((key, i) => {
        const wrap = document.createElement("div");
        wrap.className = "card-slot-wrap";
        wrap.dataset.slot = i;

        const label = document.createElement("div");
        label.className = "slot-label";
        label.textContent = applyCharNames(slots[i] || key);

        const container = document.createElement("div");
        container.className = "card-container";
        container.dataset.cardIndex = i;
        container.dataset.cardKey   = key;
        container.innerHTML = `<div class="card"><div class="card-face card-back"></div><div class="card-face card-front"></div></div>`;

        // 클릭 이벤트
        container.addEventListener('click', onCardClick);

        wrap.appendChild(label);
        wrap.appendChild(container);
        table.appendChild(wrap);
    });
}

// ==============================
// OOC helpers
// ==============================
function resetOocUserEdited() {
    const ta = document.getElementById("oocTextarea");
    if (ta) ta.dataset.userEdited = "";
}

function refreshOocTextarea() {
    const ta = document.getElementById("oocTextarea");
    if (!ta || ta.dataset.userEdited) return;
    const slots    = getCurrentSlots();
    const question = getCurrentQuestion();
    ta.value = buildOoc(currentSpread, slots, question);
    updateOocLen();
}

function updateOocLen() {
    const ta    = document.getElementById("oocTextarea");
    const lenEl = document.getElementById("oocLen");
    if (!ta || !lenEl) return;
    const len = ta.value.length;
    lenEl.textContent = `${len} / 700`;
    lenEl.classList.toggle("over", len > 700);
}

// ==============================
// 프리셋 질문 표시
// ==============================
function refreshPresetQuestion() {
    const area  = document.getElementById("presetQuestionArea");
    const input = document.getElementById("presetQuestion");
    if (currentSpread.id === "custom") {
        area.style.display = "none";
        return;
    }
    area.style.display = "";
    // 스프레드 바뀌었을 때만 기본값으로 리셋
    if (input.dataset.spread !== currentSpread.id) {
        input.value = applyCharNames(currentSpread.defaultQuestion || "");
        input.dataset.spread = currentSpread.id;
    } else {
        // 이름만 바뀐 경우: 이미 적용된 이름을 새 이름으로 교체
        input.value = applyCharNames(currentSpread.defaultQuestion || "");
    }
}

document.getElementById("presetQuestion").addEventListener("input", () => {
    resetOocUserEdited();
    refreshOocTextarea();
});

// ==============================
// Spread Selector
// ==============================
function renderSpreadSelector() {
    const container = document.getElementById("spreadSelector");
    container.innerHTML = "";
    SPREAD_PRESETS.forEach(preset => {
        const chip = document.createElement("button");
        chip.className = "spread-chip" + (preset.id === currentSpread.id ? " active" : "");
        // 칩 레이블에 이름 반영
        chip.textContent = applyCharNames(preset.label);
        chip.addEventListener("click", () => {
            currentSpread = preset;
            if (preset.id === "custom") {
                customSlotList = ["슬롯 1", "슬롯 2", "슬롯 3"];
            }
            renderSpreadSelector();
            updateAreaVisibility();
            refreshPresetQuestion();
            renderCardForms();
            resetOocUserEdited();
            refreshOocTextarea();
        });
        container.appendChild(chip);
    });
}

function updateAreaVisibility() {
    document.getElementById("customArea").style.display        = currentSpread.id==="custom" ? "" : "none";
    document.getElementById("presetQuestionArea").style.display = currentSpread.id==="custom" ? "none" : "";
}

// ==============================
// Custom 슬롯 관리
// ==============================
function renderCustomSlots() {
    const list = document.getElementById("customSlotList");
    list.innerHTML = "";
    customSlotList.forEach((s, i) => {
        const row = document.createElement("div");
        row.className = "custom-slot-row";
        row.innerHTML = `<label>슬롯 ${i+1}</label><input type="text" value="${s}" placeholder="슬롯 이름" maxlength="20" />`;
        row.querySelector("input").addEventListener("input", e => {
            customSlotList[i] = e.target.value;
            renderCardForms();
            resetOocUserEdited();
            refreshOocTextarea();
        });
        list.appendChild(row);
    });
    document.getElementById("removeSlotBtn").disabled = customSlotList.length <= 1;
    document.getElementById("addSlotBtn").disabled    = customSlotList.length >= 10;
}

document.getElementById("addSlotBtn").addEventListener("click", () => {
    if (customSlotList.length >= 10) return;
    customSlotList.push(`슬롯 ${customSlotList.length+1}`);
    renderCustomSlots();
    renderCardForms();
    resetOocUserEdited();
    refreshOocTextarea();
});

document.getElementById("removeSlotBtn").addEventListener("click", () => {
    if (customSlotList.length <= 1) return;
    customSlotList.pop();
    renderCustomSlots();
    renderCardForms();
    resetOocUserEdited();
    refreshOocTextarea();
});

document.getElementById("customQuestion").addEventListener("input", () => {
    customQuestion = document.getElementById("customQuestion").value;
    resetOocUserEdited();
    refreshOocTextarea();
});

// OOC textarea 직접 수정 감지
document.getElementById("oocTextarea").addEventListener("input", () => {
    document.getElementById("oocTextarea").dataset.userEdited = "1";
    updateOocLen();
});

// ==============================
// 결과 입력 토글
// ==============================
document.getElementById("cardFormToggle").addEventListener("click", () => {
    const wrap  = document.getElementById("cardFormsWrap");
    const hint  = document.getElementById("toggleHint");
    const open  = wrap.classList.contains("collapsed");
    wrap.classList.toggle("collapsed", !open);
    hint.textContent = open ? "클릭해서 접기 ▴" : "클릭해서 펼치기 ▾";
});

// ==============================
// OOC 복사
// ==============================
document.getElementById("oocBtn").addEventListener("click", async () => {
    const ta = document.getElementById("oocTextarea");
    await navigator.clipboard.writeText(ta.value);
    showToastMsg("ooc가 복사되었습니다.");
});

// ==============================
// 폼 → JSON 적용
// ==============================
document.getElementById("pasteJsonBtn").addEventListener("click", () => {
    const txt = jsonInput.value.trim();
    if (!txt) { showToastMsg("JSON이 비어 있습니다."); return; }
    syncFormsFromJson(txt);
    syncJsonFromForms();
});

jsonInput.addEventListener("blur", () => {
    const txt = jsonInput.value.trim();
    if (!txt) return;
    try { JSON.parse(txt); syncFormsFromJson(txt); } catch(_) {}
});

// ==============================
// Clear
// ==============================
document.getElementById('clearBtn').addEventListener("click", () => {
    jsonInput.value = '';
    renderCardForms();
    showToastMsg("초기화되었습니다.");
});

// ==============================
// Launch
// ==============================
document.getElementById("launchBtn").addEventListener("click", () => {
    syncJsonFromForms();
    const txt = jsonInput.value.trim();
    if (!txt) { alert("카드 정보를 입력하세요."); return; }

    try {
        modal.style.display = 'none';
        cardData = JSON.parse(txt);

        const keys  = getCurrentKeys();
        const slots = getCurrentSlots();
        const question = getCurrentQuestion();

        // 카드 테이블 동적 생성
        renderTarotTable(keys, slots);

        // 카드 앞면 세팅
        keys.forEach((key, i) => {
            const data = cardData[key];
            if (!data) return;
            const container = document.querySelector(`.card-container[data-card-index="${i}"]`);
            if (!container) return;
            const front = container.querySelector('.card-front');
            const imgPath  = getCardImgPath(data.number);
            const isReverse = String(data.direction).toLowerCase().includes("down");
            front.style.backgroundImage    = `url("${imgPath}")`;
            front.style.backgroundSize     = "cover";
            front.style.backgroundPosition = "center";
            front.style.transform = isReverse
                ? "rotateY(180deg) rotate(180deg)"
                : "rotateY(180deg) rotate(0)";
            document.documentElement.style.setProperty(`--theme-${i}`, data.theme || "#888");
        });

        // 배경 그라디언트
        document.documentElement.style.setProperty('--theme-0', cardData[keys[0]]?.theme || "#ffffff");
        document.documentElement.style.setProperty('--theme-1', cardData[keys[Math.min(1, keys.length-1)]]?.theme || "#000000");

        // 질문 배너
        const banner = document.getElementById("questionBanner");
        const resolvedQ = applyCharNames(question);
        if (resolvedQ) {
            banner.textContent = `✦ ${resolvedQ}`;
            banner.style.display = "";
        } else {
            banner.style.display = "none";
        }

        // 상단 스프레드 레이블
        const spreadLabelEl = document.getElementById("spreadLabel");
        if (spreadLabelEl) {
            spreadLabelEl.textContent = applyCharNames(
                currentSpread.id === "custom" ? slots.join(" · ") : currentSpread.label
            );
        }

        jsonScreen.style.display  = "none";
        tarotScreen.style.display = "flex";

    } catch(err) { alert("JSON 오류: " + err.message); }
});

// ==============================
// Back
// ==============================
document.getElementById("backBtn").addEventListener("click", () => {
    tarotScreen.style.display = "none";
    jsonScreen.style.display  = "block";
});

// ==============================
// 카드 클릭 핸들러
// ==============================
function onCardClick() {
    const key  = this.dataset.cardKey;
    const data = cardData[key];
    if (!data) return;

    const isFlipped = this.classList.contains('flipped');
    if (!isFlipped) this.classList.add('flipped');

    setTimeout(() => {
        const cardImg   = document.querySelector('.card-img');
        const isReverse = String(data.direction).toLowerCase().includes("down");
        const cardInfo  = getCardInfo(data.number);
        const theme     = data.theme || "#8a8a8a";
        const imgPath   = getCardImgPath(data.number);

        const keys  = getCurrentKeys();
        const slots = getCurrentSlots();
        const slotIdx = keys.indexOf(key);
        const title   = (slotIdx >= 0 && slots[slotIdx]) ? applyCharNames(slots[slotIdx]) : key;

        document.documentElement.style.setProperty('--theme-select', theme);

        // 버블 이름 + 텍스트
        document.getElementById('bubble-name-char').textContent = charNames.a;
        document.getElementById('bubble-text-char').textContent = data.comment || "";
        document.getElementById('bubble-name-user').textContent = charNames.b;
        document.getElementById('bubble-text-user').textContent = data.userComment || "";

        document.getElementById('char-comment').style.borderColor = cardData[keys[0]]?.theme || "#fff";
        document.getElementById('user-comment').style.borderColor = cardData[keys[Math.min(1,keys.length-1)]]?.theme || "#000";

        cardImg.style.backgroundImage = `url("${imgPath}")`;
        cardImg.style.transform = isReverse ? "rotate(180deg)" : "rotate(0deg)";

        document.getElementById('modalTitle').textContent = title;

        const numRomEl = document.querySelector('#modal-card-info .card-number');
        const nameEl   = document.querySelector('#modal-card-info .card-name');
        const dirEl    = document.querySelector('#modal-card-info .card-direction');
        const kwEl     = document.querySelector('#modal-card-info .card-keyword');

        let suitBadge = document.querySelector('#modal-card-info .suit-badge');
        if (!suitBadge) {
            suitBadge = document.createElement('div');
            suitBadge.className = 'suit-badge';
            nameEl.insertAdjacentElement('afterend', suitBadge);
        }

        if (cardInfo) {
            numRomEl.textContent = cardInfo.numRom ?? "";
            nameEl.textContent   = cardInfo.name   ?? "";
            if (cardInfo.suitLabel) {
                suitBadge.textContent = `${cardInfo.suitSymbol} ${cardInfo.suitLabel}`;
                suitBadge.style.display = "";
            } else {
                suitBadge.textContent = ""; suitBadge.style.display = "none";
            }
            dirEl.textContent = isReverse ? "역방향" : "정방향";
            kwEl.textContent  = isReverse ? (cardInfo.reverseKey??"") : (cardInfo.forwardKey??"");
        } else {
            numRomEl.textContent = String(data.number??"");
            nameEl.textContent   = data.name ?? "";
            suitBadge.textContent = ""; suitBadge.style.display="none";
            dirEl.textContent = isReverse ? "역방향" : "정방향";
            kwEl.textContent  = "";
        }

        document.getElementById('modal-interpretation').textContent = data.interpretation;

        const themeRGB = hexToRgb(theme);
        const bgVal = contrastRatio(themeRGB, {r:0,g:0,b:0}) < 4.5 ? "#ffffff" : "none";
        numRomEl.style.background = bgVal;
        nameEl.style.background   = bgVal;

        modal.style.display = 'flex';
        document.querySelector('.modal-wrapper').scrollTop = 0;

    }, isFlipped ? 0 : 900);
}

// ==============================
// 모달 닫기 / 저장
// ==============================
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

saveModalBtn.addEventListener('click', async () => {
    const frame = document.querySelector('.modal-content');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
        const dataUrl = await domtoimage.toPng(frame, { quality: 1, bgcolor: 'transparent' });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `tarot_${new Date().toISOString().replace(/[:.]/g,'-')}.png`;
        a.click();
        await new Promise(res => setTimeout(res, 200));
    } catch(e) { console.error(e); }
});

// ==============================
// 초기화
// ==============================
renderSpreadSelector();
updateAreaVisibility();
refreshPresetQuestion();
renderCardForms();
renderCustomSlots();
refreshOocTextarea();

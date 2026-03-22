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
// 78장 드롭다운 옵션 생성
// ==============================
function buildCardOptions() {
    const opts = [{ value: "", label: "── 카드 선택 ──" }];

    // Major
    opts.push({ value: "__group__", label: "── 메이저 아르카나 (22장) ──", disabled: true });
    cardAInfo.forEach(c => {
        opts.push({ value: String(c.num), label: `${c.numRom}  ${c.name}` });
    });

    // Minor
    SUITS.forEach((suit, suitIdx) => {
        opts.push({ value: "__group__", label: `── ${suit.symbol} ${suit.label} (14장) ──`, disabled: true });
        RANKS.forEach((rank, rankIdx) => {
            const val = `${suit.key}:${rankIdx}`;
            opts.push({ value: val, label: `${rank.numRom}  ${rank.name} of ${suit.label}` });
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
        if (opt.disabled || opt.value === "__group__") { el.disabled = true; }
        if (opt.value === currentVal) el.selected = true;
        sel.appendChild(el);
    });
    return sel;
}

// ==============================
// Theme preset colors
// ==============================
const THEME_PRESETS = [
    "#ffffff", "#111111", "#c0392b", "#e67e22",
    "#f1c40f", "#27ae60", "#2980b9", "#8e44ad",
    "#1abc9c", "#e91e8c", "#607d8b", "#795548"
];

// ==============================
// Card preview chip update
// ==============================
function updateCardChip(panelEl, cardValue) {
    const chip = panelEl.querySelector('.card-chip-preview');
    if (!chip) return;
    const imgEl  = chip.querySelector('.chip-img');
    const nameEl = chip.querySelector('.chip-name');
    const keyEl  = chip.querySelector('.chip-key');

    if (!cardValue) {
        imgEl.style.backgroundImage = "";
        nameEl.textContent = "선택 없음";
        keyEl.textContent  = "";
        return;
    }
    const info = getCardInfo(cardValue);
    const path = getCardImgPath(cardValue);
    imgEl.style.backgroundImage = path ? `url("${path}")` : "";
    if (info) {
        if (info.suitLabel) {
            nameEl.textContent = `${info.numRom} ${info.name}`;
            keyEl.textContent  = `${info.suitSymbol} ${info.suitLabel}`;
        } else {
            nameEl.textContent = `${info.numRom} ${info.name}`;
            keyEl.textContent  = `메이저 아르카나`;
        }
    } else {
        nameEl.textContent = cardValue;
        keyEl.textContent  = "";
    }
}

// ==============================
// Build one card form panel
// ==============================
function buildCardFormPanel(slotIndex, slotLabel, key, existingData) {
    const d = existingData || {};

    const panel = document.createElement("div");
    panel.className = "card-form-panel";
    panel.dataset.key = key;
    panel.dataset.slot = slotIndex;

    // ── header ──
    const header = document.createElement("div");
    header.className = "card-form-header";
    header.innerHTML = `
        <div class="card-form-header-index">${slotIndex + 1}</div>
        <div class="card-form-header-slot">${slotLabel}</div>
        <div class="card-form-header-preview">${d.name || ""}</div>
        <div class="card-form-toggle">▾</div>
    `;
    header.addEventListener("click", () => {
        panel.classList.toggle("collapsed");
    });

    // ── body ──
    const body = document.createElement("div");
    body.className = "card-form-body";

    // 카드 선택 + 방향
    const cardVal = d.number !== undefined ? String(d.number) : "";
    const isDown  = String(d.direction || "up").toLowerCase().includes("down");

    body.innerHTML = `
      <!-- 카드 선택 -->
      <div class="form-row">
        <label>🃏 카드</label>
        <div class="card-select-wrap" id="wrap-select-${key}"></div>
      </div>

      <!-- 카드 미리보기 -->
      <div class="card-chip-preview">
        <div class="chip-img"></div>
        <div>
          <div class="chip-name">선택 없음</div>
          <div class="chip-key"></div>
        </div>
      </div>

      <!-- 방향 -->
      <div class="form-row">
        <label>↕️ 방향</label>
        <div class="direction-toggle">
          <button type="button" class="dir-btn ${!isDown ? "active-up" : ""}" data-dir="up">🔼 정방향 (up)</button>
          <button type="button" class="dir-btn ${isDown  ? "active-down" : ""}" data-dir="down">🔽 역방향 (down)</button>
        </div>
      </div>

      <!-- 테마 컬러 -->
      <div class="form-row">
        <label>🎨 테마 컬러</label>
        <div class="theme-row">
          <input type="color" id="color-picker-${key}" value="${d.theme || "#888888"}" />
          <input type="text"  id="color-text-${key}"   value="${d.theme || "#888888"}" placeholder="#rrggbb" maxlength="7" />
        </div>
        <div class="theme-presets" id="theme-presets-${key}"></div>
      </div>

      <!-- 해석 -->
      <div class="form-row">
        <label>📖 해석</label>
        <textarea id="interp-${key}" placeholder="이 카드의 해석을 입력하세요...">${d.interpretation || ""}</textarea>
      </div>

      <!-- 코멘트 2개 -->
      <div class="form-row-inline">
        <div class="form-row">
          <label>💬 {{char}} 코멘트</label>
          <textarea id="comment-${key}" placeholder="캐릭터 코멘트...">${d.comment || ""}</textarea>
        </div>
        <div class="form-row">
          <label>💬 {{user}} 코멘트</label>
          <textarea id="userComment-${key}" placeholder="유저 코멘트...">${d.userComment || ""}</textarea>
        </div>
      </div>
    `;

    // inject select
    const selectWrap = body.querySelector(`#wrap-select-${key}`);
    const selEl = buildSelectEl(`card-select-${key}`, cardVal);
    selectWrap.appendChild(selEl);

    panel.appendChild(header);
    panel.appendChild(body);

    // ── 이벤트 연결 ──

    // 카드 선택 → 칩 업데이트 + JSON 동기화
    selEl.addEventListener("change", () => {
        updateCardChip(panel, selEl.value);
        updateHeaderPreview(panel);
        syncJsonFromForms();
    });
    updateCardChip(panel, cardVal);

    // 방향 버튼
    body.querySelectorAll('.dir-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            body.querySelectorAll('.dir-btn').forEach(b => {
                b.classList.remove("active-up", "active-down");
            });
            btn.classList.add(btn.dataset.dir === "up" ? "active-up" : "active-down");
            syncJsonFromForms();
        });
    });

    // 컬러 피커 ↔ 텍스트 연동
    const colorPicker = body.querySelector(`#color-picker-${key}`);
    const colorText   = body.querySelector(`#color-text-${key}`);
    colorPicker.addEventListener("input", () => {
        colorText.value = colorPicker.value;
        syncJsonFromForms();
    });
    colorText.addEventListener("input", () => {
        const val = colorText.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
            colorPicker.value = val;
        }
        syncJsonFromForms();
    });

    // 테마 프리셋 도트
    const presetsWrap = body.querySelector(`#theme-presets-${key}`);
    THEME_PRESETS.forEach(hex => {
        const dot = document.createElement("div");
        dot.className = "theme-dot";
        dot.style.background = hex;
        dot.title = hex;
        dot.addEventListener("click", () => {
            colorPicker.value = hex;
            colorText.value   = hex;
            syncJsonFromForms();
        });
        presetsWrap.appendChild(dot);
    });

    // 텍스트 인풋들 → JSON 동기화
    ["interp", "comment", "userComment"].forEach(prefix => {
        const el = body.querySelector(`#${prefix}-${key}`);
        if (el) el.addEventListener("input", () => {
            updateHeaderPreview(panel);
            syncJsonFromForms();
        });
    });

    return panel;
}

function updateHeaderPreview(panel) {
    const key     = panel.dataset.key;
    const nameEl  = panel.querySelector('.card-form-header-preview');
    const selEl   = panel.querySelector(`#card-select-${key}`);
    const interpEl = panel.querySelector(`#interp-${key}`);
    if (!nameEl) return;
    const selText = selEl?.options[selEl.selectedIndex]?.text || "";
    nameEl.textContent = selText && selText !== "── 카드 선택 ──"
        ? selText
        : (interpEl?.value?.slice(0, 30) || "");
}

// ==============================
// Read form data for one slot
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
    const info      = getCardInfo(cardValue);

    return {
        label:          slotLabel,
        name:           info ? (info.suitLabel ? `${info.numRom} ${info.name}` : info.name) : "",
        number:         cardValue,
        theme:          colorT?.value  || "#888888",
        direction:      dirBtn?.dataset.dir || "up",
        interpretation: interp?.value  || "",
        comment:        comm?.value    || "",
        userComment:    userC?.value   || ""
    };
}

// ==============================
// Sync: Forms → JSON textarea
// ==============================
function syncJsonFromForms() {
    const keys  = currentSpread.keys;
    const slots = currentSpread.id === "custom" ? getCustomSlots() : currentSpread.slots;
    const obj   = {};
    keys.forEach((key, i) => {
        obj[key] = readFormData(key, slots[i] || key);
    });
    jsonInput.value = JSON.stringify(obj, null, 2);
}

// ==============================
// Sync: JSON textarea → Forms
// ==============================
function syncFormsFromJson(jsonStr) {
    try {
        const obj = JSON.parse(jsonStr);
        const keys = currentSpread.keys;
        let matched = false;
        keys.forEach(key => {
            if (obj[key]) {
                fillFormFromData(key, obj[key]);
                matched = true;
            }
        });
        if (!matched) {
            // key가 다른 스프레드에서 온 경우: 순서대로 매핑 시도
            const objKeys = Object.keys(obj);
            keys.forEach((key, i) => {
                if (obj[objKeys[i]]) fillFormFromData(key, obj[objKeys[i]]);
            });
        }
        showToastMsg("폼에 적용되었습니다.");
    } catch (e) {
        showToastMsg("JSON 파싱 오류: " + e.message);
    }
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

    // 카드 번호
    const numStr = data.number !== undefined ? String(data.number) : "";
    if (selEl && numStr) {
        // find matching option
        const opt = Array.from(selEl.options).find(o => o.value === numStr);
        if (opt) selEl.value = numStr;
        updateCardChip(panel, numStr);
    }

    // 방향
    const isDown = String(data.direction || "up").toLowerCase().includes("down");
    panel.querySelectorAll('.dir-btn').forEach(btn => {
        btn.classList.remove("active-up", "active-down");
        if (btn.dataset.dir === "up"   && !isDown) btn.classList.add("active-up");
        if (btn.dataset.dir === "down" &&  isDown) btn.classList.add("active-down");
    });

    // 테마
    if (data.theme) {
        const hex = data.theme.startsWith("#") ? data.theme : "#" + data.theme;
        if (colorP) colorP.value = hex;
        if (colorT) colorT.value = hex;
    }

    // 텍스트
    if (interp) interp.value = data.interpretation || "";
    if (comm)   comm.value   = data.comment        || "";
    if (userC)  userC.value  = data.userComment    || "";

    // 패널 접힌 거 열기
    panel.classList.remove("collapsed");
    updateHeaderPreview(panel);
}

// ==============================
// Render all card form panels
// ==============================
function renderCardForms(existingData) {
    const container = document.getElementById("cardForms");
    container.innerHTML = "";

    const keys  = currentSpread.keys;
    const slots = currentSpread.id === "custom" ? getCustomSlots() : currentSpread.slots;

    keys.forEach((key, i) => {
        const panel = buildCardFormPanel(i, slots[i] || key, key, existingData?.[key]);
        container.appendChild(panel);
    });

    syncJsonFromForms();
}

// ==============================
// Spread Selector
// ==============================
function renderSpreadSelector() {
    const container = document.getElementById("spreadSelector");
    container.innerHTML = "";
    SPREAD_PRESETS.forEach(preset => {
        const chip = document.createElement("button");
        chip.className = "spread-chip" + (preset.id === currentSpread.id ? " active" : "");
        chip.textContent = preset.label;
        chip.addEventListener("click", () => {
            currentSpread = preset;
            renderSpreadSelector();
            updateCustomSlotVisibility();
            renderCardForms();
        });
        container.appendChild(chip);
    });
}

function updateCustomSlotVisibility() {
    const area = document.getElementById("customSlotArea");
    area.style.display = currentSpread.id === "custom" ? "flex" : "none";
}

function getCustomSlots() {
    return [
        document.getElementById("customSlot1").value.trim() || "슬롯 1",
        document.getElementById("customSlot2").value.trim() || "슬롯 2",
        document.getElementById("customSlot3").value.trim() || "슬롯 3"
    ];
}

["customSlot1","customSlot2","customSlot3"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        // 헤더 슬롯명 갱신
        const slots = getCustomSlots();
        currentSpread.keys.forEach((key, i) => {
            const panel = document.querySelector(`.card-form-panel[data-key="${key}"]`);
            if (panel) {
                const h = panel.querySelector('.card-form-header-slot');
                if (h) h.textContent = slots[i] || `슬롯 ${i+1}`;
            }
        });
        syncJsonFromForms();
    });
});

// ==============================
// OOC 버튼
// ==============================
document.getElementById("oocBtn").addEventListener("click", async () => {
    const customSlots = currentSpread.id === "custom" ? getCustomSlots() : null;
    const oocText = buildOoc(currentSpread, customSlots);
    await navigator.clipboard.writeText(oocText);
    showToastMsg("ooc가 복사되었습니다.");
});

// ==============================
// Clear 버튼
// ==============================
document.getElementById('clearBtn').addEventListener("click", () => {
    jsonInput.value = '';
    renderCardForms();
    showToastMsg("초기화되었습니다.");
});

// ==============================
// JSON → 폼 적용 버튼
// ==============================
document.getElementById("pasteJsonBtn").addEventListener("click", () => {
    const txt = jsonInput.value.trim();
    if (!txt) { showToastMsg("JSON이 비어 있습니다."); return; }
    syncFormsFromJson(txt);
    syncJsonFromForms();
});

// ==============================
// JSON textarea 직접 편집 → 폼 동기화 (blur 시)
// ==============================
jsonInput.addEventListener("blur", () => {
    const txt = jsonInput.value.trim();
    if (!txt) return;
    try {
        JSON.parse(txt); // valid check
        syncFormsFromJson(txt);
    } catch (_) { /* 파싱 실패면 무시 */ }
});

// ==============================
// Launch 버튼
// ==============================
document.getElementById("launchBtn").addEventListener("click", () => {
    // 폼 → JSON 최신화
    syncJsonFromForms();
    const txt = jsonInput.value.trim();
    if (!txt) { alert("카드 정보를 입력하세요."); return; }

    try {
        modal.style.display = 'none';
        const newJson = JSON.parse(txt);
        cardData = newJson;

        const customSlots = currentSpread.id === "custom" ? getCustomSlots() : null;
        const keys  = currentSpread.keys;
        const slots = currentSpread.id === "custom" ? customSlots : currentSpread.slots;

        document.querySelectorAll('.card-container').forEach((container, i) => {
            container.dataset.cardKey = keys[i];
            container.classList.remove("flipped");
        });

        keys.forEach((key, i) => {
            const data = cardData[key];
            if (!data) return;
            const imgPath   = getCardImgPath(data.number);
            const isReverse = String(data.direction).toLowerCase().includes("down");
            const container = document.querySelector(`.card-container[data-card-index="${i}"]`);
            if (!container) return;
            const front = container.querySelector('.card-front');
            front.style.backgroundImage    = `url("${imgPath}")`;
            front.style.backgroundSize     = "cover";
            front.style.backgroundPosition = "center";
            front.style.transform = isReverse
                ? "rotateY(180deg) rotate(180deg)"
                : "rotateY(180deg) rotate(0)";
            document.documentElement.style.setProperty(`--theme-${i}`, data.theme || "#888");
        });

        applyBgGradient(keys);
        updateSlotLabels(currentSpread, customSlots);

        jsonScreen.style.display  = "none";
        tarotScreen.style.display = "flex";

    } catch (err) {
        alert("JSON 오류: " + err.message);
    }
});

// ==============================
// Back 버튼
// ==============================
document.getElementById("backBtn").addEventListener("click", () => {
    tarotScreen.style.display = "none";
    jsonScreen.style.display  = "block";
});

// ==============================
// 배경 그라디언트
// ==============================
function applyBgGradient(keys) {
    const c0 = cardData[keys[0]]?.theme || "#ffffff";
    const c1 = cardData[keys[1]]?.theme || "#000000";
    document.documentElement.style.setProperty('--theme-0', c0);
    document.documentElement.style.setProperty('--theme-1', c1);
}

// ==============================
// 슬롯 레이블
// ==============================
function updateSlotLabels(spread, customSlots) {
    const slots = spread.id === "custom" ? customSlots : spread.slots;
    document.querySelectorAll('.card-slot-wrap').forEach((wrap, i) => {
        const label = wrap.querySelector('.slot-label');
        if (label) label.textContent = slots[i] || "";
    });
    const spreadLabelEl = document.getElementById("spreadLabel");
    if (spreadLabelEl) {
        spreadLabelEl.textContent = spread.id === "custom"
            ? slots.join(" · ")
            : spread.label;
    }
}

// ==============================
// 카드 클릭 → 플립 + 모달
// ==============================
document.querySelectorAll('.card-container').forEach(container => {
    container.addEventListener('click', function () {
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

            const slotIdx = currentSpread.keys.indexOf(key);
            const slots   = currentSpread.id === "custom" ? getCustomSlots() : currentSpread.slots;
            const title   = (slotIdx >= 0 && slots[slotIdx]) ? slots[slotIdx] : key;

            document.documentElement.style.setProperty('--theme-select', theme);

            const keys = currentSpread.keys;
            document.getElementById('char-comment').style.borderColor = cardData[keys[0]]?.theme || "#fff";
            document.getElementById('user-comment').style.borderColor = cardData[keys[1]]?.theme || "#000";

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
                    suitBadge.textContent   = `${cardInfo.suitSymbol} ${cardInfo.suitLabel}`;
                    suitBadge.style.display = "";
                } else {
                    suitBadge.textContent   = "";
                    suitBadge.style.display = "none";
                }
                dirEl.textContent = isReverse ? "역방향" : "정방향";
                kwEl.textContent  = isReverse ? (cardInfo.reverseKey ?? "") : (cardInfo.forwardKey ?? "");
            } else {
                numRomEl.textContent    = String(data.number ?? "");
                nameEl.textContent      = data.name ?? "";
                suitBadge.textContent   = "";
                suitBadge.style.display = "none";
                dirEl.textContent       = isReverse ? "역방향" : "정방향";
                kwEl.textContent        = "";
            }

            document.getElementById('modal-interpretation').textContent = data.interpretation;
            document.getElementById('char-comment').textContent = data.comment;
            document.getElementById('user-comment').textContent = data.userComment;

            const themeRGB      = hexToRgb(theme);
            const contrastBlack = contrastRatio(themeRGB, { r: 0, g: 0, b: 0 });
            const bgVal = contrastBlack < 4.5 ? "#ffffff" : "none";
            numRomEl.style.background = bgVal;
            nameEl.style.background   = bgVal;

            modal.style.display = 'flex';
            document.querySelector('.modal-wrapper').scrollTop = 0;

        }, isFlipped ? 0 : 900);
    });
});

// ==============================
// 모달 닫기
// ==============================
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

// ==============================
// 모달 이미지 저장
// ==============================
saveModalBtn.addEventListener('click', async () => {
    const frame = document.querySelector('.modal-content');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
        const dataUrl = await domtoimage.toPng(frame, { quality: 1, bgcolor: 'transparent' });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `tarot_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        a.click();
        await new Promise(res => setTimeout(res, 200));
    } catch (e) { console.error(e); }
});

// ==============================
// 초기화
// ==============================
renderSpreadSelector();
updateCustomSlotVisibility();
renderCardForms();

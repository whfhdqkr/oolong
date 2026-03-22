let cardData = {};

// ==============================
// Major Arcana
// ==============================
let cardAInfo = [
    { num: 0,  numRom: '0',     name: "The Fool",           forwardKey: "새로운 시작, 순수, 도전",       reverseKey: "경솔함, 준비 부족, 무모한 선택"   },
    { num: 1,  numRom: 'Ⅰ',    name: "The Magician",       forwardKey: "창조, 의지 실현, 능력",         reverseKey: "사기, 속임수, 의지 부족"           },
    { num: 2,  numRom: 'Ⅱ',    name: "The High Priestess", forwardKey: "직관, 비밀, 잠재의식",           reverseKey: "억압된 감정, 불안, 숨겨진 의도"   },
    { num: 3,  numRom: 'Ⅲ',    name: "The Empress",        forwardKey: "풍요, 모성, 안정",              reverseKey: "과보호, 의존, 게으름"             },
    { num: 4,  numRom: 'Ⅳ',    name: "The Emperor",        forwardKey: "권위, 리더십, 규율",            reverseKey: "독재, 융통성 부족, 강압"           },
    { num: 5,  numRom: 'Ⅴ',    name: "The Hierophant",     forwardKey: "전통, 조언, 교육",              reverseKey: "고집, 틀에 박힘, 잘못된 지식"      },
    { num: 6,  numRom: 'Ⅵ',    name: "The Lovers",         forwardKey: "사랑, 선택, 조화",              reverseKey: "불화, 잘못된 선택, 갈등"           },
    { num: 7,  numRom: 'Ⅶ',    name: "The Chariot",        forwardKey: "승리, 의지, 극복",              reverseKey: "통제 상실, 패배, 방향성 없음"      },
    { num: 8,  numRom: 'Ⅷ',    name: "Strength",           forwardKey: "내적 힘, 인내, 용기",           reverseKey: "불안, 자존감 상실, 무기력"         },
    { num: 9,  numRom: 'Ⅸ',    name: "The Hermit",         forwardKey: "고독, 탐구, 자기 성찰",         reverseKey: "고립, 외로움, 현실 도피"           },
    { num: 10, numRom: 'Ⅹ',    name: "Wheel of Fortune",   forwardKey: "전환점, 행운, 사이클",          reverseKey: "불운, 정체, 반복되는 문제"         },
    { num: 11, numRom: 'ⅩⅠ',   name: "Justice",            forwardKey: "정의, 균형, 책임",              reverseKey: "불공정, 회피, 부정"               },
    { num: 12, numRom: 'ⅩⅡ',   name: "The Hanged Man",     forwardKey: "희생, 관점 변화, 수용",         reverseKey: "회피, 정체, 잘못된 희생"           },
    { num: 13, numRom: 'ⅩⅢ',   name: "Death",              forwardKey: "종말, 변화, 재탄생",            reverseKey: "집착, 변화 거부, 정체"             },
    { num: 14, numRom: 'ⅩⅣ',   name: "Temperance",         forwardKey: "조화, 절제, 균형",              reverseKey: "불균형, 극단, 갈등"               },
    { num: 15, numRom: 'ⅩⅤ',   name: "The Devil",          forwardKey: "유혹, 집착, 본능",              reverseKey: "해방, 통제 벗어남, 탈출"           },
    { num: 16, numRom: 'ⅩⅥ',   name: "The Tower",          forwardKey: "붕괴, 충격, 파괴",              reverseKey: "피할 수 없는 변화, 지연된 파괴"    },
    { num: 17, numRom: 'ⅩⅦ',   name: "The Star",           forwardKey: "희망, 회복, 영감",              reverseKey: "실망, 자신감 상실, 회의"           },
    { num: 18, numRom: 'ⅩⅧ',   name: "The Moon",           forwardKey: "환상, 불안, 무의식",            reverseKey: "진실 드러남, 공포 해소"            },
    { num: 19, numRom: 'ⅩⅨ',   name: "The Sun",            forwardKey: "행복, 성공, 기쁨",              reverseKey: "지연된 성공, 일시적 불만"          },
    { num: 20, numRom: 'ⅩⅩ',   name: "Judgement",          forwardKey: "부활, 결단, 평가",              reverseKey: "판단 미루기, 자기 회피"            },
    { num: 21, numRom: 'ⅩⅩⅠ',  name: "The World",          forwardKey: "완성, 성취, 통합",              reverseKey: "미완성, 종결 지연, 마지막 고비"    }
];

// ==============================
// Minor Arcana
// 인덱스: Wands 0~13 / Cups 14~27 / Swords 28~41 / Pentacles 42~55
// 이미지: cards/m_0.jpg ~ cards/m_55.jpg
// ==============================
const SUITS = [
    { key: "wands",     label: "완드",   symbol: "🔥" },
    { key: "cups",      label: "컵",     symbol: "💧" },
    { key: "swords",    label: "소드",   symbol: "💨" },
    { key: "pentacles", label: "펜타클", symbol: "🌿" }
];

const RANKS = [
    { num: 1,  numRom: "Ace",  name: "Ace"    },
    { num: 2,  numRom: "II",   name: "Two"    },
    { num: 3,  numRom: "III",  name: "Three"  },
    { num: 4,  numRom: "IV",   name: "Four"   },
    { num: 5,  numRom: "V",    name: "Five"   },
    { num: 6,  numRom: "VI",   name: "Six"    },
    { num: 7,  numRom: "VII",  name: "Seven"  },
    { num: 8,  numRom: "VIII", name: "Eight"  },
    { num: 9,  numRom: "IX",   name: "Nine"   },
    { num: 10, numRom: "X",    name: "Ten"    },
    { num: 11, numRom: "Page", name: "Page"   },
    { num: 12, numRom: "Kn.",  name: "Knight" },
    { num: 13, numRom: "Qu.",  name: "Queen"  },
    { num: 14, numRom: "Ki.",  name: "King"   }
];

const MINOR_KEYWORDS = {
    wands: [
        { fwd: "영감, 잠재력, 새 출발",      rev: "지연, 망설임, 방향 부재"      },
        { fwd: "계획, 비전, 미래 설계",       rev: "계획 차질, 예측 실패"          },
        { fwd: "협력, 팀워크, 성장",          rev: "갈등, 경쟁, 분산"              },
        { fwd: "안정, 축하, 성취",            rev: "불안정, 미완의 성공"           },
        { fwd: "도전, 경쟁, 갈등",            rev: "회피, 내면 갈등, 타협"         },
        { fwd: "성공, 귀환, 자신감",          rev: "지연된 귀환, 성과 불인정"      },
        { fwd: "용기, 반항, 고집",            rev: "우유부단, 방어적 태도"         },
        { fwd: "빠른 행동, 변화, 이동",       rev: "성급함, 혼란, 지연"            },
        { fwd: "강인함, 결단력, 완고함",      rev: "완고함, 의심, 두려움"          },
        { fwd: "완성, 성공, 부담",            rev: "과부하, 억압, 실패"            },
        { fwd: "탐구, 열정, 자유",            rev: "산만함, 미성숙, 충동"          },
        { fwd: "행동, 열정, 모험",            rev: "성급함, 경솔함, 분노"          },
        { fwd: "창의, 자신감, 리더십",        rev: "독단, 오만, 방종"              },
        { fwd: "비전, 카리스마, 열정",        rev: "독재, 충동, 오만"              }
    ],
    cups: [
        { fwd: "직관, 감정의 시작, 제안",     rev: "감정 억압, 불안정, 거절"       },
        { fwd: "파트너십, 사랑, 조화",        rev: "불화, 감정 불균형, 결별"       },
        { fwd: "기쁨, 우정, 축하",            rev: "과도한 감정, 방종, 환상"       },
        { fwd: "명상, 재평가, 내성",          rev: "정체, 불만족, 기회 놓침"       },
        { fwd: "후회, 슬픔, 집착",            rev: "수용, 회복, 앞으로 나아감"     },
        { fwd: "추억, 재회, 향수",            rev: "과거 집착, 성숙 부족"          },
        { fwd: "환상, 선택, 꿈",              rev: "현실 도피, 환멸, 기만"         },
        { fwd: "포기, 전환점, 탐색",          rev: "두려움, 회피, 표류"            },
        { fwd: "만족, 안정, 감사",            rev: "불만족, 권태, 과보호"          },
        { fwd: "행복, 성취, 가족",            rev: "불화, 잃어버린 행복"           },
        { fwd: "꿈, 감수성, 이상주의",        rev: "환상, 실망, 감정 미숙"         },
        { fwd: "낭만, 상상력, 이상",          rev: "변덕, 과민, 현실 도피"         },
        { fwd: "공감, 치유, 돌봄",            rev: "감정 조종, 의존성, 과잉 감정"  },
        { fwd: "성숙, 온화, 감성 지혜",       rev: "감정 조종, 거짓 공감, 불안정"  }
    ],
    swords: [
        { fwd: "명확함, 진실, 돌파구",        rev: "잔인함, 혼란, 정보 억압"       },
        { fwd: "교착, 결정 회피, 긴장",       rev: "결단, 진실 직면, 해방"         },
        { fwd: "슬픔, 상처, 고통",            rev: "치유, 회복, 감정 표현"         },
        { fwd: "휴식, 회복, 고요함",          rev: "무기력, 번아웃, 회피"          },
        { fwd: "패배, 굴욕, 승자의 독선",     rev: "화해, 실패 수용, 반성"         },
        { fwd: "전환, 이별, 이동",            rev: "강제 이별, 정체, 집착"         },
        { fwd: "배신, 속임수, 자기이익",      rev: "자책, 폭로, 뒤늦은 후회"       },
        { fwd: "제한, 포로, 자기 검열",       rev: "해방, 제한 인식, 탈출"         },
        { fwd: "불안, 두려움, 악몽",          rev: "희망, 공포 직면, 해방"         },
        { fwd: "파멸, 배신, 결말",            rev: "회복, 재기, 변화 수용"         },
        { fwd: "지식, 관찰, 객관성",          rev: "잔인함, 냉담, 험담"            },
        { fwd: "분석력, 논리, 전문성",        rev: "무자비, 냉철함, 잔인한 판단"   },
        { fwd: "지성, 독립심, 직접성",        rev: "독단, 냉담, 지나친 비판"       },
        { fwd: "명석함, 권위, 판단력",        rev: "독재, 냉혹함, 편파적 판단"     }
    ],
    pentacles: [
        { fwd: "물질적 시작, 기회, 잠재력",   rev: "기회 놓침, 계획 실패, 낭비"    },
        { fwd: "균형, 유연성, 자원 관리",     rev: "불균형, 낭비, 재정 불안"        },
        { fwd: "기술, 협력, 장인 정신",       rev: "품질 부족, 고립, 미완성"        },
        { fwd: "안정, 소유욕, 보수성",        rev: "집착, 탐욕, 정체"              },
        { fwd: "빈곤, 두려움, 절약",          rev: "탐욕 극복, 나눔, 수용"          },
        { fwd: "관대함, 나눔, 공동체",        rev: "인색함, 고립, 이기심"           },
        { fwd: "노력, 꾸준함, 장기 목표",     rev: "게으름, 목표 상실, 단기 안주"   },
        { fwd: "근면, 기술, 몰입",            rev: "완벽주의, 번아웃, 지루함"       },
        { fwd: "독립, 재정 안정, 성취",       rev: "과도한 절약, 의존, 정체"        },
        { fwd: "성공, 부, 가족",              rev: "재정 실패, 불안정, 독단"        },
        { fwd: "신뢰성, 실용성, 근면",        rev: "낭비, 물질주의, 게으름"         },
        { fwd: "성실함, 야망, 목표 지향",     rev: "욕심, 조급함, 타산적 태도"      },
        { fwd: "풍요, 관대함, 성숙함",        rev: "질투, 아량 부족, 물질 집착"     },
        { fwd: "안정, 리더십, 풍요",          rev: "탐욕, 독단, 정체"              }
    ]
};

// 마이너 데이터 생성
// 이미지 파일명: cards/m_1.jpg ~ cards/m_56.jpg (1-based)
// number 포맷: "wands:0" ~ "wands:13" (rankIdx 0-based) → imgId = suitIdx*14 + rankIdx + 1
let cardMInfo = [];
SUITS.forEach((suit, suitIdx) => {
    RANKS.forEach((rank, rankIdx) => {
        const minorIdx = suitIdx * 14 + rankIdx; // 0-based 내부 인덱스 (lookup key)
        const imgId    = minorIdx + 1;           // 1-based 파일명
        const kw = MINOR_KEYWORDS[suit.key][rankIdx];
        cardMInfo.push({
            minorIdx,
            imgId,
            suit: suit.key,
            suitLabel: suit.label,
            suitSymbol: suit.symbol,
            rankNum: rank.num,
            numRom: rank.numRom,
            name: `${rank.name} of ${suit.key.charAt(0).toUpperCase() + suit.key.slice(1)}`,
            displayName: `${rank.name} of ${suit.label}`,
            forwardKey: kw.fwd,
            reverseKey: kw.rev
        });
    });
});

// ==============================
// Spread Presets
// ==============================
const SPREAD_PRESETS = [
    {
        id: "char-user-relation",
        label: "캐릭터 / 유저 / 관계",
        slots: ["{{char}}의 카드", "{{user}}의 카드", "관계 카드"],
        keys:  ["char", "user", "relationship"]
    },
    {
        id: "past-present-future",
        label: "과거 / 현재 / 미래",
        slots: ["과거", "현재", "미래"],
        keys:  ["past", "present", "future"]
    },
    {
        id: "situation-action-outcome",
        label: "상황 / 행동 / 결과",
        slots: ["상황", "행동", "결과"],
        keys:  ["situation", "action", "outcome"]
    },
    {
        id: "cause-present-resolution",
        label: "원인 / 현재 / 해결",
        slots: ["원인", "현재 상태", "해결책"],
        keys:  ["cause", "present", "resolution"]
    },
    {
        id: "mind-heart-path",
        label: "마음 / 감정 / 길",
        slots: ["머리 (이성)", "가슴 (감정)", "나아갈 길"],
        keys:  ["mind", "heart", "path"]
    },
    {
        id: "custom",
        label: "✏️ 직접 입력",
        slots: ["", "", ""],
        keys:  ["slot1", "slot2", "slot3"]
    }
];

let currentSpread = SPREAD_PRESETS[0];

function buildOoc(spread, customSlots) {
    const slots = spread.id === "custom" ? customSlots : spread.slots;
    const keys  = spread.keys;

    const slotDesc = slots.map((s, i) => s || keys[i]).join(" / ");

    const cardBlocks = keys.map((key, i) => {
        const label = slots[i] || key;
        return `  "${key}": {\n    "label": "${label}",\n    "name": "카드 이름",\n    "theme": "테마 컬러(hex)",\n    "number": "메이저: 숫자 / 마이너: suit:rankIndex (예: wands:0)",\n    "direction": "up/down",\n    "interpretation": "해석",\n    "comment": "{{char}} 코멘트",\n    "userComment": "{{user}} 코멘트"\n  }`;
    }).join(",\n");

    return `ooc : 잠시 롤플 중지. 지정 양식만 제출할 것.\n타로 스프레드: ${spread.id === "custom" ? slotDesc : spread.label}\n카드를 세 장 뽑는다 (${slotDesc}).\n\n- 출력 양식 (json)\n\`\`\`json\n{\n${cardBlocks}\n}\n\`\`\``;
}

// ==============================
// Card Lookup Helpers
// ==============================

/**
 * 카드 번호 파싱
 * 메이저: 숫자/로마자 → { type:"major", id:number }
 * 마이너: "wands:0" 또는 "m_N" → { type:"minor", id:number }
 */
function parseCardNumber(raw) {
    if (raw === null || raw === undefined) return null;
    const str = String(raw).trim();

    // minor: "suit:rankIndex" 형식
    if (str.includes(":")) {
        const [suit, idx] = str.split(":");
        const suitIdx = SUITS.findIndex(s => s.key === suit.toLowerCase().trim());
        if (suitIdx >= 0) {
            const rankIdx = parseInt(idx, 10);
            if (!isNaN(rankIdx)) return { type: "minor", id: suitIdx * 14 + rankIdx };
        }
    }

    // minor: "m_N" 형식
    if (str.startsWith("m_")) {
        const id = parseInt(str.slice(2), 10);
        if (!isNaN(id)) return { type: "minor", id };
    }

    // major: 숫자/로마자
    const n = romanToNumber(raw);
    return { type: "major", id: n };
}

function getCardInfo(raw) {
    const parsed = parseCardNumber(raw);
    if (!parsed) return null;
    if (parsed.type === "minor") return cardMInfo.find(c => c.minorIdx === parsed.id) || null;
    return cardAInfo.find(c => c.num === parsed.id) || null;
}

function getCardImgPath(raw) {
    const parsed = parseCardNumber(raw);
    if (!parsed) return "";
    if (parsed.type === "minor") {
        const card = cardMInfo.find(c => c.minorIdx === parsed.id);
        return card ? `cards/m_${card.imgId}.jpg` : "";
    }
    return `cards/${parsed.id}.jpg`;
}

// ==============================
// Legacy helpers
// ==============================
function romanToNumber(roman) {
    const map = {
        "0": 0, "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5,
        "VI": 6, "VII": 7, "VIII": 8, "IX": 9, "X": 10,
        "XI": 11, "XII": 12, "XIII": 13, "XIV": 14, "XV": 15,
        "XVI": 16, "XVII": 17, "XVIII": 18, "XIX": 19, "XX": 20, "XXI": 21
    };
    if (map[roman] !== undefined) return map[roman];
    if (typeof roman === 'number') return roman;
    const num = String(roman).replace(/[^0-9]/g, "");
    return num === "" ? 0 : parseInt(num, 10);
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function luminance({ r, g, b }) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(c1, c2) {
    const L1 = luminance(c1), L2 = luminance(c2);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function validateTarotJson(jsonObj, spread) {
    if (typeof jsonObj !== 'object' || jsonObj === null)
        return "최상위 입력은 유효한 JSON 객체여야 합니다.";

    const keys = (spread && spread.keys) ? spread.keys : ["char", "user", "relationship"];
    const requiredCardKeys = ["name", "theme", "number", "direction", "interpretation", "comment", "userComment"];
    const validDirections = ["up", "down"];

    for (const key of keys) {
        const cardObj = jsonObj[key];
        if (typeof cardObj !== 'object' || cardObj === null)
            return `'${key}' 항목이 누락되었거나 유효한 객체가 아닙니다.`;
        for (const cardKey of requiredCardKeys) {
            if (!(cardKey in cardObj))
                return `'${key}' 항목에 필수 키 '${cardKey}'가 누락되었습니다.`;
            const value = cardObj[cardKey];
            if (cardKey !== 'number' && typeof value !== 'string')
                return `'${key}' 항목의 '${cardKey}' 값은 문자열이어야 합니다.`;
            if (cardKey !== 'number' && value.trim() === '')
                return `'${key}' 항목의 '${cardKey}' 값은 비어 있을 수 없습니다.`;
            if (cardKey === 'direction' && !validDirections.includes(value.toLowerCase().trim()))
                return `'${key}' 항목의 'direction' 값은 'up' 또는 'down'이어야 합니다.`;
        }
    }
    return null;
}

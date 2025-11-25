let cardData = {};
let cardAInfo = [
    {
        num: 0,
        numRom: '0',
        name: "The Fool",
        forwardKey: "새로운 시작, 순수, 도전",
        reverseKey: "경솔함, 준비 부족, 무모한 선택"
    },
    {
        num: 1,
        numRom: 'Ⅰ',
        name: "The Magician",
        forwardKey: "창조, 의지 실현, 능력",
        reverseKey: "사기, 속임수, 의지 부족"
    },
    {
        num: 2,
        numRom: 'Ⅱ',
        name: "The High Priestess",
        forwardKey: "직관, 비밀, 잠재의식",
        reverseKey: "억압된 감정, 불안, 숨겨진 의도"
    },
    {
        num: 3,
        numRom: 'Ⅲ',
        name: "The Empress",
        forwardKey: "풍요, 모성, 안정",
        reverseKey: "과보호, 의존, 게으름"
    },
    {
        num: 4,
        numRom: 'Ⅳ',
        name: "The Emperor",
        forwardKey: "권위, 리더십, 규율",
        reverseKey: "독재, 융통성 부족, 강압"
    },
    {
        num: 5,
        numRom: 'Ⅴ',
        name: "The Hierophant",
        forwardKey: "전통, 조언, 교육",
        reverseKey: "고집, 틀에 박힘, 잘못된 지식"
    },
    {
        num: 6,
        numRom: 'Ⅵ',
        name: "The Lovers",
        forwardKey: "사랑, 선택, 조화",
        reverseKey: "불화, 잘못된 선택, 갈등"
    },
    {
        num: 7,
        numRom: 'Ⅶ',
        name: "The Chariot",
        forwardKey: "승리, 의지, 극복",
        reverseKey: "통제 상실, 패배, 방향성 없음"
    },
    {
        num: 8,
        numRom: 'Ⅷ',
        name: "Strength",
        forwardKey: "내적 힘, 인내, 용기",
        reverseKey: "불안, 자존감 상실, 무기력"
    },
    {
        num: 9,
        numRom: 'Ⅸ',
        name: "The Hermit",
        forwardKey: "고독, 탐구, 자기 성찰",
        reverseKey: "고립, 외로움, 현실 도피"
    },
    {
        num: 10,
        numRom: 'Ⅹ',
        name: "Wheel of Fortune",
        forwardKey: "전환점, 행운, 사이클",
        reverseKey: "불운, 정체, 반복되는 문제"
    },
    {
        num: 11,
        numRom: 'ⅩⅠ',
        name: "Justice",
        forwardKey: "정의, 균형, 책임",
        reverseKey: "불공정, 회피, 부정"
    },
    {
        num: 12,
        numRom: 'ⅩⅡ',
        name: "The Hanged Man",
        forwardKey: "희생, 관점 변화, 수용",
        reverseKey: "회피, 정체, 잘못된 희생"
    },
    {
        num: 13,
        numRom: 'ⅩⅢ',
        name: "Death",
        forwardKey: "종말, 변화, 재탄생",
        reverseKey: "집착, 변화 거부, 정체"
    },
    {
        num: 14,
        numRom: 'ⅩⅣ',
        name: "Temperance",
        forwardKey: "조화, 절제, 균형",
        reverseKey: "불균형, 극단, 갈등"
    },
    {
        num: 15,
        numRom: 'ⅩⅤ',
        name: "The Devil",
        forwardKey: "유혹, 집착, 본능",
        reverseKey: "해방, 통제 벗어남, 탈출"
    },
    {
        num: 16,
        numRom: 'ⅩⅥ',
        name: "The Tower",
        forwardKey: "붕괴, 충격, 파괴",
        reverseKey: "피할 수 없는 변화, 지연된 파괴"
    },
    {
        num: 17,
        numRom: 'ⅩⅦ',
        name: "The Star",
        forwardKey: "희망, 회복, 영감",
        reverseKey: "실망, 자신감 상실, 회의"
    },
    {
        num: 18,
        numRom: 'ⅩⅧ',
        name: "The Moon",
        forwardKey: "환상, 불안, 무의식",
        reverseKey: "진실 드러남, 공포 해소"
    },
    {
        num: 19,
        numRom: 'ⅩⅨ',
        name: "The Sun",
        forwardKey: "행복, 성공, 기쁨",
        reverseKey: "지연된 성공, 일시적 불만"
    },
    {
        num: 20,
        numRom: 'ⅩⅩ',
        name: "Judgement",
        forwardKey: "부활, 결단, 평가",
        reverseKey: "판단 미루기, 자기 회피"
    },
    {
        num: 21,
        numRom: 'ⅩⅩⅠ',
        name: "The World",
        forwardKey: "완성, 성취, 통합",
        reverseKey: "미완성, 종결 지연, 마지막 고비"
    }
];

let ooc = 'ooc : 잠시 롤플 중지. 지정 양식만 제출할 것.\n{{char}}와 {{user}}의 타로 점을 본다. 카드를 세 개를 뽑으며, 각각 {{char}}의 메인 카드, {{user}}의 메인 카드, 둘 사이의 관계 카드이다.\n- 출력 양식 (json)\n```\n{\n"char": {\n"name": "캐릭터 이름"\n"theme": "테마 컬러(hex)",\n"number": "카드 넘버(숫자)",\n"direction": "up/dowm",\n"interpretation": "해석",\n"comment": "{{char}} 코멘트",\n"userComment": "{{user}} 코멘트"\n},\n"user": {\n(동일 양식)\n},\n"relationship": {\n(동일 양식)\n}\n}\n\n```';

function romanToNumber(roman) {
    const map = {
        "0": 0,
        "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5,
        "VI": 6, "VII": 7, "VIII": 8, "IX": 9, "X": 10,
        "XI": 11, "XII": 12, "XIII": 13, "XIV": 14, "XV": 15,
        "XVI": 16, "XVII": 17, "XVIII": 18, "XIX": 19, "XX": 20,
        "XXI": 21
    };
    
    if(map[roman])
        return map[roman];
    
    if(typeof roman == 'number') {
        //alert(roman);
        return roman;
    }
        
    
    var num = roman.replace(/[^0-9]/g, "");
    return num == "" ? 0 : num;
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function luminance({ r, g, b }) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(c1, c2) {
    const L1 = luminance(c1);
    const L2 = luminance(c2);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}


function validateTarotJson(jsonObj) {
    if (typeof jsonObj !== 'object' || jsonObj === null) {
        return "최상위 입력은 유효한 JSON 객체여야 합니다.";
    }

    const requiredTopKeys = ["char", "user", "relationship"];
    const requiredCardKeys = ["name", "theme", "number", "direction", "interpretation", "comment", "userComment"];
    const validDirections = ["up", "down"];

    for (const key of requiredTopKeys) {
        const cardObj = jsonObj[key];
        
        // 1. 최상위 키 존재 및 객체 여부 확인
        if (typeof cardObj !== 'object' || cardObj === null) {
            return `'${key}' 항목이 누락되었거나 유효한 객체가 아닙니다.`;
        }
        
        // 2. 카드 내부 필수 키 확인 및 데이터 타입, 빈 문자열 검증
        for (const cardKey of requiredCardKeys) {
            if (!(cardKey in cardObj)) {
                return `'${key}' 항목에 필수 키 '${cardKey}'가 누락되었습니다.`;
            }
            
            const value = cardObj[cardKey];
            
            // 모든 값은 문자열이어야 함
            if (cardKey!='number' && typeof value !== 'string') {
                 return `'${key}' 항목의 '${cardKey}' 값은 문자열이어야 합니다. (현재 타입: ${typeof value})`;
            }
            
            // 빈 문자열 검사
            if (cardKey!='number' && value.trim() === '') {
                 return `'${key}' 항목의 '${cardKey}' 값은 비어 있을 수 없습니다.`;
            }
            
            // 3. 'direction' 값 검증
            if (cardKey === 'direction' && !validDirections.includes(value.toLowerCase().trim())) {
                return `'${key}' 항목의 'direction' 값은 'up' 또는 'down'이어야 합니다. (현재: ${value})`;
            }
        }
    }
    
    return null; // 모든 검증 통과
}
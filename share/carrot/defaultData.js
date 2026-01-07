let headerTitleTxt = '🥕 당근 게시물 생성기';
let oocData = [
    {
        title : '캐릭터가 유저를 판매',
        desc : '캐릭터가 유저를 판매하는 글을 작성합니다.',
        ooc : '*ooc : 롤플 중지. IC 대화 금지. 어느날 {{char}}가 {{user}}를 판매한다며 중고 거래 플랫폼 [당근 마켓]에 게시글을 올린다. 게시글 내용 및 채팅 내용을 아래 json 양식에 맞추어 출력한다. 이 때 채팅은 구매 희망자(모브 혹은 {{user}}) 한 명과 대화한 내용을 발췌할 것.* \n\n```\n{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}\n```'
    },
        {
        title : '유저가 캐릭터를 판매',
        desc : '유저가 캐릭터를 판매하는 글을 작성합니다.',
        ooc : '*ooc : 롤플 중지. IC 대화 금지. 어느날 {{user}}가 {{char}}를 판매한다며 중고 거래 플랫폼 [당근 마켓]에 게시글을 올린다. 게시글 내용 및 채팅 내용을 아래 json 양식에 맞추어 출력한다. 이 때 채팅은 구매 희망자(모브 혹은 {{char}}) 한 명과 대화한 내용을 발췌할 것.* \n\n```\n{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}\n```'
    },
        {
        title : '캐릭터는 어떤 물건을 팔까?',
        desc : '캐릭터가 어떤 물건을 파는지 훔쳐보기.',
        ooc : '*ooc : 롤플 중지. IC 대화 금지. 어느날 {{char}}가 물건을 판매한다며 중고 거래 플랫폼 [당근 마켓]에 게시글을 올린다. 게시글 내용 및 채팅 내용을 아래 json 양식에 맞추어 출력한다. 이 때 채팅은 구매 희망자(모브 혹은 {{user}}) 한 명과 대화한 내용을 발췌할 것.* \n\n```\n{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}\n```'
    },
    {
        title : '유저는 어떤 물건을 팔까?',
        desc : '유저가 어떤 물건을 파는지 훔쳐보기.',
        ooc : '*ooc : 롤플 중지. IC 대화 금지. 어느날 {{user}}가 물건을 판매한다며 중고 거래 플랫폼 [당근 마켓]에 게시글을 올린다. 게시글 내용 및 채팅 내용을 아래 json 양식에 맞추어 출력한다. 이 때 채팅은 구매 희망자(모브 혹은 {{char}}) 한 명과 대화한 내용을 발췌할 것.* \n\n```\n{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}\n```'
    },
    {
        title : '캐릭터는 어떤 물건을 살까?',
        desc : '캐릭터가 어떤 물건을 사는지 훔쳐보기.',
        ooc : '*ooc : 롤플 중지. IC 대화 금지. 어느날 제3자가 물건을 판매한다며 중고 거래 플랫폼 [당근 마켓]에 게시글을 올리고 그것을 본 {{char}}가 거래를 시도한다. 게시글 내용 및 채팅 내용을 아래 json 양식에 맞추어 출력한다.* \n\n```\n{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}\n```'
    }
];
let resultPlaceHolder = '{\n"post":{\n"image":"이미지 설명",\n"name":"닉네임",\n"category":"카테고리",\n"location":"동네이름",\n"title":"게시물 이름",\n"time":"시간",\n"price":"가격",\n"text":"본문",\n"chat":"채팅수",\n"inter":"관심수",\n"hits":"조회수",\n"temp":"매너온도",\n"profile":"이모지"\n},\n"chat":[\n{\n"isSeller":"판매자:true,구매자:false",\n"time":"hh:mm",\n"text":"내용"\n},\n{\n... 동일 내용 반복\n}\n]\n}';
let renderContainerData = [
    {
        wrapper : 'postContainer',
        desc : '게시글 저장',
        file : 'carrot_post'
    },
        {
        wrapper : 'chatContainer',
        desc : '채팅 저장',
        file : 'carrot_chat'
    }
];
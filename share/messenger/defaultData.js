//Controls the elements shown in main.html

let headerTitleTxt = '메신저 생성기';
let oocData = [
    {
        title : 'ooc 1 : 평소에 주고받는 메세지',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{char}}와 {{user}}가 평소에 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
    {
        title : 'ooc 2 : 헤어진 후 char가 뭐해...? 라고 보낸다',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{char}}와 {{user}}가 헤어졌다고 가정한다. 어느날 {{char}}가 갑자기 "뭐해...?" 라고 메세지를 보내온다. (말투를 캐릭터성에 맞춰 적절히 변경할 것) 이 때 둘이 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
    {
        title : 'ooc 3 : 헤어진 후 user가 뭐해...? 라고 보낸다',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{char}}와 {{user}}가 헤어졌다고 가정한다. 어느날 {{user}}가 갑자기 "뭐해...?" 라고 메세지를 보낸다. (말투를 캐릭터성에 맞춰 적절히 변경할 것) 이 때 둘이 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
    {
        title : 'ooc 4 : 싸우는 중 user의 자동 완성 대참사',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{char}}와 {{user}}가 메신저로 싸우고있다. 그런데 평소 자동 완성 기능을 사용하는 {{user}}가 상황에 맞지않은 단어를 계속 보내버린다. (자동완성이란, 일부 텍스트를 입력할 때, 시스템이 나머지 단어나 구를 예측하여 추천하고 자동으로 완성해 주는 기능) 이 때 둘이 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
    {
        title : 'ooc 5 : 싸우는 중 char의 자동 완성 대참사',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{char}}와 {{user}}가 메신저로 싸우고있다. 그런데 평소 자동 완성 기능을 사용하는 {{char}}가 상황에 맞지않은 단어를 계속 보내버린다. (자동완성이란, 일부 텍스트를 입력할 때, 시스템이 나머지 단어나 구를 예측하여 추천하고 자동으로 완성해 주는 기능) 이 때 둘이 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
    {
        title : 'ooc 6 : 돈 보내',
        desc : '',
        ooc : '*ooc : 롤플 중지. ic 대화 금지. json만 출력할 것. {{user}}가 갑자기 메신저로 돈을 보내라고 할 때 (액수 필수 기재) {{char}}의 반응을 작성한다. (바로 보내는지, 왜 필요한지 집요하게 묻는지, 보이스 피싱 취급을 하는지 등 캐릭터 성격에 따라 적절한 반응을 보이도록 할 것) 이 때 둘이 주고받은 메세지를 아래 양식에 맞춰 출력. 메세지 개수는 최소 10개 이상일 것.*\n\n{\n“setting”: {“name”: “{{user}}가 {{char}}를 저장한 이름,"profile": “프로필 사진 (이모지)”,“date”: “채팅 날짜“},\n"chat: [\n{"sender": “char/user”,"content": “메세지 내용“,“picture”:”사진 설명 (없을 경우 공란)”,"time": “시간 (오후/오전 hh:mm)”},\n… (동일 양식 반복)\n]\n}'
    },
];
let resultPlaceHolder = '결과 템플릿';
let renderContainerData = [
    {
        wrapper : 'contentContainer',
        desc : '저장',
        file : 'messenger'
    }
];
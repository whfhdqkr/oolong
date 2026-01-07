// set header
const headerTitleElement = document.getElementById('headerTitle');
headerTitleElement.textContent = headerTitleTxt;

// show toast
function showToastMsg(msg) {
    const toast = document.getElementById("toast");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

    toast.textContent = msg;
    toast.classList.add("show");
}

// ooc copy
const template = document.querySelector('#ooc');
template.style.display = 'none';

oocData.forEach(data => {
    const clone = template.cloneNode(true);
    
    clone.removeAttribute('id');
    clone.style.display = 'block';
    
    const toggleBtn = clone.querySelector('.toggle-btn');
    const descTag = clone.querySelector('a');
    const inputOoc = clone.querySelector('.input-ooc');
    const charCount = clone.querySelector('.ooc-char-count');
    const occBtn = clone.querySelector('.occBtn');

    toggleBtn.textContent = data.title;
    descTag.textContent = data.desc;
    inputOoc.value = data.ooc;
    
    charCount.textContent = `글자 수 : ${data.ooc.length}`;


    toggleBtn.addEventListener('click', () => {
        clone.classList.toggle('active');
    });

    inputOoc.addEventListener('input', () => {
        charCount.textContent = `글자 수 : ${inputOoc.value.length}`;
    });

    occBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(inputOoc.value).then(() => {
            showToastMsg('ooc가 복사되었습니다.');
        });
    });

    template.parentElement.appendChild(clone);
});

// result
const resultInput = document.getElementById('inputText');
resultInput.placeholder = resultPlaceHolder;

resultInput.addEventListener('change', () => {
    const data = resultInput.value.trim();

    renderOutput(data);
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    resultInput.value = '';
});

//page load
async function loadTemplate() {
    try {
        const response = await fetch('render.html');
        const html = await response.text();
        document.getElementById('renderArea').innerHTML = html;
        
        initializeUI(); 
    } catch (error) {
        alert('템플릿을 불러오는데 실패했습니다:'+ error);
    }
}
window.addEventListener('DOMContentLoaded', loadTemplate);

function initializeUI() {
    const data = resultInput.value.trim();
    renderOutput(data);
    coustomInit();
}


// save image
const saveBtnTemplate = document.getElementById('saveBtn');
const saveButtonsContainer = document.getElementById('saveButtons');

saveBtnTemplate.style.display = 'none';

renderContainerData.forEach(item => {
    const newBtn = saveBtnTemplate.cloneNode(true);
    
    newBtn.id = '';
    newBtn.style.display = 'inline-block';
    newBtn.textContent = item.desc;
    
    newBtn.addEventListener('click', async () => {
        const node = document.getElementById(item.wrapper);
        
        if (!node) {
            alert(`요소를 찾을 수 없습니다: ${item.wrapper}`);
            return;
        }

        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        html2canvas(node, {
            backgroundColor: null,
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            a.download = `${item.file}_${timestamp}.png`;
            a.click();
            
            showToastMsg(`${item.desc} 저장 완료`);
        });
    });

    saveButtonsContainer.appendChild(newBtn);
});
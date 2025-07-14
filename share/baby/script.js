let currentPage = 0;

const oocText = document.getElementById("ooc-text");
const charCount = document.getElementById("char-count");

    oocText.addEventListener("input", () => {
      charCount.textContent = `글자 수: ${oocText.value.length}`;
    });
    charCount.textContent = `글자 수: ${oocText.value.length}`;

    function copyOOC() {
      oocText.select();
      document.execCommand("copy");
      alert("OOC 내용이 복사되었습니다!");
    }

function generatePages() {
  const input = document.getElementById('input').value.trim();
  const lines = input.split('\n').filter(l => l.trim() !== '');

  const meta = lines[0].replace(/[<>]/g, '').split('₩').map(v => v.trim());
  const [bgColor, indexColor, babyName] = meta;

  const entryLines = lines.slice(1).filter(l => l.startsWith('['));
  const container = document.getElementById('pagesContainer');
  container.innerHTML = '';

  entryLines.forEach((line, index) => {
    const cleaned = line.replace(/[\[\]]/g, '').split('₩');
    const [date, weekRaw, desc, crl, bdp, efw, bpm, diary, comment] = cleaned.map(x => x.trim());

    const weekMatch = weekRaw.match(/(\d+)(주차)\s*(\d+)(일)/);
    let titleHTML = '';

    if (weekMatch) {
      titleHTML = `<span class="number">${weekMatch[1]}  </span>${weekMatch[2]} <span class="number">${weekMatch[3]}  </span>${weekMatch[4]}`;
    } else {
      titleHTML = weekRaw;
    }

    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'page-wrapper';
    if (index === 0) pageWrapper.classList.add('active');

    const page = document.createElement('div');
    page.className = 'page';
    page.style.background = bgColor;

    page.innerHTML = `
      <div class="page-index-vertical" style="background:${indexColor}">${babyName}</div>
      <div class="title-wrapper">
        <div class="title">${titleHTML}</div>
      </div>
      <div class="content">
        <div class="left">
          <div class="info-box">
            <div class="info-row"><span class="info-label">날짜</span><span class="info-value">${date}</span></div>
            <div class="info-row"><span class="info-label">CRL(아기 신장)</span><span class="info-value">${crl}</span></div>
            <div class="info-row"><span class="info-label">BPD(아기 머리 둘레)</span><span class="info-value">${bdp}</span></div>
            <div class="info-row"><span class="info-label">EFW(아기 체중)</span><span class="info-value">${efw}</span></div>
            <div class="info-row"><span class="info-label">심박수</span><span class="info-value">${bpm}</span></div>
          </div>
        </div>
        <div class="right">
          <div class="ultrasound">${desc}</div>
        </div>
      </div>
      <div class="diary">${diary.trim()}<div class="comment">${comment.trim()}</div></div>
    `;

    const commentEl = page.querySelector('.comment');
    const skew = (Math.random() * 10 - 5).toFixed(2);
    const rotate = (Math.random() * 4 - 2).toFixed(2);
    commentEl.style.transform = `skew(${skew}deg) rotate(${rotate}deg)`;

    pageWrapper.appendChild(page);
    container.appendChild(pageWrapper);
  });

    currentPage = 0;
  showPage(0);
}

function showPage(index) {
  const wrappers = document.querySelectorAll('.page-wrapper');
  wrappers.forEach((wrapper, i) => {
    wrapper.classList.toggle('active', i === index);
  });

  document.getElementById('prevBtn').disabled = index === 0;
  document.getElementById('nextBtn').disabled = index === wrappers.length - 1;

  document.getElementById('pageIndicator').textContent = `${index + 1} / ${wrappers.length}`;
}

function prevPage() {
  const pages = document.querySelectorAll('.page-wrapper');
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

function nextPage() {
  const pages = document.querySelectorAll('.page-wrapper');
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

function saveCurrentPageAsImage() {
  const currentWrapper = document.querySelector('.page-wrapper.active');
  if (!currentWrapper) return;

  html2canvas(currentWrapper, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `태아수첩_page${currentPage + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

document.getElementById('input').addEventListener('input', generatePages);
window.addEventListener('DOMContentLoaded', generatePages);

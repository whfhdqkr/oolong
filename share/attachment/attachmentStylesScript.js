const input = document.getElementById("inputText");
const themeToggle = document.getElementById('themeToggle');
const clearBtn = document.getElementById('clearBtn');

let chart;

function renderOutput(data) {
  if (chart) chart.destroy();

  const detailContainer = document.getElementById("detailContainer");
  const template = detailContainer.querySelector(".detail-box");
  
  detailContainer.innerHTML = "";
  detailContainer.appendChild(template);
  const clone = template.cloneNode(true);
  clone.style.display = "block"; 
  
  const frame = document.getElementById("resultFrame");
  frame.style.background = "#ffffff";

  
  if (data[0] && data[0].theme && data[1] && data[1].theme) {
    frame.style.background = `linear-gradient(180deg, ${data[0].theme}, ${data[1].theme})`;
  }

  
  const ctx = document.getElementById("scatterChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: data.map(item => ({
        label: item.name,
        data: [{ x: item.others, y: item.self }],
        pointBackgroundColor: item.point,
        pointRadius: 15
      }))
    },
    options: {
      scales: {
        x: {
          min: -10,
          max: 10,
          title: { display: true, text: "타인에 대한 기대" }
        },
        y: {
          min: -10,
          max: 10,
          title: { display: true, text: "나에 대한 기대" }
        }
      }
    }
  });
  

  

  data.forEach((item, i) => {
    const clone = template.cloneNode(true);
    clone.id = "detail-box-"+i;
    clone.style.display = "block"; 

    const commentMy  = item.myComment ? item.myComment.replace(/\n/g, "<br>") : "";
    const commentOther = item.otherComment ? item.otherComment.replace(/\n/g, "<br>") : "";
    const summary = item.comment ? item.comment.replace(/\n/g, "<br>") : "";

    clone.querySelector(".char-name").textContent = item.name;
    clone.querySelector(".char-attach").textContent = `[${item.attach}]`;
    clone.querySelector(".box-value-inner:nth-child(1) span").textContent = item.self;
    clone.querySelector(".box-value-inner:nth-child(2) span").textContent = item.others;
    clone.querySelector(".box-detail.content").innerHTML = summary;
    clone.querySelector(".box-detail-my-comment").innerHTML  = `<span style="font-size: 30px"> ? </span> ${commentMy}<span style="font-size: 30px"> ? </span>`;
    clone.querySelector(".box-detail-otherh-comment").innerHTML  = `<span style="font-size: 30px"> ? </span> ${commentOther}<span style="font-size: 30px"> ? </span>`;


    detailContainer.appendChild(clone);
  });
}

input.addEventListener("change", () => {
    const data = input.value.trim();

    const blocks = [...data.matchAll(/\[([\s\S]*?)\]/g)].map(m => m[1]);

    const parsed = blocks.map(str => {
          const f = str.split("|");
          return {
                name: f[0],
                self: Number(f[1]),
                others: Number(f[2]),
                theme: f[3],
                point: f[4],
                attach: f[5],
                comment: f[6],
                myComment: f[7],
                otherComment: f[8]
          };
    });


    renderOutput(parsed);
    updateTheme();
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  renderOutput('');
});

function updateTheme() {
    document.body.classList.toggle("light");

    //const isLight = document.body.classList.contains("light");
  
  const isDark = themeToggle.checked;
    document.getElementById("themeToggleText").textContent = isDark ? "🌙 Dark" : "☀️ Light";

    const fontColor = isDark ? "#e0e0e0" : "#333";
    const gridColor = isDark ? "#828282" : "#b1b1b1";

    if (chart) {
        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.x.ticks.color = fontColor;
        chart.options.scales.x.title.color = fontColor;

        chart.options.scales.y.grid.color = gridColor;
        chart.options.scales.y.ticks.color = fontColor;
        chart.options.scales.y.title.color = fontColor;

        chart.options.plugins.legend.labels.color = fontColor;

        chart.update();
    }
}

document.getElementById("themeToggle").addEventListener("click", () => {
    updateTheme();
});


document.getElementById("oocBtn").addEventListener("click", async () => {
  await navigator.clipboard.writeText("ooc : 롤플 잠시 중지. ooc로만 대답할 것.ic 대화금지.\n캐릭터 성격, 페르소나, 유저노트, 대화내용 기반의 서사를 적극 반영하여 두 캐릭터의 4가지 성인애착유형에 대한 분석을 아래 규칙에 따라 작성해줘.\n\n- 타인에 대한 기대,나에 대한 기대 지표: -10 ~ 10 사이의 값\n- 안졍형 : 타인 기대, 나의기대가 양수\n- 불안형 : 타인 기대가 양수, 나의 기대가 음수\n- 공포-회피형 : 타인 기대, 나의 기대가 음수\n- 회피형 : 타인 기대가 음수, 나의 기대가 양수\n- 출력 양식\n```\n[이름|나에 대한 기대 수치|타인에 대한 기대 수치|테마 컬러 hex 코드|포인트 컬러 hex 코드|애착 유형|상세 분석(700자 이상)|스스로가 말한 한 줄 코멘트|상대방이 말한 한 줄 코멘트]\n```");

  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
});


document.getElementById("saveBtn").addEventListener("click", async () => {
  const node = document.getElementById("captureWrapper");

    await new Promise(r => requestAnimationFrame(() =>
    requestAnimationFrame(r)
  ));
    
    html2canvas(node, {
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

document.getElementById("saveChartBtn").addEventListener("click", async () => {
    const chartCanvas = document.querySelector(".chart-wrapper");

    const data = document.getElementById("inputText").value.trim();

    const blocks = [...data.matchAll(/\[([\s\S]*?)\]/g)].map(m => m[1]);

    const parsed = blocks.map(str => {
          const f = str.split("|");
          return {
                name: f[0],
                self: Number(f[1]),
                others: Number(f[2]),
                theme: f[3],
                point: f[4],
                attach: f[5],
                comment: f[6],
                myComment: f[7],
                otherComment: f[8]
          };
    });
    
    await new Promise(r => requestAnimationFrame(() =>
    requestAnimationFrame(r)
  ));
    
      html2canvas(chartCanvas, {
        scale: 2,
          useCORS: true,
        backgroundColor: parsed[0].theme
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    
    
});

document.getElementById("saveCard1Btn").addEventListener("click", async () => {
    const box = document.getElementById("detail-box-0");
    if (!box) return;
    //alert();
    
    await new Promise(r => requestAnimationFrame(() =>
    requestAnimationFrame(r)
  ));

    html2canvas(box, {
            scale: 2,
            //backgroundColor: null
          }).then(canvas => {
            const link = document.createElement("a");
            link.download = `detail-${1}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
          });
});

document.getElementById("saveCard2Btn").addEventListener("click", async () => {
    const box = document.getElementById("detail-box-1");
    if (!box) return;
    //alert();
    
    await new Promise(r => requestAnimationFrame(() =>
    requestAnimationFrame(r)
  ));

    html2canvas(box, {
            scale: 2,
            //backgroundColor: null
          }).then(canvas => {
            const link = document.createElement("a");
            link.download = `detail-${2}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
          });
});

updateTheme();
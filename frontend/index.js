/* global axios */
const itemTemplate = document.querySelector("#diary-item-template");
const diaryList = document.querySelector("#diaries");
const editWindow = document.querySelector('#edit-window');
const viewWindow = document.querySelector('#view-window');
const newDiaryButton = document.querySelector("#add-diary");
const tagFilter = document.querySelector("#tag-filter");
const moodFilter = document.querySelector("#mood-filter");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

function convertDateString(dateString) {
  const d = new Date(dateString);
  const year = String(d.getFullYear());
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  const day = "日一二三四五六"[d.getDay()];
  return `${year}.${month}.${date} (${day})`;
}

function getNowDateString() {
  return convertDateString(Date());
}

async function main() {
  viewWindow.style.display = "none";
  editWindow.style.display = "none";
  setupEventListeners();
  try {
    renderAllDiary();
  } catch (error) {
    alert("Failed to load diaries!");
  }
}

function renderAllDiary() {
  diaryList.innerHTML = "";
  instance.get('diary').then(diaries => {
    diaries.data.forEach((diary) => {
      if (tagFilter.querySelector(`#${diary.tag}`).checked &&
          moodFilter.querySelector(`#${diary.mood}`).checked) {
        renderDiary(diary);
      }
      else {
        return;
      }
    })
  })
}

function renderDiary(diary) {
  const item = createDiaryElement(diary);
  diaryList.appendChild(item);
}

function createDiaryElement(diary) {
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector(".diary-item").id = diary.id
  item.querySelector('#content').innerHTML = diary.content
  item.querySelector('#mood').innerText = diary.mood
  item.querySelector('#tag').innerText = diary.tag
  item.querySelector('#date').innerText = diary.date
  item.querySelector(".diary-item").addEventListener("click", () => {
    if(viewWindow.style.display === "block" ||
       editWindow.style.display === "block") {
      return;
    }
    setupViewWindow(diary);
    document.querySelector("#view-window").style.display = "block";
  })
  return item;
}

function setupViewWindow(diary) {
  viewWindow.querySelector("#tag").innerText = diary.tag;
  viewWindow.querySelector("#mood").innerText = diary.mood;
  viewWindow.querySelector("#content").innerHTML = diary.content;
  viewWindow.querySelector("#date").innerText = diary.date;
  viewWindow.querySelector("#edit").onclick = () => {
    setupEditWindow(diary);
    viewWindow.style.display = "none";
    editWindow.style.display = "block";
  }
  viewWindow.querySelector("#back").onclick = () => {
    viewWindow.style.display = "none";
  }
}

function setupEditWindow(diary) {
  const tagSelect = editWindow.querySelector("#tag-list");
  tagSelect.querySelector(`option[value=${diary.tag}]`).selected = "selected";
  const moodSelect = editWindow.querySelector("#mood-list");
  moodSelect.querySelector(`option[value=${diary.mood}]`).selected = "selected";
  const currentContent = editWindow.querySelector("textarea");
  currentContent.value = diary.content;

  const normalDate = editWindow.querySelector("#header #date");
  normalDate.style.display = "block";
  normalDate.innerText = diary.date;

  const customDate = editWindow.querySelector("#custom-date");
  customDate.style.display = "none";
  customDate.value = ""

  editWindow.querySelector("#edit-date-button").onclick = () => {
    customDate.style.display = "block";
    normalDate.style.display = "none";
  }

  const showViewWindow = (diary) => {
    setupViewWindow(diary);
    viewWindow.style.display = "block";
  }
  editWindow.querySelector("#save").onclick = () => {
    if (customDate.style.display === "block") {
      if (customDate.value === '') {
        customDate.value = ""
        alert("Invalid Date");
        return;
      }
      else {
        alert(`change date to ${customDate.value}`);
        diary.date = convertDateString(customDate.value);
      }
    }
    editWindow.style.display = "none";
    diary.tag = tagSelect.value;
    diary.mood = moodSelect.value;
    diary.content = currentContent.value;
    if (diary.id === "-1") {
      instance.post("/diary", diary).then((ret) => {
        renderAllDiary();
        showViewWindow(ret.data);
      });
    }
    else {
      instance.put("/diary", diary).then((ret) => {
        renderAllDiary();
        showViewWindow(ret.data);
      });
    }
  }
  editWindow.querySelector("#cancel").onclick = () => {
    editWindow.style.display = "none";
    if (diary.id !== '-1' ) {
      showViewWindow(diary);
    }
  }
}

function setupEventListeners() {
  newDiaryButton.onclick = () => {
    if(viewWindow.style.display === "block" ||
       editWindow.style.display === "block") {
      return;
    }
    const defaultDiary = {
      "date": getNowDateString(),
      "content": "",
      "tag": '學業',
      "mood": '快樂',
      "id": "-1"
    };
    setupEditWindow(defaultDiary);
    editWindow.style.display = "block";
  }
  ['學業', '人際', '社團'].forEach((tag) => {
    tagFilter.querySelector(`#${tag}`).onclick = () => {
      renderAllDiary();
    }
  });
  ['快樂', '生氣', '難過'].forEach((mood) => {
    moodFilter.querySelector(`#${mood}`).onclick = () => {
      renderAllDiary();
    }
  });
}

main();

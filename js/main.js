const tab = document.querySelector('#tab');
const tabSizes = document.querySelector('#tabSizes');
const resetButton = document.querySelector('#reset-btn');

let tabSize = 8;

function clearChecked() {
  let allChecked = document.querySelectorAll('#tab > div.checked') || []
  allChecked.forEach(el => {
    el.classList.remove('checked');
  })
}

function drawLines() {
  clearChecked()

  let allSelected = document.querySelectorAll('#tab > div.selected') || []
  
  allSelected.forEach(el => {
    let [posX, posY] = el.id
      .substr(1)
      .split('-')
      .map(val => Number(val))

    let diagonais = []
  
    for (let i = 0; i < tabSize; i++) {
      diagonais.push(`${posX}-${i}`)
    }
  
    for (let i = 0; i < tabSize; i++) {
      diagonais.push(`${i}-${posY}`)
    }

    let x = posX;
    let y = posY;
    
    while(x > 0 && y < tabSize) {
      x--;
      y++;

      diagonais.push(`${x}-${y}`)
    }
    
    while(x < tabSize && y > 0) {
      x++
      y--;
      diagonais.push(`${x}-${y}`)
    }
    
    x = posX;
    y = posY;

    while(x > 0 && y > 0) {
      x--;
      y--;
      diagonais.push(`${x}-${y}`)
    }

    while(x < tabSize && y < tabSize) {
      x++;
      y++;
      diagonais.push(`${x}-${y}`)
    }

    diagonais = [...new Set([...diagonais])]

    diagonais.forEach(diag => {
      const el = document.querySelector(`#p${diag}`)
      if (el && !el.classList.contains('selected')) {
        el.classList.add(`checked`)
      }
    })
  })
}

function onClickTabItem(event) {
  let { target } = event
  
  if (
    target.classList.contains('checked') ||
    target.classList.contains('selected')
  ) {
    return;
  }
  
  target.classList.toggle('selected')

  drawLines()

  target.classList.remove('checked')
}

function drawTab(size = tabSize) {
  tab.innerHTML = '';
  tabSize = size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let ele = document.createElement('div')
      ele.id = `p${i}-${j}`;
      ele.innerHTML = `p${i}-${j}`;

      ele.onclick = onClickTabItem

      tab.appendChild(ele)
    }  
  }

  let style = `repeat(${size}, 50px)`;
  tab.style.gridTemplateColumns = style ;
  tab.style.gridTemplateRows = style;
}

tabSizes.addEventListener('change', (event) => {
  let { target: { value } } = event
  value = Number(value);
  drawTab(value);
})

resetButton.addEventListener('click', () => drawTab())

drawTab();
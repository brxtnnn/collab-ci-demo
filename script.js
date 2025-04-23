const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const clearSavedBtn = document.getElementById('clearSavedBtn');
const palette = document.getElementById('palette');
const savedPalettesContainer = document.getElementById('savedPalettes');

let currentPalette = [];

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert(`Copied ${text} to clipboard!`);
}

function generatePalette() {
  palette.innerHTML = '';
  currentPalette = [];
  for(let i = 0; i < 5; i++) {
    const color = getRandomColor();
    currentPalette.push(color);

    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-box';
    colorDiv.style.backgroundColor = color;
    colorDiv.textContent = color;
    colorDiv.title = 'Click to copy color code';
    colorDiv.onclick = () => copyToClipboard(color);

    palette.appendChild(colorDiv);
  }
}

function saveCurrentPalette() {
  if (currentPalette.length === 0) {
    alert('No palette to save! Generate a palette first.');
    return;
  }
  let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
  savedPalettes.push(currentPalette);
  localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  alert('Palette saved!');
  renderSavedPalettes();
}

function renderSavedPalettes() {
  savedPalettesContainer.innerHTML = '';
  const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];

  if (savedPalettes.length === 0) {
    savedPalettesContainer.textContent = 'No saved palettes.';
    return;
  }

  savedPalettes.forEach((paletteColors, index) => {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'saved-palette';

    paletteColors.forEach(color => {
      const colorBox = document.createElement('div');
      colorBox.className = 'saved-color-box';
      colorBox.style.backgroundColor = color;
      colorBox.textContent = color;
      colorBox.title = 'Click to copy color code';
      colorBox.onclick = () => copyToClipboard(color);
      paletteDiv.appendChild(colorBox);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteSavedPalette(index);

    paletteDiv.appendChild(deleteBtn);
    savedPalettesContainer.appendChild(paletteDiv);
  });
}

function deleteSavedPalette(index) {
  let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
  savedPalettes.splice(index, 1);
  localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  renderSavedPalettes();
}

function clearSavedPalettes() {
  if (confirm('Are you sure you want to clear all saved palettes?')) {
    localStorage.removeItem('savedPalettes');
    renderSavedPalettes();
  }
}

// Event listeners
generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', saveCurrentPalette);
clearSavedBtn.addEventListener('click', clearSavedPalettes);

// Initial load
generatePalette();
renderSavedPalettes();

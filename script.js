const generateBtn = document.getElementById('generateBtn');
const palette = document.getElementById('palette');

function getRandomColor() {
  // Generate random hex color code
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generatePalette() {
  palette.innerHTML = '';
  for(let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-box';
    colorDiv.style.backgroundColor = color;
    colorDiv.textContent = color;
    colorDiv.title = 'Click to copy color code';
    colorDiv.onclick = () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    };
    palette.appendChild(colorDiv);
  }
}

generateBtn.addEventListener('click', generatePalette);

// Generate initial palette on page load
generatePalette();

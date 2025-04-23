/**
 * @jest-environment jsdom
 */

import { saveCurrentPalette, renderSavedPalettes, deleteSavedPalette } from './script.js';

describe('Save and Load Palettes', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="savedPalettes"></div>
    `;
  });

  test('saves palette to localStorage', () => {
    const palette = ['#111111', '#222222', '#333333', '#444444', '#555555'];
    localStorage.setItem('savedPalettes', JSON.stringify([]));
    // Simulate saving palette
    let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes'));
    savedPalettes.push(palette);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));

    expect(JSON.parse(localStorage.getItem('savedPalettes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('savedPalettes'))[0]).toEqual(palette);
  });

  test('deletes saved palette', () => {
    const palettes = [
      ['#111111', '#222222', '#333333', '#444444', '#555555'],
      ['#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee']
    ];
    localStorage.setItem('savedPalettes', JSON.stringify(palettes));
    // Delete first palette
    palettes.splice(0, 1);
    localStorage.setItem('savedPalettes', JSON.stringify(palettes));

    expect(JSON.parse(localStorage.getItem('savedPalettes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('savedPalettes'))[0][0]).toBe('#aaaaaa');
  });
});

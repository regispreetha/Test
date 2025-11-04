# 🎸 Web Guitar Studio

A fully-featured web-based guitar application that allows you to play, record, input chords/notes, and replay your music automatically.

## Features

### 🎵 Play Guitar
- **Virtual Fretboard**: Click on frets across 6 guitar strings (E, B, G, D, A, E)
- **Keyboard Shortcuts**: Use your computer keyboard to play notes
  - `a,s,d,f,g,h,j,k` for C4-C5 scale
  - `z,x,c,v,b,n,m` for C3-B3 (lower octave)
  - `w,e,t,y,u` for sharps (C#4, D#4, F#4, G#4, A#4)

### 🎹 Quick Chords
- One-click chord buttons for common chords: C, D, E, F, G, A, Am, Em, Dm, G7, Cmaj7, Am7
- Realistic guitar-like sound with multiple oscillators and ADSR envelope

### ⏺️ Recording
- **Record**: Capture your performance with precise timing
- **Stop**: End your recording session
- **Play**: Replay your recorded performance automatically
- **Clear**: Reset recordings and sequences

### 📝 Chord/Note Input System
- **Text Input**: Type chords and notes directly
  - Examples: `C Am F G` (chords)
  - Examples: `C4 E4 G4 B4` (notes)
- **Build Sequences**: Add multiple chords/notes to create a sequence
- **Auto-Playback**: Play entire sequences automatically with proper timing

## How to Use

### 1. Open the Application
Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge recommended).

### 2. Play Notes
- **Click frets** on the virtual guitar strings
- **Press keyboard keys** (see keyboard shortcuts above)
- **Click quick chord buttons** for instant chords

### 3. Record Your Performance
1. Click the **Record** button (⏺)
2. Play notes by clicking frets or pressing keyboard keys
3. Click **Stop** (⏹) when finished
4. Click **Play** (▶) to hear your recording

### 4. Create Sequences
1. Type chords or notes in the input field
   - Example: `C Am F G`
   - Example: `C4 E4 G4 C5`
2. Click **Add to Sequence** to build a sequence
3. Watch the sequence display update
4. Use **Play Now** to immediately play what you typed
5. Recorded sequences can be played back later

### 5. Supported Chords
- **Major**: C, D, E, F, G, A, B
- **Minor**: Am, Dm, Em
- **Seventh**: G7
- **Major Seventh**: Cmaj7, Fmaj7
- **Minor Seventh**: Am7, Dm7

### 6. Supported Notes
All notes from C2 to B5, including sharps (e.g., C#4, F#3)

## Technical Details

### Audio Engine
- Uses **Web Audio API** for high-quality sound synthesis
- Multiple oscillators (triangle, sine) for rich guitar-like tones
- ADSR envelope for realistic attack and decay
- Precise timing system for accurate playback

### Recording System
- Captures notes with millisecond precision
- Stores note data with timestamps
- Accurate playback maintains original timing

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Requires modern browser with Web Audio API support

## File Structure

```
/
├── index.html    # Main HTML structure
├── styles.css    # Styling and responsive design
├── app.js        # JavaScript audio engine and logic
└── README.md     # This file
```

## Features Highlights

✅ Play guitar sounds with realistic tones
✅ Record your performance
✅ Input chords and notes via text
✅ Automatic playback of recordings
✅ Build and play note sequences
✅ Keyboard shortcuts for quick playing
✅ Beautiful, responsive UI
✅ No external dependencies
✅ Runs completely in the browser

## Future Enhancements

Potential features for future versions:
- Save/load recordings
- Export to MIDI or audio files
- More chord types (diminished, augmented, etc.)
- Tempo control
- Metronome
- Effects (reverb, delay, distortion)
- Multiple instrument sounds

## Credits

Built with vanilla JavaScript, HTML5, and CSS3.
Uses Web Audio API for sound synthesis.

---

**Enjoy making music! 🎵🎸**

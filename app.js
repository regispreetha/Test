// Web Guitar Application
// Audio Engine and Recording System

class GuitarApp {
    constructor() {
        this.audioContext = null;
        this.isRecording = false;
        this.isPlaying = false;
        this.recordedNotes = [];
        this.startTime = null;
        this.recordingTimer = null;
        this.sequence = [];

        this.initAudioContext();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }

    initAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Note frequency mapping
    noteFrequencies = {
        'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31,
        'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
        'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61,
        'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
        'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
        'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
    };

    // Chord definitions (notes in each chord)
    chordDefinitions = {
        'C': ['C4', 'E4', 'G4'],
        'D': ['D4', 'F#4', 'A4'],
        'E': ['E4', 'G#4', 'B4'],
        'F': ['F4', 'A4', 'C5'],
        'G': ['G4', 'B4', 'D5'],
        'A': ['A4', 'C#5', 'E5'],
        'B': ['B4', 'D#5', 'F#5'],
        'Am': ['A4', 'C5', 'E5'],
        'Dm': ['D4', 'F4', 'A4'],
        'Em': ['E4', 'G4', 'B4'],
        'G7': ['G4', 'B4', 'D5', 'F5'],
        'Cmaj7': ['C4', 'E4', 'G4', 'B4'],
        'Am7': ['A4', 'C5', 'E5', 'G5'],
        'Fmaj7': ['F4', 'A4', 'C5', 'E5'],
        'Dm7': ['D4', 'F4', 'A4', 'C5']
    };

    // Play a single note with guitar-like sound
    playNote(note, duration = 0.5) {
        const frequency = this.noteFrequencies[note];
        if (!frequency) {
            console.error('Unknown note:', note);
            return;
        }

        const now = this.audioContext.currentTime;

        // Create oscillators for richer guitar-like sound
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const oscillator3 = this.audioContext.createOscillator();

        const gainNode = this.audioContext.createGain();

        // Main tone
        oscillator1.type = 'triangle';
        oscillator1.frequency.setValueAtTime(frequency, now);

        // Harmonic
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(frequency * 2, now);

        // Sub-harmonic for depth
        oscillator3.type = 'sine';
        oscillator3.frequency.setValueAtTime(frequency * 0.5, now);

        // Mix oscillators
        const gain1 = this.audioContext.createGain();
        const gain2 = this.audioContext.createGain();
        const gain3 = this.audioContext.createGain();

        gain1.gain.setValueAtTime(0.4, now);
        gain2.gain.setValueAtTime(0.2, now);
        gain3.gain.setValueAtTime(0.1, now);

        oscillator1.connect(gain1);
        oscillator2.connect(gain2);
        oscillator3.connect(gain3);

        gain1.connect(gainNode);
        gain2.connect(gainNode);
        gain3.connect(gainNode);

        gainNode.connect(this.audioContext.destination);

        // ADSR Envelope (Attack, Decay, Sustain, Release)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);  // Decay
        gainNode.gain.setValueAtTime(0.2, now + 0.1);           // Sustain
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Release

        oscillator1.start(now);
        oscillator2.start(now);
        oscillator3.start(now);

        oscillator1.stop(now + duration);
        oscillator2.stop(now + duration);
        oscillator3.stop(now + duration);

        // Record note if recording
        if (this.isRecording && this.startTime) {
            const timestamp = Date.now() - this.startTime;
            this.recordedNotes.push({ note, timestamp });
            this.updateRecordedNotesDisplay();
        }
    }

    // Play a chord (multiple notes at once)
    playChord(chordName) {
        const notes = this.chordDefinitions[chordName];
        if (!notes) {
            console.error('Unknown chord:', chordName);
            return;
        }

        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note, 1.0);
            }, index * 10); // Slight stagger for more realistic sound
        });
    }

    // Parse input string (could be notes or chords)
    parseInput(input) {
        const items = input.trim().split(/\s+/);
        const result = [];

        items.forEach(item => {
            if (this.chordDefinitions[item]) {
                result.push({ type: 'chord', value: item });
            } else if (this.noteFrequencies[item]) {
                result.push({ type: 'note', value: item });
            }
        });

        return result;
    }

    // Add to sequence
    addToSequence(input) {
        const items = this.parseInput(input);
        if (items.length > 0) {
            this.sequence = this.sequence.concat(items);
            this.updateSequenceDisplay();
            return true;
        }
        return false;
    }

    // Play the current sequence
    async playSequence() {
        if (this.sequence.length === 0) {
            alert('Sequence is empty. Add some chords or notes first!');
            return;
        }

        this.isPlaying = true;
        this.updateStatus('Playing sequence...');
        this.disableControls(true);

        for (let i = 0; i < this.sequence.length; i++) {
            if (!this.isPlaying) break;

            const item = this.sequence[i];
            if (item.type === 'chord') {
                this.playChord(item.value);
            } else if (item.type === 'note') {
                this.playNote(item.value, 0.5);
            }

            await this.sleep(600); // Wait between items
        }

        this.isPlaying = false;
        this.updateStatus('Sequence complete');
        this.disableControls(false);
    }

    // Play recorded notes
    async playRecording() {
        if (this.recordedNotes.length === 0) {
            alert('No recording to play. Record something first!');
            return;
        }

        this.isPlaying = true;
        this.updateStatus('Playing recording...');
        this.disableControls(true);

        const playStartTime = Date.now();
        let currentIndex = 0;

        const playbackInterval = setInterval(() => {
            if (!this.isPlaying || currentIndex >= this.recordedNotes.length) {
                clearInterval(playbackInterval);
                this.isPlaying = false;
                this.updateStatus('Playback complete');
                this.disableControls(false);
                return;
            }

            const elapsed = Date.now() - playStartTime;
            const note = this.recordedNotes[currentIndex];

            if (elapsed >= note.timestamp) {
                this.playNote(note.note, 0.5);
                currentIndex++;
            }
        }, 10); // Check every 10ms for precise timing
    }

    // Recording controls
    startRecording() {
        this.isRecording = true;
        this.recordedNotes = [];
        this.startTime = Date.now();
        this.updateStatus('Recording...');

        // Start timer
        let seconds = 0;
        this.recordingTimer = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            document.getElementById('recordingTime').textContent =
                `${mins}:${secs.toString().padStart(2, '0')}`;
        }, 1000);

        document.getElementById('recordBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    }

    stopRecording() {
        this.isRecording = false;
        clearInterval(this.recordingTimer);
        this.updateStatus(`Recording stopped - ${this.recordedNotes.length} notes captured`);

        document.getElementById('recordBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('playBtn').disabled = false;
    }

    clearRecording() {
        this.recordedNotes = [];
        this.sequence = [];
        this.updateRecordedNotesDisplay();
        this.updateSequenceDisplay();
        this.updateStatus('Cleared all recordings and sequences');
        document.getElementById('playBtn').disabled = true;
        document.getElementById('recordingTime').textContent = '0:00';
    }

    // UI Updates
    updateStatus(message) {
        document.getElementById('statusText').textContent = message;
    }

    updateRecordedNotesDisplay() {
        const display = document.getElementById('recordedNotes');
        if (this.recordedNotes.length === 0) {
            display.textContent = 'No recording yet';
        } else {
            const noteSummary = this.recordedNotes
                .map(n => n.note)
                .join(' → ');
            display.textContent = `${this.recordedNotes.length} notes: ${noteSummary}`;
        }
    }

    updateSequenceDisplay() {
        const display = document.getElementById('sequenceDisplay');
        if (this.sequence.length === 0) {
            display.textContent = 'Empty';
        } else {
            const items = this.sequence
                .map(item => item.value)
                .join(' → ');
            display.textContent = items;
        }
    }

    disableControls(disabled) {
        document.getElementById('recordBtn').disabled = disabled;
        document.getElementById('clearBtn').disabled = disabled;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Event Listeners
    setupEventListeners() {
        // Fret buttons
        document.querySelectorAll('.fret').forEach(button => {
            button.addEventListener('click', (e) => {
                const note = e.target.dataset.note;
                this.playNote(note);
                this.animateButton(e.target);
            });
        });

        // Quick chord buttons
        document.querySelectorAll('.chord-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const chord = e.target.dataset.chord;
                this.playChord(chord);
                this.animateButton(e.target);
            });
        });

        // Control buttons
        document.getElementById('recordBtn').addEventListener('click', () => {
            this.startRecording();
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stopRecording();
        });

        document.getElementById('playBtn').addEventListener('click', () => {
            this.playRecording();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            if (confirm('Clear all recordings and sequences?')) {
                this.clearRecording();
            }
        });

        // Chord input
        document.getElementById('addChordBtn').addEventListener('click', () => {
            const input = document.getElementById('chordInput').value;
            if (this.addToSequence(input)) {
                document.getElementById('chordInput').value = '';
            } else {
                alert('Invalid input. Please enter valid notes or chords.');
            }
        });

        document.getElementById('playChordBtn').addEventListener('click', () => {
            const input = document.getElementById('chordInput').value;
            const items = this.parseInput(input);

            items.forEach((item, index) => {
                setTimeout(() => {
                    if (item.type === 'chord') {
                        this.playChord(item.value);
                    } else if (item.type === 'note') {
                        this.playNote(item.value);
                    }
                }, index * 600);
            });
        });

        // Enter key for chord input
        document.getElementById('chordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('addChordBtn').click();
            }
        });
    }

    // Keyboard shortcuts for playing notes
    setupKeyboardShortcuts() {
        const keyMap = {
            'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4',
            'g': 'G4', 'h': 'A4', 'j': 'B4', 'k': 'C5',
            'w': 'C#4', 'e': 'D#4', 't': 'F#4', 'y': 'G#4', 'u': 'A#4',
            'z': 'C3', 'x': 'D3', 'c': 'E3', 'v': 'F3', 'b': 'G3', 'n': 'A3', 'm': 'B3'
        };

        document.addEventListener('keydown', (e) => {
            // Ignore if typing in input field
            if (e.target.tagName === 'INPUT') return;

            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                this.playNote(note);
            }
        });
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#ff6b6b';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '';
        }, 100);
    }
}

// Initialize app when page loads
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new GuitarApp();
    console.log('Guitar App initialized!');
    console.log('Keyboard shortcuts: a,s,d,f,g,h,j,k for C4-C5 scale');
});

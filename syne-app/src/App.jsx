import React, {useEffect, useLayoutEffect} from 'react';
import "./App.css";
import * as Tone from 'tone';

function App() {
  //Character-to-number conversion
  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97

  const playKey = (note) => {
    // const now = Tone.now();
    // synth.triggerAttack(note, now);
    // synth.triggerRelease(note, now + 1)
    console.log(note);
  }

  //Synth + Keys
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const pianoKeys = document.querySelectorAll(".piano-keys .key");

  useLayoutEffect(() => {
    document.addEventListener("keydown", async () => {
      await Tone.start();
    });
  }, [])
  
  return (
    <>
    <div className="piano-container">
      <header>
          <div className="column volume-slider">
            <span>Volume</span><input type="range" min="0" max="1" defaultValue="0.5" step="any"></input>
          </div>
          <div className="column keys-checkbox">
            <span>Show Keys</span><input type="checkbox" defaultChecked></input>
          </div>
      </header>
      <ul className="piano-keys">
          <li className="key white" key="C4" onClick={() => playKey("C4")}><span>C4</span></li>
          <li className="key black" key="C#4" onClick={() => playKey("C#4")}><span>C#4</span></li>
          <li className="key white" key="D4" onClick={() => playKey("D4")}><span>D4</span></li>
          <li className="key black" key="D#4" onClick={() => playKey("D#4")}><span>D#4</span></li>
          <li className="key white" key="E4" onClick={() => playKey("E4")}><span>E4</span></li>
          <li className="key white" key="F4" onClick={() => playKey("F4")}><span>F4</span></li>
          <li className="key black" key="F#4" onClick={() => playKey("F#4")}><span>F#4</span></li>
          <li className="key white" key="G4" onClick={() => playKey("G4")}><span>G4</span></li>
          <li className="key black" key="G#4" onClick={() => playKey("G#4")}><span>G#4</span></li>
          <li className="key white" key="A4" onClick={() => playKey("A4")}><span>A4</span></li>
          <li className="key black" key="A#4" onClick={() => playKey("A#4")}><span>A#4</span></li>
          <li className="key white" key="B4" onClick={() => playKey("B4")}><span>B4</span></li>
          <li className="key white" key="C5" onClick={() => playKey("C5")}><span>C5</span></li>
          <li className="key black" key="C#5" onClick={() => playKey("C#5")}><span>C#5</span></li>
          <li className="key white" key="D5" onClick={() => playKey("D5")}><span>D5</span></li>
          <li className="key black" key="D#5" onClick={() => playKey("D#5")}><span>D#5</span></li>
          <li className="key white" key="E5"onClick={() => playKey("E5")}><span>E5</span></li>
        </ul>
    </div>
    </>
  )
}

export default App

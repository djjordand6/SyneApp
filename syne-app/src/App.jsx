import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./App.css";
import * as Tone from 'tone';

function App() {
  //UseStates for possible Synth options (envelope only atm)
  const [attackState, setAttack] = useState(0.005);           //Default val: 0.005
  const [decayState, setDecay] = useState(0.1);               //Default val: 0.1
  const [sustainState, setSustain] = useState(0.3);           //Default val: 0.3
  const [releaseState, setRelease] = useState(1);             //Default val: 1
  const [oscillatorType, setOscType] = useState("triangle");  //Default val: triangle

  //Oscillator option state
  const [osc, setOsc] = useState({
    type: oscillatorType,
    count: 3,
    harmonicity: 1,
    modulationFrequency: 0.4,
    modulationIndex: 2,
    modulationType: "square",
    phase: 0,
    spread: 20,
    width: 0.2
  });

  //Envelope option state
  const [env, setEnv] = useState({
    attack: attackState,
    decay: decayState,
    sustain: sustainState,
    release: releaseState
  });

  //Synth Options (default options > oscillator + env states)
  const [options, setOptions] = useState({
    oscillator: osc,
    envelope: env
  });

  //Synth + Keys
  const pianoKeys = document.querySelectorAll(".piano-keys .key");

  const [synth, setSynth] = useState(new Tone.PolySynth(Tone.Synth, options).toDestination());

  //Character-to-number conversion
  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97

  const playKey = (note) => {
    const now = Tone.now();
    synth.triggerAttack(note, now);
    synth.triggerRelease(note, now + 0.25)
    //console.log(note);
  }

  const changeSynth = () => {
    //Metallic ePiano
    // setSynth(new Tone.PolySynth(Tone.Synth, {
    //   oscillator: {
    //     type: "sawtooth6",
    //     count: 3,
    //     harmonicity: 1,
    //     modulationFrequency: 0.01,
    //     modulationIndex: 2,
    //     phase: 0,
    //     spread: 20,
    //     width: 0.2
    //   },
    //   envelope: {
    //     attack: 0.005,
    //     decay: 0.1 ,
    //     sustain: 0.3 ,
    //     release: 1
    //   }
    // }).toDestination());

    // console.log(synth);

    setAttack(0.007);
    setSustain(0.25);
    setOscType("sine");

    console.log(osc);
    console.log(env);
  }

  //Updates all states (incl. options AND synth)
  const updateSynth = () => {
    setOsc({
      type: oscillatorType,
      count: 3,
      harmonicity: 1,
      modulationFrequency: 0.4,
      modulationIndex: 2,
      modulationType: "square",
      phase: 0,
      spread: 20,
      width: 0.2
    });

    setEnv({
        attack: attackState,
        decay: decayState,
        sustain: sustainState,
        release: releaseState
    });

    setOptions({
      oscillator: osc,
      envelope: env
    });

    setSynth(new Tone.PolySynth(Tone.Synth, options).toDestination());
  }

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
      <button onClick={() => changeSynth()}>CHANGE SYNTH</button> <button onClick={() => updateSynth()}>UPDATE SYNTH</button>
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

import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./App.css";
import * as Tone from 'tone';
import sounds from "./data/sounds";

function App() {
  //State for AudioContext start
  const [contextStarted, setStarted] = useState(false);

  //UseStates for possible Synth options (envelope only atm)
  const [attackState, setAttack] = useState(0.005);           //Default val: 0.005
  const [decayState, setDecay] = useState(0.1);               //Default val: 0.1
  const [sustainState, setSustain] = useState(0.3);           //Default val: 0.3
  const [releaseState, setRelease] = useState(1);             //Default val: 1
  const [oscillatorType, setOscType] = useState("triangle");  //Default val: triangle
  const [volume, setVolume] = useState(0);
  const [noteDrag, setNoteDrag] = useState(0.25);

  //Keyword search
  const [keywords, setKeywords] = useState([]);

  //Oscillator option state
  // const [osc, setOsc] = useState({
  //   type: oscillatorType,
  //   count: 3,
  //   harmonicity: 1,
  //   modulationFrequency: 0.4,
  //   modulationIndex: 2,
  //   modulationType: "square",
  //   phase: 0,
  //   spread: 20,
  //   width: 0.2
  // });

  const [osc, setOsc] = useState({
    type: "sawtooth",
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
  // const [env, setEnv] = useState({
  //   attack: attackState,
  //   decay: decayState,
  //   sustain: sustainState,
  //   release: releaseState
  // });

  const [env, setEnv] = useState({
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.5
  });

  //Synth + Keys
  const pianoKeys = document.querySelectorAll(".piano-keys .key");
  const [synth, setSynth] = useState(new Tone.PolySynth(Tone.Synth, {envelope: env, oscillator: osc, volume: volume}).toDestination());
  const [keyShown, setKeyShown] = useState(true);

  //Character-to-number conversion -> for randomise
  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97

  //Plays the given key
  const playKey = (note) => {
    const now = Tone.now();
    synth.triggerAttack(note, now);
    synth.triggerRelease(note, now + 0.25)
    //console.log(note);
  }

  //Changes synth
  const changeSynth = () => {
    //changes to Metallic ePiano from sounds.js >>>> needs change
    setSynth(new Tone.PolySynth(Tone.Synth, sounds[0]).toDestination());
  }

  //Updates all states (incl. options AND synth)
  const updateSynth = () => {
    const updateOsc = {
      type: oscillatorType,
      count: 3,
      harmonicity: 1,
      modulationFrequency: 0.4,
      modulationIndex: 2,
      modulationType: "square",
      phase: 0,
      spread: 20,
      width: 0.2
    };

    const updateEnv = {
      attack: attackState,
      decay: decayState,
      sustain: sustainState,
      release: releaseState
    };

    setOsc(updateOsc);
    setEnv(updateEnv);
    
    setSynth(new Tone.PolySynth(Tone.Synth, {
      envelope: updateEnv, 
      oscillator: updateOsc,
      volume: volume
    }).toDestination());
    console.log(synth.options.envelope, synth.options.oscillator);
  }

  const randomise = () => {
    //TODO: RANDOMISE PARAMS!!!! 
  }

  //Looks up the keywords in the sounds database
  //Assigns a score for how well a sound's keywords fit
  const soundLookup = () => {
    var bestFit = []

    sounds.forEach(sound => {
      const skw = sound.keywords.toString().split(" ");

      var score = 0;
      keywords.forEach(word => {
        if(skw.includes(word)) {
          score++;
        }
      });

      bestFit.push({sound, score});
    });

    bestFit.sort((a, b) => (a.score > b.score) ? -1 : 1)
    console.log(bestFit);
    //console.log(bestFit[0]);
    //console.log(bestFit[0].sound);
  }

  //Update keyword array for search in sounds.js
  const updateKeywords = (e) => {
    const kw = e.target.value;
    setKeywords(kw.toLowerCase().split(" "));
  }

  //Helper function to set state of keyShown
  const toggleKeys = () => {
    if(keyShown === true) {
      setKeyShown(false);
    } else {
      setKeyShown(true);
    }
  }

  document.addEventListener("click", async () => {
    if(contextStarted === false) {
      await Tone.start();
      setStarted(true);
    }
  });

  //Show/hide Keys
  useEffect(() => {
    pianoKeys.forEach(key => {
      key.classList.toggle("hide");
    });
  }, [keyShown])
  
  return (
    <>
    <div className="piano-container">
      <header>
          <div className="column volume-slider">
            <span>Volume</span><input type="range" min="-25" max="10" value={volume} step="any" onChange={(e) => setVolume(e.target.value)}></input>
          </div>
          <div className="column drag-slider">
            <span>Note Drag</span><input type="range" min="0" max="3" value={noteDrag} step="any" onChange={(e) => setNoteDrag(e.target.value)}></input>
          </div>
          <div className="column keys-checkbox">
            <span>Show Keys</span><input type="checkbox" onClick={() => toggleKeys()}></input>
          </div>
      </header>
      <input type="input" className="keyword-input" placeholder="Keywords" onChange={(e) => updateKeywords(e)}></input>
      <button onClick={() => soundLookup()}>Apply!</button>
      <br></br><br></br>
      <button onClick={() => randomise()}>Randomise!</button> 
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

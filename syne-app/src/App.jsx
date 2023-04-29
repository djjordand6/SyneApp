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

  //Keyword search
  const [keywords, setKeywords] = useState([]);

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

  // const [osc, setOsc] = useState({
  //   type: "sawtooth",
  //   count: 3,
  //   harmonicity: 1,
  //   modulationFrequency: 0.4,
  //   modulationIndex: 2,
  //   modulationType: "square",
  //   phase: 0,
  //   spread: 20,
  //   width: 0.2
  // });

  //Envelope option state
  const [env, setEnv] = useState({
    attack: attackState,
    decay: decayState,
    sustain: sustainState,
    release: releaseState
  });

  // const [env, setEnv] = useState({
  //   attack: 0.01,
  //   decay: 0.1,
  //   sustain: 0.3,
  //   release: 0.5
  // });

  //Synth + Keys
  const pianoKeys = document.querySelectorAll(".piano-keys .key");
  const [synth, setSynth] = useState(new Tone.PolySynth(Tone.Synth, {envelope: env, oscillator: osc, volume: volume}).toDestination());
  const [keyShown, setKeyShown] = useState(true);

  //Changes synth
  const changeSynth = () => {
    //changes to Metallic ePiano from sounds.js >>>> needs change
    setSynth(new Tone.PolySynth(Tone.Synth, soundLookup()).toDestination());
    console.log(synth.options);
  }


  //Plays the given key
  const playKey = (note) => {
    synth.triggerAttackRelease(note, "8n");
    //console.log(note);
  }

  //Stops the given key -> for use in click-and-hold playback [DEPRECATED]
  const stopKey = (note) => {
    const now = Tone.now();
    synth.triggerRelease(note, now);
  }
  
  //Randomisation functions [DEPRECATED]
  {
    //Character-to-number conversion -> for randomise() [DEPRECATED]
    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97

    //Randomise params [DEPRECATED]
    const randomise = () => {
      //TODO: RANDOMISE PARAMS!!!! 
    }

    //Updates all states (incl. options AND synth) -> for use in randomise() [DEPRECATED]
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
      }).toDestination());
      console.log(synth.options.envelope, synth.options.oscillator);
    }
  }


  //Looks up the keywords in the sounds database
  //Assigns a score for how well a sound's keywords fit
  const soundLookup = () => {
    var bestFit = []

    sounds.forEach(sound => {
      const skw = sound.keywords.toString().split(" ");
      const conciseness = skw.length; //Higher is better -> thinking here: more words = more concise

      var score = 0;
      keywords.forEach(word => {
        if(skw.includes(word)) {
          score++;
        }
      });

      bestFit.push({sound, score, conciseness});
    });

    bestFit.sort((a, b) => (a.conciseness > b.conciseness) ? -1 : 1)
    bestFit.sort((a, b) => (a.score > b.score) ? -1 : 1);

    console.log(bestFit);
    //console.log(bestFit[0]);
    console.log(bestFit[0].sound);

    return bestFit[0].sound;
  }

  //Above function with GPT request
  //Implement idea: ChatGPT/GPT-4 keyword expansion -> takes word(s) and finds ones closely linked to it 
  const soundLookupGPT = async () => {
    const response = await fetch(`http://localhost:8080/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Please find words that are similar and/or linked to the words: ${keywords}. Return the words only, separated by a space.`
      }),
    });

    const data = await response.json();
    const newKW = data.response.split(" ");

    var bestFit = []

    sounds.forEach(sound => {
      const skw = sound.keywords.toString().split(" ");
      const conciseness = skw.length; //Higher is better -> thinking here: more words = more concise

      var score = 0;
      newKW.forEach(word => {
        if(skw.includes(word)) {
          score++;
        }
      });

      bestFit.push({sound, score, conciseness});
    });

    bestFit.sort((a, b) => (a.conciseness > b.conciseness) ? -1 : 1)
    bestFit.sort((a, b) => (a.score > b.score) ? -1 : 1);

    console.log(bestFit);
    //console.log(bestFit[0]);
    console.log(bestFit[0].sound);

    return bestFit[0].sound;
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

  //AudioContext init
  document.addEventListener("click", async () => {
    if(contextStarted === false) {
      Tone.Transport.bpm.value = 120;
      Tone.Transport.start(); 
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

  //Dynamic volume change
  useEffect(() => {
    synth.volume.value = volume;
  }, [volume])

  //Dynamic Synth options
  useEffect(() => {
    setOsc(synth.options.oscillator);
    setEnv(synth.options.envelope);
  }, [synth])

  return (
    <>
    <div className="piano-container">
      <header>
          <div className="column volume-slider">
            <span>Volume</span><input type="range" min="-20" max="5" value={volume} step="0.1" onChange={(e) => setVolume(e.target.value)}></input>
          </div>
          <div className="column keys-checkbox">
            <span>Hide Keys</span><input type="checkbox" onClick={() => toggleKeys()}></input>
          </div>
      </header>
      <br></br>
      <input type="input" className="keyword-input" placeholder="Keywords" onChange={(e) => updateKeywords(e)}></input>
      <button onClick={() => changeSynth()}>Apply!</button>
      <br></br>
      {
        //<button onClick={() => randomise()}>Randomise!</button>
      }
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
          <li className="key white" key="F5" onClick={() => playKey("F5")}><span>F5</span></li>
          <li className="key black" key="F#5" onClick={() => playKey("F#5")}><span>F#5</span></li>
          <li className="key white" key="G5" onClick={() => playKey("G5")}><span>G5</span></li>
          <li className="key black" key="G#5" onClick={() => playKey("G#5")}><span>G#5</span></li>
          <li className="key white" key="A5" onClick={() => playKey("A5")}><span>A5</span></li>
          <li className="key black" key="A#5" onClick={() => playKey("A#5")}><span>A#5</span></li>
          <li className="key white" key="B5" onClick={() => playKey("B5")}><span>B5</span></li>
      </ul>
      <br></br>
      <div className="synth-details">
        <header>
          <div>
            <span>Envelope:</span>
            <div>
              Attack: {env.attack} <br></br>
              Decay: {env.decay} <br></br>
              Sustain: {env.sustain} <br></br>
              Release: {env.release} <br></br>
              A. Curve: {env.attackCurve ? (env.attackCurve) : ("N/A")} <br></br>
              D. Curve: {env.decayCurve ? (env.decayCurve) : ("N/A")} <br></br>
              S. Curve: {env.sustainCurve ? (env.sustainCurve) : ("N/A")} <br></br>
              R. Curve: {env.releaseCurve ? (env.releaseCurve) : ("N/A")} <br></br>
            </div>
          </div>
          <div>
            <span>Oscillator:</span>
            <div>
              Type: {osc.type} <br></br>
              Count: {osc.count ? (osc.count) : ("N/A")} <br></br>
              Harmonicity: {osc.harmonicity ? (osc.harmonicity) : ("N/A")} <br></br>
              Phase: {osc.phase ? (osc.phase) : ("N/A") } <br></br>
              Spread: {osc.spread ? (osc.phase) : ("N/A")} <br></br>
              Width: {osc.width ? (osc.width) : ("N/A")} <br></br>
              Modulation Freq: {osc.modulationFrequency ? (osc.modulationFrequency) : ("N/A")} <br></br>
              Modulation Index: {osc.modulationIndex ? (osc.modulationIndex) : ("N/A")} <br></br>
              Modulation Type: {osc.modulationType ? (osc.modulationType) : ("N/A")} <br></br>
            </div>
          </div>
        </header>
      </div>
    </div>
    </>
  )
}

export default App

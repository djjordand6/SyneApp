export default [
    {
        keywords: "default",
        oscillator: {
            type: "triangle",
            count: 3,
            harmonicity: 1,
            modulationFrequency: 0.4,
            modulationIndex: 2,
            modulationType: "square",
            phase: 0,
            spread: 20,
            width: 0.2
        },
        envelope: {
            attack: 0.005,
            decay: 0.1 ,
            sustain: 0.3 ,
            release: 1
        },
        volume: -2,
        id: 0
    },
    {
        keywords: "metallic epiano",
        oscillator: {
            type: "sawtooth6",
            count: 3,
            harmonicity: 1,
            modulationFrequency: 0.01,
            modulationIndex: 2,
            phase: 0,
            spread: 20,
            width: 0.2
        },
        envelope: {
            attack: 0.005,
            decay: 0.1 ,
            sustain: 0.3 ,
            release: 1
        },
        volume: -5,
        id: 1
    },
    {
        keywords: "airy air soothe space",
        oscillator: {
            type: "sawtooth",
            count: 3,
            harmonicity: 1,
            modulationFrequency: 0.01,
            modulationIndex: 2,
            phase: 0,
            spread: 20,
            width: 0.2
        },
        envelope: {
            attack: 0.005,
            decay: 0.1 ,
            sustain: 0.3 ,
            release: 1
        },
        lfo: {
            type: "sine",
            frequency: 0.2,
            amplitude: 0.02
        },
        volume: -4,
        id: 2
    },
    {
        keywords: "metallic",
        oscillator: {
            type: "sawtooth6",
            count: 3,
            harmonicity: 1,
            modulationFrequency: 0.01,
            modulationIndex: 2,
            phase: 0,
            spread: 20,
            width: 0.2
        },
        envelope: {
            attack: 0.005,
            decay: 0.1 ,
            sustain: 0.3 ,
            release: 1
        },
        volume: -5,
        id: 3
    },
];
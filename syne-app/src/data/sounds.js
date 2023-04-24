export default [
    {
        name: "metallic epiano",
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
        id: 0
    },
    {
        name: "random",
        oscillator: {
            type: "square",
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
        volume: -4,
        id: 1
    }
];
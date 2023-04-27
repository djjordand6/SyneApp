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
            decay: 0.1,
            sustain: 0.3,
            release: 1
        },
        volume: -5,
        id: 1
    },
    {
        keywords: "airy air soothe space pad",
        oscillator: {
            type: "sine",
            count: 3,
            harmonicity: 1,
            modulationFrequency: 0.5,
            modulationIndex: 2,
            phase: 0,
            spread: 10,
            width: 0.2
        },
        envelope: {
            attack: 0.3,
            decay: 2,
            sustain: 0.3,
            release: 4
        },
        lfo: {
            type: "sine",
            frequency: 0.2,
            amplitude: 0.02
        },
        volume: -8,
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
    {
        keywords: "kids children youngster youth young toy dolls action figures games puzzles blocks cars trains stuffed animals gadgets models robots board cards costumes LEGO sets trinkets tricycles bicycles scooters jump ropes kites skateboards piano",
        oscillator: {
          type: "triangle",
          harmonicity: 2,
          modulationIndex: 30,
          phase: 3,
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.6,
          release: 1.2,
        },
        volume: -12,
        id: 4
    },
    {
        keywords: "electric guitar lead electrical electrifying charged galvanic energetic live sparkling dynamic vigorous stimulating",
        oscillator: {
            type: "sawtooth",
            count: 3,
            spread: 30,
            phase: 0,
        },
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.7,
            release: 1.5,
        },
        volume: -12,
        id: 5
    },
    {
        keywords: "haunting haunt scary scare spooky halloween",
        oscillator: {
            partialCount: 16,
            partials: [
                1,
                0.8434636622299384,
                0.7060667438271604,
                0.4822530864197532,
                0.39279815297067894,
                0.19753086419753096,
                0.11578896604938266,
                0.0860851900077161,
                0.0625,
                0.044129171489197545,
                0.030140817901234556,
                0.030140817901234556,
                0.31640625,
                1,
                0.7060667438271604,
                0.586181640625
            ],
            phase: -4,
            type: "custom"
        },
        envelope: {
            attack: 0.05,
            attackCurve: "linear",
            decay: 0.1,
            decayCurve: "exponential",
            release: 1,
            releaseCurve: "exponential",
            sustain: 0.3
        },
        detune: 20,
        volume: -10,
        id: 6
    },
    {
        keywords: "drum hit ping pong",
        oscillator: {
            type: "sine",
            partialCount: 0,
            phase: 1, 
        },
        envelope: {
            attack: 0.005,
            attackCurve: "linear",
            decay: 0.1,
            decayCurve: "exponential",
            release: 0.5,
            releaseCurve: "exponential",
            sustain: 0.1
        },
        volume: -4,
        id: 7
    },
    {
        keywords: "xylophone",
        oscillator: {
            type: "sine",
            phase: 0,
        },
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 0.8,
        },
        volume: -10,
        id: 8
    },
];
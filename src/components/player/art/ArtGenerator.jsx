import React, { useState, useEffect, useRef, useCallback } from "react";
import { css } from "emotion";
import SimplexNoise from "simplex-noise";
import RandomSeed from "random-seed";
import chroma from "chroma-js";

const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
const NUM_ROWS = 360;
const DIMENSION = 1080;
// const STROKE = 8;
const PADDING = 16;
// const LINE_LENGTH = 30;
const LINE_RESOLUTION = 1;
const NUM_LINES = 10000;
const GRADIENTS = [
    ["#CCDBDC", "#9AD1D4", "#80CED7", "#007EA7", "#003249"],
    ["#000000", "#ffffff"],
    ["#FC466B", "#3F5EFB"],
    ["#4b6cb7", "#182848"],
    ["#d53369", "#daae51"],
    ["#f7aef8", "#b388eb", "#8093f1", "#72ddf7", "#f4f4ed"]
];
const GRADIENT_INDEX = 0;
const GRADIENT = GRADIENTS[GRADIENT_INDEX];
const SEED = "0";

const simplex = new SimplexNoise(SEED);
const random = RandomSeed.create(SEED);
const magnitudeToColor = chroma.bezier(GRADIENT);

function generateNoiseWithOctaves(octaves, x, y, scale, low, high) {
    let maxAmp = 0;
    let freq = scale;
    let amp = 1;
    let noise = 0;
    for (let i = 0; i < octaves; i++) {
        noise += simplex.noise2D(x / freq, y / freq) * amp;
        maxAmp += amp;
        amp *= 0.5;
        freq /= 2;
    }

    noise /= maxAmp;
    noise = (noise * (high - low)) / 2 + (high + low) / 2;
    return noise;
}

function getColorForMagnitude(magnitude) {
    return magnitudeToColor(magnitude).hex();
}

function generateFlowField() {
    const steps = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_ROWS; j++) {
            const angle = generateNoiseWithOctaves(1, i, j, NUM_ROWS, 0, 2 * Math.PI);
            steps.push([
                Math.cos(angle) / LINE_RESOLUTION,
                Math.sin(angle) / LINE_RESOLUTION
            ]);
        }
    }
    return (x, y) => {
        return steps[
            Math.round((x * NUM_ROWS) / DIMENSION) * NUM_ROWS +
            Math.round((y * NUM_ROWS) / DIMENSION)
        ];
    };
};

const flowField = generateFlowField();

const ArtGenerator = ({ notes }) => {
    const [showNft, setShowNft] = useState(false);

    const canvasRef = useRef();
    const [stroke, setStroke] = useState(Math.floor((Math.random() * 1000) + 1));
    const [lineLength, setLineLength] = useState(Math.floor((Math.random() * 1000) + 1));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");
        canvas.width = DIMENSION * DEVICE_PIXEL_RATIO;
        canvas.height = DIMENSION * DEVICE_PIXEL_RATIO;
        ctx.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

        ctx.lineCap = "round";

        for (let i = 0; i < NUM_LINES; i++) {
            let x = random(DIMENSION - 2 * PADDING) + PADDING;
            let y = random(DIMENSION - 2 * PADDING) + PADDING;
            const numSteps = random(lineLength * LINE_RESOLUTION);

            ctx.beginPath();
            ctx.moveTo(x, y);
            // const magnitude = generateNoiseWithOctaves(2, x, y, NUM_ROWS * 0.3, 0, 1);
            // const color = getColorForMagnitude(magnitude);
            const color = getColorForMagnitude(random.random());
            ctx.strokeStyle = color;
            ctx.lineWidth = random(stroke);
            for (let n = 0; n < numSteps; n++) {
                const [xStep, yStep] = flowField(x, y);
                x += xStep;
                y -= yStep;

                x = Math.max(x, 0);
                y = Math.max(y, 0);

                x = Math.min(x, DIMENSION);
                y = Math.min(y, DIMENSION);
                ctx.lineTo(x, y);

                if (
                    x <= PADDING ||
                    y <= PADDING ||
                    x >= DIMENSION - PADDING ||
                    y >= DIMENSION - PADDING
                ) {
                    break;
                }
            }
            ctx.stroke();
            ctx.closePath();
        }
    }, [stroke, lineLength]);

    const onStrokeChange = useCallback((e) => {
        setStroke(parseInt(e.target.value, 10));
    }, []);

    const onLineLengthChange = useCallback((e) => {
        setLineLength(parseInt(e.target.value, 10));
    }, []);

    const newArt = () => {
        setStroke((Math.random() * 1000) + 1);
        setLineLength((Math.random() * 1000) + 1);
        setShowNft(true);
    };

    useEffect(()=>{
        console.log(canvasRef.current);
    },[canvasRef.current])

    return (
        <div>
            <div>
                {
                    notes.length > 0
                        ?
                        <button onClick={() => { newArt() }}>Generate NFT</button>
                        :
                        null
                }
            </div>

            {
                showNft
                    ?
                    <div className="nft-box">
                        <div className="nft-holder">
                            <div
                                className={css`
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                max-width: 100vw;
                                max-height: 100vh;
                            `}
                            >
                                <canvas
                                    className={css`
                                    transform: scale(0.4);
                                    `}
                                    ref={canvasRef}
                                />
                                <div
                                    className={css`
                                    align-self: stretch;
                                    position: absolute;
                                    display: flex;
                                    flex-direction: column;
                                    right: 0;
                                    border-left: 1px solid #ccc;
                                    box-sizing: border-box;
                                    min-height: 100vh;
                                    padding: 8px;

                                    & > label {
                                        display: flex;
                                        flex-direction: column;
                                        margin-bottom: 8px;
                                    }
                                    `}
                                >
                                    <label>
                                        Stroke:
                                        <input type="number" value={stroke} onChange={onStrokeChange} />
                                    </label>
                                    <label>
                                        Line Length:
                                        <input
                                            type="number"
                                            value={lineLength}
                                            onChange={onLineLengthChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default ArtGenerator;
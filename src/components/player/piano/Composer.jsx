import React, { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { ReactMediaRecorder } from "react-media-recorder";
import 'react-piano/dist/styles.css';

// import DimensionsProvider from './piano/DimensionsProvider';
import SoundfontProvider from './Lib/SoundfontProvider';
import DimensionsProvider from './Lib/DimensionsProvider';
import Fluids from './Lib/fluidr3';
import Musyngkite from './Lib/musyngkite';
import "./Lib/piano-style.css";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});


const Composer = () => {
    return (
        <div>
            <h1>create your own musical notes</h1>
            <ResponsivePiano />

        </div>
    )
};

// function BasicPiano() {
//     return (
//         <SoundfontProvider
//             instrumentName="acoustic_grand_piano"
//             audioContext={audioContext}
//             hostname={soundfontHostname}
//             render={({ isLoading, playNote, stopNote }) => (
//                 <Piano
//                     noteRange={noteRange}
//                     width={300}
//                     playNote={playNote}
//                     stopNote={stopNote}
//                     disabled={isLoading}
//                     keyboardShortcuts={keyboardShortcuts}
//                 />
//             )}
//         />
//     );
// }

function ResponsivePiano(props) {
    const [instru, setInstru] = useState("fiddle");
    return (
        <>
            <DimensionsProvider>
                {({ containerWidth, containerHeight }) => (
                    <SoundfontProvider
                        instrumentName={instru}
                        audioContext={audioContext}
                        hostname={soundfontHostname}
                        render={({ isLoading, playNote, stopNote }) => (
                            <Piano
                                noteRange={noteRange}
                                width={containerWidth}
                                playNote={playNote}
                                stopNote={stopNote}
                                disabled={isLoading}
                                keyboardShortcuts={keyboardShortcuts}
                                {...props}
                            />
                        )}
                    />
                )}

            </DimensionsProvider>
            <div className='player-options'>
                <div className='instruments'>
                    <label htmlFor="instrument-label">Select Instrument</label>
                    <select defaultValue={'fiddle'} className="instrument-select" onChange={(e) => { setInstru(e.target.value) }}>
                        {
                            Fluids.map((i, index) => (
                                <option key={index} value={i}>{i}</option>
                            ))
                        }
                    </select>
                </div>

            </div>
        </>

    );
}

export default Composer;
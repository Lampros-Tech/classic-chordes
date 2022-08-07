import React, { useState } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import _ from 'lodash';
// import { ReactMediaRecorder } from "react-media-recorder";
import PianoWithRecording from './Lib/PianoWithRecording';
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
            <Record />

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

// function ResponsivePiano(props) {
//     const [instru, setInstru] = useState("fiddle");
//     const [recording, setRecording] = useState({
//         mode: 'RECORDING',
//         events: [],
//         currentTime: 0,
//         currentEvents: [],
//     });

//     var scheduledEvents = [];

//     const getRecordingEndTime = () => {
//         if (recording.events.length === 0) {
//             return 0;
//         }
//         return Math.max(
//             ...recording.events.map(event => event.time + event.duration),
//         );
//     };

//     const onClickPlay = (e) => {
//         setRecording({
//             mode: 'PLAYING',
//         });
//         const startAndEndTimes = _.uniq(
//             _.flatMap(recording.e, e => [
//                 e.time,
//                 e.time + e.duration,
//             ]),
//         );
//         startAndEndTimes.forEach(time => {
//             scheduledEvents.push(
//                 setTimeout(() => {
//                     const currentEvents = recording.events.filter(event => {
//                         return event.time <= time && event.time + event.duration > time;
//                     });
//                     setRecording({
//                         currentEvents,
//                     });
//                 }, time * 1000),
//             );
//         });
//         // Stop at the end
//         setTimeout(() => {
//             onClickStop();
//         }, getRecordingEndTime() * 1000);
//     };

//     const onClickStop = (e) => {
//         scheduledEvents.forEach(scheduledEvent => {
//             clearTimeout(scheduledEvent);
//         });
//         setRecording({
//             mode: 'RECORDING',
//             currentEvents: [],
//         });
//     };

//     const onClickClear = (e) => {

//     };

//     return (
//         <>
//             <DimensionsProvider>
//                 {({ containerWidth, containerHeight }) => (
//                     <SoundfontProvider
//                         instrumentName={instru}
//                         audioContext={audioContext}
//                         hostname={soundfontHostname}
//                         render={({ isLoading, playNote, stopNote }) => (
//                             // <Piano
//                             //     noteRange={noteRange}
//                             //     width={containerWidth}
//                             //     playNote={playNote}
//                             //     stopNote={stopNote}
//                             //     disabled={isLoading}
//                             //     keyboardShortcuts={keyboardShortcuts}
//                             //     {...props}
//                             // />
//                             <PianoWithRecording
//                                 recording={recording}
//                                 setRecording={setRecording}
//                                 noteRange={noteRange}
//                                 width={containerWidth}
//                                 height={containerHeight}
//                                 playNote={playNote}
//                                 stopNote={stopNote}
//                                 disabled={isLoading}
//                                 keyboardShortcuts={keyboardShortcuts}
//                             />
//                         )}
//                     />
//                 )}

//             </DimensionsProvider>
//             <div className='player-options'>
//                 <div className='instruments'>
//                     <label htmlFor="instrument-label">Select Instrument</label>
//                     <select defaultValue={'fiddle'} className="instrument-select" onChange={(e) => { setInstru(e.target.value) }}>
//                         {
//                             Fluids.map((i, index) => (
//                                 <option key={index} value={i}>{i}</option>
//                             ))
//                         }
//                     </select>
//                 </div>
//                 <div className="mt-5">
//                     <button onClick={() => { onClickPlay() }}>Play</button>
//                     <button onClick={() => { onClickStop() }}>Stop</button>
//                     <button onClick={() => { onClickClear() }}>Clear</button>
//                 </div>
//             </div>
//         </>

//     );
// }

class Record extends React.Component {
    state = {
        recording: {
            mode: 'RECORDING',
            events: [],
            currentTime: 0,
            currentEvents: [],
        },
        instru: "accordion",

    };

    constructor(props) {
        super(props);
        this.scheduledEvents = [];
    }

    getRecordingEndTime = () => {
        if (this.state.recording.events.length === 0) {
            return 0;
        }
        return Math.max(
            ...this.state.recording.events.map(event => event.time + event.duration),
        );
    };

    setRecording = value => {
        this.setState({
            recording: Object.assign({}, this.state.recording, value),
        });
    };

    onClickPlay = () => {
        this.setRecording({
            mode: 'PLAYING',
        });
        const startAndEndTimes = _.uniq(
            _.flatMap(this.state.recording.events, event => [
                event.time,
                event.time + event.duration,
            ]),
        );
        startAndEndTimes.forEach(time => {
            this.scheduledEvents.push(
                setTimeout(() => {
                    const currentEvents = this.state.recording.events.filter(event => {
                        return event.time <= time && event.time + event.duration > time;
                    });
                    this.setRecording({
                        currentEvents,
                    });
                }, time * 1000),
            );
        });
        // Stop at the end
        setTimeout(() => {
            this.onClickStop();
        }, this.getRecordingEndTime() * 1000);
    };



    onClickStop = () => {
        this.scheduledEvents.forEach(scheduledEvent => {
            clearTimeout(scheduledEvent);
        });
        this.setRecording({
            mode: 'RECORDING',
            currentEvents: [],
        });
    };

    onClickClear = () => {
        this.onClickStop();
        this.setRecording({
            events: [],
            mode: 'RECORDING',
            currentEvents: [],
            currentTime: 0,
        });
    };

    render() {
        return (
            <div>
                {/* <h1 className="h3">react-piano recording + playback demo</h1> */}
                <div className="mt-5">
                    <DimensionsProvider>
                        {({ containerWidth, containerHeight }) => (
                            <SoundfontProvider
                                instrumentName={this.state.instru}
                                audioContext={audioContext}
                                hostname={soundfontHostname}
                                render={({ isLoading, playNote, stopNote }) => (
                                    <PianoWithRecording
                                        recording={this.state.recording}
                                        setRecording={this.setRecording}
                                        noteRange={noteRange}
                                        width={containerWidth}
                                        height={containerHeight}
                                        playNote={playNote}
                                        stopNote={stopNote}
                                        disabled={isLoading}
                                        keyboardShortcuts={keyboardShortcuts}
                                    />
                                )}
                            />
                        )}
                    </DimensionsProvider>
                </div>

                {/* <div className='instruments'>
                    <label htmlFor="instrument-label">Select Instrument</label>
                    <select defaultValue={'accordion'} className="instrument-select" onChange={(e) => { this.setState({ instru: e.target.value }) }}>
                        {
                            Fluids.map((i, index) => (
                                <option key={index} value={i}>{i}</option>
                            ))
                        }
                    </select>
                </div> */}

                <div className="mt-5">
                    <button onClick={this.onClickPlay}>Play</button>
                    <button onClick={this.onClickStop}>Stop</button>
                    <button onClick={this.onClickClear}>Clear</button>
                </div>
                {/* <div className="mt-5">
                    <strong>Recorded notes</strong>
                    <div>{JSON.stringify(this.state.recording.events)}</div>
                </div> */}
            </div>
        );
    }
}

export default Composer;
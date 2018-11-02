import React, { Component } from 'react';
import './metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';



class Metronome extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            playing: false,
            count: 1,
            bpm: 100,
            beatsPerMeasure: 4,
        };
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        this.setState({ bpm });
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0) { 
            this.click2.play();
        } else {
            this.click1.play();
        }
        if (count !== beatsPerMeasure){
            this.setState(state => ({
                count: (state.count + 1)
            }));
        } else {
            this.setState(state => ({
                count: 1
            }));
        }
    
    }

    startStop = () => {
        if (this.state.playing) {
            // Stop the timer
            clearInterval(this.timer);
            this.setState({
              playing: false,
              count: 1
            });
          } else {
            // Start a timer with the current BPM
            this.timer = setInterval(
              this.playClick,
              (60 / this.state.bpm) * 1000
            );
            this.setState(
              {
                count: 0,
                playing: true
                // Play a click "immediately" (after setState finishes)
              },
              this.playClick
            );
          }
    }

    render() {
        const { playing, bpm, count } = this.state;

        return(
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input type="range"
                    min="60"
                    max="240"
                    value={bpm}
                    onChange={this.handleBpmChange} />
                </div>
                <button onClick={this.startStop}>{ playing ? 'Stop' : 'Start'}</button>
                <div>{count}</div>
            </div>
        );
      }
}

export default Metronome;
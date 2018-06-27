import React, { Component } from 'react';
import './GamePad.scss';


class GamePad extends Component {
  state = { padButton: null };

  componentDidMount() {
    if (this.canvas) {
      // draw the sides first
      this.xSide(this.canvas, 63.5, 0, 100);
      this.xSide(this.canvas, 100, 36.5, 63.5);
      this.ySide(this.canvas, 63.5, 0, 36.5);
      this.ySide(this.canvas, 63.5, 63.5, 100);
      this.ySide(this.canvas, 100, 36.5, 63.5);

      // draw the d-pad
      const plus = this.angularShape(this.canvas, [
        [0, 36.5],
        [36.5, 36.5],
        [36.5, 0],
        [63.5, 0],
        [63.5, 36.5],
        [100, 36.5],
        [100, 63.5],
        [63.5, 63.5],
        [63.5, 100],
        [36.5, 100],
        [36.5, 63],
        [0, 63.5],
      ]);

      plus.fillStyle = '#1a1a1a';
      plus.shadowColor = 'rgba(0, 0, 0, 0.6)';
      plus.shadowBlur = 15;
      plus.shadowOffsetX = 20;
      plus.shadowOffsetY = 10;
      plus.fill();
    }
  }

  onClickDPad = padButton => this.setState({ padButton });

  onMouseUp = () => {
    if (this.state.padButton) {
      this.setState({ padButton: 'false' });
    }
  }

  angularShape = (canvas, coords) => {
    const shape = canvas.getContext('2d');
    let i = 0;
    shape.beginPath();
    shape.moveTo(coords[0][0], coords[0][1]);
    coords.slice(1);

    for (i = 0; i < coords.length; i += 1) {
      shape.lineTo(coords[i][0], coords[i][1]);
    }

    shape.closePath();
    return shape;
  }

  linearFill = (shape, color1, color2, coords) => {
    const bg = shape.createLinearGradient(coords[0], coords[1], coords[2], coords[3]);
    bg.addColorStop(0, color1);
    bg.addColorStop(1, color2);
    shape.fillStyle = bg;
    shape.fill();
  }

  ySide = (canvas, y, xFrom, xTo) => {
    const shape = this.angularShape(canvas, [
      [y, xFrom],
      [y + 5, xFrom + 3.5],
      [y + 5, xTo + 3.5],
      [y, xTo],
    ]);
    this.linearFill(shape, '#666', '#000', [y, xFrom, y + 15, xFrom]);
  }

  xSide = (canvas, x, yFrom, yTo) => {
    const shape = this.angularShape(canvas, [
      [yFrom, x],
      [yFrom + 5, x + 3.5],
      [yTo + 5, x + 3.5],
      [yTo, x],
    ]);
    this.linearFill(shape, '#666', '#000', [yFrom, x, yFrom, x + 15]);
  }

  render() {
    return (
      <div className="GamePad">
        <figure id="nespad">
          <div className="cord" />
          <section className="dpad-pane">
            <div className="dpad-hole" />
            <div id="dpad" className={this.state.padButton}>
              <canvas
                id="dpad-body"
                width="150"
                height="150"
                ref={e => {
                  this.canvas = e;
                }}
              />
              <button
                id="up"
                className="button"
                onMouseDown={() => this.onClickDPad('up')}
                onMouseUp={this.onMouseUp}
              />
              <button
                id="right"
                className="button"
                onMouseDown={() => this.onClickDPad('right')}
                onMouseUp={this.onMouseUp}
              />
              <button
                id="down"
                className="button"
                onMouseDown={() => this.onClickDPad('down')}
                onMouseUp={this.onMouseUp}
              />
              <button
                id="left"
                className="button"
                onMouseDown={() => this.onClickDPad('left')}
                onMouseUp={this.onMouseUp}
              />
            </div>
          </section>
          <section className="menu-pane">
            <div className="labels">
              <label className="select" htmlFor="select">Select</label>
              <label className="start" htmlFor="start">Start</label>
            </div>
            <div className="buttons">
              <button id="select" className="button select">Select</button>
              <button id="start" className="button start">Start</button>
            </div>
          </section>
          <section className="action-pane">
            <div className="logo">Nintendo</div>
            <div className="buttons">
              <label className="label" htmlFor="b">
                <div className="caption">B</div>
                <button id="b" className="button" />
              </label>
              <label className="label" htmlFor="a">
                <div className="caption">A</div>
                <button id="a" className="button" />
              </label>
            </div>
          </section>
        </figure>
      </div>
    );
  }
}

export default GamePad;

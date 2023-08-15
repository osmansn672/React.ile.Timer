import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const initialTime = 60; //  60 saniye
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [circleSize, setCircleSize] = useState(200);

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    // Yuvarlağın boyutunu hesap yeri
    const maxCircleSize = 200; // Başlangıç boyutu
    const sizePerSecond = maxCircleSize / initialTime;
    const currentSize = maxCircleSize - sizePerSecond * (initialTime - time);
    setCircleSize(currentSize);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time, initialTime]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(false);
    setCircleSize(200);
  };

  return (
    <div className="timer-container">
      <div
        className="circle"
        style={{
          width: circleSize + "px",
          height: circleSize + "px"
        }}
      >
        <div className="time">{time} saniye</div>
      </div>
      <div className="button-container">
        <button onClick={handleStartStop}>
          {isRunning ? "Durdur" : "Başlat"}
        </button>
        <button onClick={handleReset}>Sıfırla</button>
      </div>
    </div>
  );
};

export default Timer;

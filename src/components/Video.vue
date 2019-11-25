<template>
  <div class="vid-cnt" :class="{ open: isVid }">
    <div class="ani_block" :class="{ open: isOpen }">
      <p>WHAT ARE U FEELING RIGHT NOW?</p>
      <p>🥰 🤓 😙 😃 🧐 🤯 🥶</p>
    </div>
    <div class="ani_block2" :class="{ open: isOpen }"></div>
    <div class="before_tv" :class="{ open: isOpen }"></div>
    <img id="tv" :class="{ open: isOpen }" src="../assets/tv.png" alt="" />
    <img
      id="tv-lines"
      :class="{ open: isOpen }"
      src="../assets/tv-lines-png.png"
      alt=""
      style="
        
      "
    />
    <video id="video" width="480" height="320" autoplay muted></video>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import { draw } from "tfjs-image-recognition-base";

import { FaceExpressions } from "face-api.js";
import { isWithFaceDetection } from "face-api.js";
import { isWithFaceExpressions } from "face-api.js";

function drawFaceExpressionsWithEmodji(
  canvasArg,
  faceExpressions,
  minConfidence = 0.7
) {
  const faceExpressionsArray = Array.isArray(faceExpressions)
    ? faceExpressions
    : [faceExpressions];

  faceExpressionsArray.forEach(e => {
    const expr =
      e instanceof FaceExpressions
        ? e
        : isWithFaceExpressions(e)
        ? e.expressions
        : undefined;
    if (!expr) {
      throw new Error(
        "drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof"
      );
    }

    const sorted = expr.asSortedArray();
    const resultsToDisplay = sorted.filter(
      expr => expr.probability > minConfidence
    );
    const anchor = isWithFaceDetection(e)
      ? e.detection.box.bottomLeft
      : console.log("pihui");

    const drawTextField = new draw.DrawTextField(
      resultsToDisplay.map(expr => {
        let em = "";
        switch (expr.expression) {
          case "angry":
            em = "😡";
            break;
          case "neutral":
            em = "😐";
            break;
          case "happy":
            em = "😁";
            break;
          case "sad":
            em = "😥";
            break;
          case "disgusted":
            em = "🤮";
            break;
          case "surprised":
            em = "😲";
            break;
          case "fearful":
            em = "😱";
            break;
        }
        return `${em}`;
      }),
      anchor,
      {
        fontSize: 50
      }
    );

    drawTextField.draw(canvasArg);
  });
}

export default {
  name: "vidos",
  data: function() {
    return {
      isOpen: false,
      shared_state: window.shared_state
    };
  },
  mounted: function() {
    this.isOpen = true;
    /*eslint no-console: ["error", { allow: ["log", "error"] }] */
    const video = document.getElementById("video");
    const div = document.querySelector(".vid-cnt");

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(startVideo);

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.error(err)
      );
    }

    video.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      div.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        drawFaceExpressionsWithEmodji(canvas, resizedDetections);
      }, 100);
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

@media screen and (max-width: 700px) {
  .ani_block {
    background: #1f1f1f;
  }
}

@keyframes slideDown {
  from {
    top: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    top: 0;
  }
}

@keyframes slideTV {
  from {
    top: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    top: calc(100vh / 2 - 200px);
  }
}

@keyframes slideTVMob {
  from {
    top: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    top: calc(100vh / 2 - 145px);
  }
}
@keyframes slideLine {
  from {
    top: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    top: calc(100vh / 2 - 160px);
  }
}

@keyframes slideLineMob {
  from {
    top: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    top: calc(100vh / 2 - 120px);
  }
}

@keyframes slideUp {
  from {
    bottom: calc((100vh / 2 + 100px) * (-1));
  }
  to {
    bottom: 0;
  }
}

.vid-cnt {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

canvas,
.before_tv,
#video {
  width: 480px;
  height: 320px;
  top: calc(100vh / 2 - 160px);
  left: calc(100vw / 2 - 240px);
  z-index: 150;
  position: absolute;
  border-radius: 10px;
  @media screen and (max-width: 700px) {
    width: 360px;
    height: 240px;
    top: calc(100vh / 2 - 120px);
    left: calc(100vw / 2 - 180px);
  }
}

.before_tv {
  width: 480px;
  height: 360px;
  background: #1f1f1f;
  &.open {
    animation: slideTV 1s ease-in-out;
    top: calc(100vh / 2 - 200px);
  }

  @media screen and (max-width: 700px) {
    width: 360px;
    height: 240px;
    top: calc(100vh / 2 - 120px);
    left: calc(100vw / 2 - 180px);

    &.open {
      animation: slideLineMob 1s ease-in-out;
      top: calc(100vh / 2 - 120px);
    }
  }
}

#tv-lines {
  left: calc(100vw / 2 - 240px);
  z-index: 159;
  width: 480px;
  height: 320px;
  opacity: 0.5;
  position: absolute;

  &.open {
    animation: slideLine 1s ease-in-out;
    top: calc(100vh / 2 - 160px);
  }

  @media screen and (max-width: 700px) {
    width: 360px;
    height: 240px;
    top: calc(100vh / 2 - 120px);
    left: calc(100vw / 2 - 180px);

    &.open {
      animation: slideLineMob 1s ease-in-out;
      top: calc(100vh / 2 - 120px);
    }
  }
}

#tv {
  left: calc(100vw / 2 - 250px);
  z-index: 160;
  position: absolute;
  width: 600px;
  height: 450px;
  &.open {
    animation: slideTV 1s ease-in-out;
    top: calc(100vh / 2 - 200px);
  }
  @media screen and (max-width: 700px) {
    width: 380px;
    height: 290px;
    left: calc(100vw / 2 - 185px);

    &.open {
      animation: slideTVMob 1s ease-in-out;
      top: calc(100vh / 2 - 145px);
    }
  }
}

.ani_block2 {
  left: 0;
  background: #624c96;
  z-index: 100;
  &.open {
    bottom: 0;
    animation: slideUp 1s ease-in-out;
  }
}
.ani_block {
  left: 0;
  background: #362a53;
  box-shadow: 0 20px 30px 10px rgba(0, 0, 0, 0.2);
  z-index: 102;
  &.open {
    top: 0;
    animation: slideDown 1s ease-in-out;
  }
  & p {
    font-family: "Josefin Sans", sans-serif;
    font-size: 40px;
    text-align: center;

    @media screen and (max-width: 430px) {
      font-size: 30px;
    }
  }
}

.ani_block,
.ani_block2 {
  height: calc(100vh / 2);
  width: 100vw;
  position: absolute;
  transition: all ease-in-out 0.7s;
}
</style>

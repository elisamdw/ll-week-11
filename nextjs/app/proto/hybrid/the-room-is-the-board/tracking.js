// Where people are standing, from the laptop's webcam: MediaPipe's pose landmarker, run in the browser.
// The library loads at runtime from jsdelivr (pinned, the version the LL's theremin pages use), so
// ll-week-11 needs no new package; the model file comes from Google. Both need the network.

const VERSION = "1.1.1";
const LIB = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/vision_bundle.mjs`;
const WASM = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/wasm`;
const MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

export async function loadPose(maxPeople) {
  const { FilesetResolver, PoseLandmarker } = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ LIB);
  const files = await FilesetResolver.forVisionTasks(WASM);
  return PoseLandmarker.createFromOptions(files, {
    baseOptions: { modelAssetPath: MODEL, delegate: "GPU" },
    runningMode: "VIDEO",
    numPoses: maxPeople,
    minPoseDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
}

// One point per person: between the ankles if the camera sees them, else between the hips.
// x is mirrored, so it matches the mirrored preview (your left is the screen's left).
export function feet(result) {
  return (result?.landmarks || []).map((points) => {
    const seen = (i) => (points[i]?.visibility ?? 1) > 0.5;
    const [a, b] = seen(27) && seen(28) ? [points[27], points[28]] : [points[23], points[24]];
    return { x: 1 - (a.x + b.x) / 2, y: (a.y + b.y) / 2, by: seen(27) && seen(28) ? "ankles" : "hips" };
  });
}

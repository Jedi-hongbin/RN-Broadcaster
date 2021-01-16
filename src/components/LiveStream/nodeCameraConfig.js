const camera = {cameraId: 1, cameraFrontMirror: true};
const audio = {bitrate: 32000, profile: 1, samplerate: 44100};
const video = {
  preset: 4,
  bitrate: 400000,
  profile: 1,
  fps: 30, //[15,20,24,30]
  videoFrontMirror: false,
};
const nodeCameraConfig = {
  camera,
  audio,
  video,
  autopreview: true,
  denoise: true,
  smoothSkinLevel: 5,
};
export default nodeCameraConfig;

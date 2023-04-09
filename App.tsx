import {runOnJS} from 'react-native-reanimated';

import {StyleSheet, View, Dimensions} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';

import {Camera} from 'react-native-vision-camera';
import {useEffect, useState} from 'react';
import {scanFaces, Face} from 'vision-camera-face-detector';
import {Rect, Canvas, Image, useImage, Group} from '@shopify/react-native-skia';

const {width, height} = Dimensions.get('screen');
export default function CameraFaceDetector() {
  const [hasPermission, setHasPermission] = useState(false);
  const [faces, setFaces] = useState<Face[]>();
  const img1 = useImage(require('./assets/glasses1.png'));
  const img2 = useImage(require('./assets/glasses2.png'));
  const devices = useCameraDevices();
  const device = devices.front;

  // useEffect(() => {
  //   if (faces?.length) {
  //     console.log(faces?.[0].rollAngle);
  //   }
  // }, [faces]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);

  return (
    <>
      {device != null && hasPermission ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={60}
        />
      ) : null}
      {faces?.length ? (
        <>
          <Canvas
            style={{
              flex: 1,
            }}>
            {/* {Object.values(faces[0].contours)
              .flat(1)
              .map(({x, y}) => {
                return (
                  <Rect
                    x={faces[0].bounds.width - x + 60}
                    y={y - 80}
                    width={3}
                    height={3}
                    color="red"
                  />
                );
              })} */}
            {(() => {
              const imgW = Math.sqrt(
                Math.pow(
                  faces[0].bounds.width -
                    faces[0].contours.RIGHT_EYE[9].x +
                    60 -
                    (faces[0].bounds.width -
                      faces[0].contours.LEFT_EYE[0].x +
                      60),
                  2,
                ) +
                  Math.pow(
                    faces[0].contours.RIGHT_EYE[9].y -
                      80 -
                      (faces[0].contours.LEFT_EYE[0].y - 80),
                    2,
                  ),
              );
              return (
                <Image
                  image={img2!}
                  fit="contain"
                  x={
                    faces[0].bounds.width -
                    faces[0].contours.RIGHT_EYE[9].x +
                    60
                  }
                  y={faces[0].contours.RIGHT_EYE[9].y - 80 - 256 / 2}
                  width={imgW}
                  height={256}
                />
              );
            })()}
          </Canvas>
        </>
      ) : null}
    </>
  );
}

import {StyleSheet, View, Dimensions} from 'react-native';
import {Button, Text} from 'react-native';

import {useState} from 'react';
import {Rect, Canvas, Image, useImage, Group} from '@shopify/react-native-skia';

import {Camera, CameraType} from 'expo-camera';
import {
  DetectionResult,
  FaceDetectorMode,
  FaceDetectorLandmarks,
  FaceDetectorClassifications,
  FaceFeature,
} from 'expo-face-detector';
const ExpoCamera = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faces, setFaces] = useState<FaceFeature[]>([]);
  const img2 = useImage(require('./assets/glasses1.png'));
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const handleFacesDetected = ({faces, image}: DetectionResult) => {
    if (faces.length) {
      console.log(faces[0]);

      setFaces(faces);
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetectorMode.accurate,
          detectLandmarks: FaceDetectorLandmarks.all,
          runClassifications: FaceDetectorClassifications.all,
          tracking: true,
        }}>
        {faces?.length ? (
          <>
            <Canvas
              style={{
                flex: 1,
              }}>
              {Object.values(faces[0]).map(({x, y}) => {
                return <Rect x={x} y={y} width={3} height={3} color="red" />;
              })}
              <Rect
                x={(faces[0]['LEFT_EYE'].x + faces[0]['RIGHT_EYE'].x) / 2}
                y={(faces[0]['LEFT_EYE'].y + faces[0]['RIGHT_EYE'].y) / 2}
                width={10}
                height={10}
                color="blue"
              />
              {(() => {
                const imgW = Math.sqrt(
                  Math.pow(
                    faces[0]['RIGHT_EAR']?.x! - faces[0]['LEFT_EAR']?.x!,
                    2,
                  ) +
                    Math.pow(
                      faces[0]['RIGHT_EAR']?.y! - faces[0]['LEFT_EAR']?.y!,
                      2,
                    ),
                );

                return (
                  <Group
                  // transform={[{translateX: -256 / 2}]}
                  >
                    <Image
                      image={img2!}
                      fit="contain"
                      x={
                        (faces[0]['LEFT_EYE'].x + faces[0]['RIGHT_EYE'].x) / 2 -
                        imgW / 2
                      }
                      y={
                        (faces[0]['LEFT_EYE'].y + faces[0]['RIGHT_EYE'].y) / 2 -
                        256 / 2
                      }
                      width={imgW}
                      height={256}
                    />
                  </Group>
                );
              })()}
            </Canvas>
          </>
        ) : null}
      </Camera>
    </View>
  );
};

export default function App() {
  return <ExpoCamera />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

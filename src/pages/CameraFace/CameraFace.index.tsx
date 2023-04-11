import {useState} from 'react';
import {Button, Text, View} from 'react-native';

import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import {
  FaceDetectorMode,
  FaceDetectorLandmarks,
  FaceDetectorClassifications,
} from 'expo-face-detector';
import {TFaceFeature} from './CameraFace.type';
import {styles} from './CameraFace.style';
import SelectGlasses from './containers/SelectGlasses';
import ImageGlasses from './components/ImageGlasses';
const assets = [
  'https://th.bing.com/th/id/R.c55ba5a997ba432269cb1c4c196801ea?rik=IpfheawqGVMy2w&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f1%2fGlasses-PNG-Pic.png&ehk=eXJA4zC0XWFdJ%2bKtN2wq0dmMCqFshrT89hYsr1mXRiU%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.56a999fa096e58bfa4e1be2c7cbd867a?rik=0w3%2f5pZakV4t7g&pid=ImgRaw&r=0',
];

const CameraFace = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faces, setFaces] = useState<TFaceFeature[]>([]);
  const [img, setImg] = useState(assets[0]);
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
  const handleFacesDetected = ({faces}: FaceDetectionResult) => {
    if (faces?.length) {
      setFaces(faces as TFaceFeature[]);
    } else {
      setFaces([]);
    }
  };
  const onSelected = (value: string) => {
    setImg(value);
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
        <SelectGlasses onSelected={onSelected} />
      </Camera>
      {faces?.length ? <ImageGlasses faces={faces} img={img} /> : null}
    </View>
  );
};

export default CameraFace;

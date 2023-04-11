import FastImage from 'react-native-fast-image';
import {useMemo} from 'react';
import {TFaceFeature} from '../CameraFace.type';
import {memo} from 'react';
import {Text} from 'react-native';
interface ImageGlassesProps {
  faces: TFaceFeature[];
  img: string;
}

const ImageGlasses: React.FC<ImageGlassesProps> = ({faces, img}) => {
  const imgW = useMemo(
    () =>
      Math.sqrt(
        Math.pow(faces[0].RIGHT_EAR?.x! - faces[0].LEFT_EAR?.x!, 2) +
          Math.pow(faces[0].RIGHT_EAR?.y! - faces[0].LEFT_EAR?.y!, 2),
      ),
    [faces],
  );

  return faces.length ? (
    <FastImage
      source={{uri: img}}
      resizeMode="contain"
      style={{
        position: 'absolute',
        transform: [
          {
            rotateY: `${faces[0].yawAngle}deg`,
          },
          {
            rotateZ: `${faces[0].rollAngle}deg`,
          },
        ],
        left: (faces[0].LEFT_EYE?.x + faces[0].RIGHT_EYE?.x) / 2 - imgW / 2,
        top: (faces[0].LEFT_EYE?.y + faces[0].RIGHT_EYE?.y) / 2 - 256 / 2,
        width: imgW,
        height: 256,
      }}
    />
  ) : null;
};

export default ImageGlasses;

import {FaceFeature, Point} from 'expo-face-detector';

export type TFaceFeature = FaceFeature & {
  RIGHT_EAR: Point;
  LEFT_EAR: Point;
  LEFT_EYE: Point;
  RIGHT_EYE: Point;
};

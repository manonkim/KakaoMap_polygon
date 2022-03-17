import {
  Map,
  ZoomControl,
  MapTypeControl,
  Polygon,
} from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { colors } from '../style/theme';

export function KakaoMap() {
  const { kakao } = window;
  const polygonData = useSelector((state) => state.polygon.polygon);
  return (
    <Map
      center={{ lng: 126.88888180909403, lat: 37.584638200543175 }}
      style={{ width: '100%', height: '100vh' }}
      level={8}
    >
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      <Polygon
        path={polygonData}
        strokeWeight={2}
        strokeColor={`${colors.green}`}
        strokeOpacity={1}
        strokeStyle={'solid'}
        fillColor={`${colors.green}`}
        fillOpacity={0.2}
      />
    </Map>
  );
}

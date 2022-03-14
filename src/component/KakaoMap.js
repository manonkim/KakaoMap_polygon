import { Map } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const KakaoMap = () => {
  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100vw', height: '100vh' }}
      ></Map>
    </>
  );
};
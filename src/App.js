import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SelectModal from './component/SelectModal';
import { KakaoMap } from './component/KakaoMap';
import { SearchBar } from './component/SearchBar';

function App() {
  const [data, setData] = useState([]);
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    console.log('...loading');
    const getData = async () => {
      await axios
        .get(
          'https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json'
        )
        .then((res) => setData(res.data.maps))
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <>
      <SearchBar />
      {modal.modal && <SelectModal data={data} />}
      <KakaoMap />
    </>
  );
}

export default React.memo(App);

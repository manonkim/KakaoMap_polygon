import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaSelectModal } from './component/AreaSelectModal';
import { KakaoMap } from './component/KakaoMap';
import { SearchBar } from './component/SearchBar';

function App() {
  const [onModal, setOnModal] = useState(false);
  const [data, setData] = useState([]);

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

  const modalHandler = () => {
    setOnModal((prev) => !prev);
  };

  return (
    <>
      <SearchBar modalHandler={modalHandler} data={data} />
      {onModal && <AreaSelectModal data={data} />}
      <KakaoMap />
    </>
  );
}

export default App;

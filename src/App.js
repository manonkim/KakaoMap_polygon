import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SelectModal from './component/SelectModal';
import { KakaoMap } from './component/KakaoMap';
import { SearchBar } from './component/SearchBar';
import { loadingActions } from './store/store';

function App() {
  const [data, setData] = useState([]);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(loadingActions.onLoading(true));
        await axios
          .get(
            'https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json'
          )
          .then((res) => setData(res.data.maps));
      } catch (err) {
        console.log(err);
      }
      dispatch(loadingActions.onLoading(false));
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

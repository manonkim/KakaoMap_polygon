import { useState } from 'react';
import { AreaSelectModal } from './component/AreaSelectModal';
import { KakaoMap } from './component/KakaoMap';
import { SearchBar } from './component/SearchBar';

function App() {
  const [onModal, setOnModal] = useState(false);
  const modalHandler = () => {
    setOnModal((prev) => !prev);
  };

  return (
    <>
      <SearchBar modalHandler={modalHandler} />
      {onModal && <AreaSelectModal />}
      <KakaoMap />
    </>
  );
}

export default App;

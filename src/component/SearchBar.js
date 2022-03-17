import { useDispatch } from 'react-redux';
import { modalActions } from '../store/store';
import styled, { css } from 'styled-components';
import { colors, font } from '../style/theme';

export function SearchBar() {
  const dispatch = useDispatch();
  const modalHandler = (e) => {
    dispatch(modalActions.onModal());
  };

  return (
    <SearchBoxWrap>
      <SearchBox>
        <SearchIndex onClick={modalHandler} />
        <SearchImg />
      </SearchBox>
      <SettingBtn onClick={modalHandler}>지역 설정</SettingBtn>
    </SearchBoxWrap>
  );
}

export const Btn = css`
  background-color: ${colors.white};
  border: 0.5px solid ${colors.lightGray};
  border-radius: 3px;
  box-shadow: 1px 1px 5px 0.1px rgba(0, 0, 0, 0.15);
  color: ${colors.fontBlack};
`;

const SearchBoxWrap = styled.div`
  display: flex;
  position: fixed;
  top: 35px;
  left: 38vw;
  z-index: 1000;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  padding: 8px;
  ${Btn}
`;

const SearchIndex = styled.input`
  width: 100%;
  border: none;
  color: ${colors.fontGray};
  &:focus {
    outline: none;
  }
`;

const SearchImg = styled.img.attrs({
  src: './images/search.png',
  alt: 'searchIcon',
})`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const SettingBtn = styled.button`
  margin: auto 10px;
  padding: 9px 20px;
  font-size: ${font.sm};
  cursor: pointer;
  ${Btn}
`;

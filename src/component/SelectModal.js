import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import cityName from '../cityName.json';
import { border, colors, font } from '../style/theme';
import { Btn } from './SearchBar';
import { useDispatch } from 'react-redux';
import { modalActions, polygonActions } from '../store/store';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel } from '@mui/material';

function SelectModal({ data }) {
  const [cityData, setCityData] = useState('');
  const [guData, setGuData] = useState('');
  const [selectedGu, setSelectedGu] = useState(new Set(''));
  const [_, setChecked] = useState([false]);
  const dispatch = useDispatch();

  const selectCityHandler = useCallback(
    (e) => {
      setCityData(e.target.value);
      setSelectedGu(new Set(''));
      setGuData(data.filter((data) => data.city === e.target.value));
    },
    [data]
  );

  const selectGuHandler = (e, isChecked) => {
    if (isChecked) {
      selectedGu.add(e.target.value);
      setSelectedGu(selectedGu);
      setChecked((prev) => !prev);
    } else if (!isChecked && selectedGu.has(e.target.value)) {
      selectedGu.delete(e.target.value);
      setSelectedGu(selectedGu);
      setChecked((prev) => !prev);
    }
  };

  const modalCloseHandler = (e) => {
    dispatch(modalActions.onModal());
    dispatch(polygonActions.polygonReset());
    const guArray = [...selectedGu];
    const getSelectedData = guData.filter((data) => {
      return guArray.includes(data.country);
    });
    const polygonData = getSelectedData.map((data) => data.polygon);
    dispatch(polygonActions.polygonData(polygonData));
  };

  const cancleBtnHandler = (e) => {
    selectedGu.delete(e.target.outerText);
    setSelectedGu(selectedGu);
    setChecked((prev) => !prev);
  };
  return (
    <SelectModalContainer>
      <ModalTitle>지역 설정</ModalTitle>
      <SelectHeaderWrap>
        <DropdownWrap>
          <FormControl variant="standard" sx={{ minWidth: 140 }} size="small">
            <InputLabel id="mutiple-select-label" sx={{ fontSize: '14px' }}>
              시 선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              onChange={selectCityHandler}
              label="시 선택"
              value={cityData}
              sx={{ fontSize: '14px' }}
            >
              {cityName.map((data) => (
                <MenuItem
                  key={data.id}
                  value={data.city}
                  sx={{
                    fontSize: '14px',
                  }}
                >
                  {data.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ minWidth: 140, marginLeft: 3 }}
            size="small"
          >
            <InputLabel sx={{ fontSize: '14px' }}>구 선택</InputLabel>
            <Select sx={{ fontSize: '14px' }} label="구 선택" />
          </FormControl>
        </DropdownWrap>
        <BtnWrap>
          <AllBtn>전체선택</AllBtn>
          <RemoveBtn>선택해제</RemoveBtn>
        </BtnWrap>
      </SelectHeaderWrap>
      <SelectedCityTitle>{cityData}</SelectedCityTitle>
      <CheckboxContainer>
        {guData &&
          guData.map((data) => (
            <CheckboxWrap key={data.code}>
              <FormControlLabel
                onChange={selectGuHandler}
                value={data.country}
                label={data.country}
                sx={{
                  marginLeft: '10px',
                  color: `${colors.fontBlack}`,
                }}
                control={
                  <Checkbox
                    size="small"
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                      '&.Mui-checked': {
                        color: `${colors.green}`,
                      },
                    }}
                  />
                }
              />
            </CheckboxWrap>
          ))}
      </CheckboxContainer>
      {cityData.length > 0 && (
        <>
          <SelectedGuTitle>선택 지역</SelectedGuTitle>
          <SelectedGuContainer>
            {selectedGu.size > 0 &&
              [...selectedGu].map((data) => (
                <SelectedGuWrap
                  key={data}
                  value={data}
                  onClick={cancleBtnHandler}
                >
                  <SelectedGu>{data}</SelectedGu>
                  <SelectedCancleBtn />
                </SelectedGuWrap>
              ))}
          </SelectedGuContainer>
        </>
      )}
      <ModalCloseBtn onClick={modalCloseHandler}>지역 선택 완료</ModalCloseBtn>
    </SelectModalContainer>
  );
}

const SelectModalContainer = styled.div`
  position: fixed;
  top: 120px;
  left: 32vw;
  width: 680px;
  z-index: 1000;
  padding: 5px 0;
  ${Btn};
`;

const ModalTitle = styled.header`
  padding: 15px 20px;
  font-size: ${font.l};
  font-weight: 600;
  border-bottom: ${border.dark};
  color: ${colors.fontBlack};
`;

const SelectHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 19px 20px;
  font-size: 14px;
`;

const DropdownWrap = styled.div`
  width: 350px;
`;

const BtnWrap = styled.span`
  margin-top: 10px;
`;
const AllBtn = styled.button`
  padding: 7px 30px;
  font-size: ${font.sm};
  background-color: ${colors.green};
  color: ${colors.white};
  border: ${border.dark};
  cursor: pointer;
`;

const RemoveBtn = styled(AllBtn.withComponent('button'))`
  margin-left: 10px;
  background-color: ${colors.white};
  color: ${colors.fontBlack};
`;

const SelectedCityTitle = styled.div`
  height: 38px;
  padding: 0px 20px;
  background-color: ${colors.lightGray};
  font-size: ${font.m};
  line-height: 38px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  height: 194px;
`;

const CheckboxWrap = styled.div`
  border-right: ${border.gray};
  border-bottom: ${border.gray};
  width: 220px;
  height: 38px;
`;

const SelectedGuTitle = styled(SelectedCityTitle.withComponent('div'))`
  background-color: ${colors.white};
  border-bottom: ${border.gray};
  border-top: ${border.gray};
  font-weight: 600;
`;

const SelectedGuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 80px;
  margin-bottom: 20px;
  overflow-y: auto;
`;

const SelectedGuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  height: 28px;
  padding: 10px 20px 0px 20px;
  border-right: ${border.gray};
  border-bottom: ${border.gray};
  cursor: pointer;
`;

const SelectedGu = styled.span`
  font-size: ${font.m};
  color: ${colors.fontGray};
`;

const SelectedCancleBtn = styled.img.attrs({
  src: './images/cancel.png',
  alt: 'searchIcon',
})`
  width: 10px;
  height: 10px;
  margin-top: 3px;
`;

const ModalCloseBtn = styled(AllBtn.withComponent('button'))`
  display: block;
  margin: 0 auto 30px auto;
`;

export default React.memo(SelectModal);

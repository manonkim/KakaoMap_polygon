import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import cityName from '../cityName.json';
import { colors, font } from '../style/theme';
import { Btn } from './SearchBar';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/store';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel } from '@mui/material';

function SelectModal({ data }) {
  const [cityData, setCityData] = useState('');
  const [guData, setGuData] = useState('');
  const [selectedGu, setSelectedGu] = useState(new Set(''));
  const [_, setChecked] = useState(false);
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
    }
  };

  const modalCloseHandler = (e) => {
    dispatch(modalActions.onModal());
    const guArray = [...selectedGu];
    const getSelectedData = guData.filter((data) =>
      guArray.includes(data.country)
    );
    getSelectedData.forEach((data) => console.log(data.polygon));
  };

  return (
    <SelectModalContainer>
      <ModalTitle>지역 설정</ModalTitle>
      <SelectHeaderWrap>
        <DropdownWrap>
          <FormControl variant="standard" sx={{ minWidth: 150 }} size="small">
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
            sx={{ minWidth: 150, marginLeft: 3 }}
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
                  marginLeft: '8px',
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

          <SelectedGuWrap>
            {selectedGu.size > 0 && <SelectedGu>{selectedGu}</SelectedGu>}
          </SelectedGuWrap>
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
  width: 690px;
  z-index: 1000;
  padding: 5px 0;
  ${Btn};
`;

const ModalTitle = styled.header`
  padding: 15px 20px;
  font-size: ${font.l};
  font-weight: 600;
  border-bottom: 1px solid ${colors.lightGray};
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
  border: 1px solid ${colors.lightGray};
  cursor: pointer;
`;

const RemoveBtn = styled(AllBtn.withComponent('button'))`
  margin-left: 10px;
  background-color: ${colors.white};
  color: ${colors.fontBlack};
`;

const SelectedCityTitle = styled.div`
  height: 40px;
  padding: 0px 20px;
  background-color: #a3a3a32f;
  font-size: ${font.m};
  line-height: 40px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 215px;
  overflow-y: scroll;
`;

const CheckboxWrap = styled.div`
  border-right: 0.1px solid ${colors.lightGray};
  border-bottom: 0.1px solid ${colors.lightGray};
  width: 224px;
  height: 35px;
`;

const SelectedGuTitle = styled(SelectedCityTitle.withComponent('div'))`
  background-color: ${colors.white};
  border-bottom: 0.1px solid ${colors.lightGray};
  border-top: 0.1px solid ${colors.lightGray};
`;

const SelectedGuWrap = styled.div`
  height: 70px;
  margin-bottom: 20px;
`;
const SelectedGu = styled(CheckboxWrap.withComponent('div'))`
  font-size: ${font.sm};
`;

const ModalCloseBtn = styled(AllBtn.withComponent('button'))`
  display: block;
  margin: 0 auto 30px auto;
`;

export default React.memo(SelectModal);

import { useState } from 'react';
import styled from 'styled-components';
import { colors, font } from '../style/theme';
import { Btn } from './SearchBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel } from '@mui/material';

export const AreaSelectModal = ({ data }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');

  const cityset = data.map((data) => data.city);
  const uniquecity = [...new Set(cityset)];

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
    const filtering = data.filter((data) => data.city === e.target.value);
    setSelectedGu(filtering.map((data) => data.country));
  };

  return (
    <SelectModalContainer>
      <ModalTitle>지역 설정</ModalTitle>
      <SelectHeaderWrap>
        <DropdownWrap>
          <FormControl variant="standard" sx={{ minWidth: 150 }} size="small">
            <InputLabel sx={{ fontSize: '14px' }}>시 선택</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              value={selectedCity}
              onChange={handleChange}
              label="시 선택"
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="" sx={{ fontSize: '14px' }}>
                <em>None</em>
              </MenuItem>
              {uniquecity.map((data) => (
                <MenuItem
                  key={data}
                  value={data}
                  sx={{
                    fontSize: '14px',
                  }}
                >
                  {data}
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
            <Select
              // labelId="demo-simple-select-standard-label"
              // value={selectedCity}
              // onChange={handleChange}
              sx={{ fontSize: '14px' }}
              label="시 선택"
            />
          </FormControl>
        </DropdownWrap>
        <BtnWrap>
          <AllBtn>전체선택</AllBtn>
          <RemoveBtn>선택해제</RemoveBtn>
        </BtnWrap>
      </SelectHeaderWrap>
      <SelectBtnWrap>{selectedCity}</SelectBtnWrap>
      <CheckboxContainer>
        {selectedGu.map((data) => (
          <CheckboxWrap>
            <FormControlLabel control={<Checkbox />} label={data} />
          </CheckboxWrap>
        ))}
      </CheckboxContainer>
    </SelectModalContainer>
  );
};

const SelectModalContainer = styled.div`
  position: fixed;
  top: 120px;
  left: 32vw;
  width: 690px;
  height: 600px;
  z-index: 1000;
  padding: 5px 0;
  ${Btn};
`;

const ModalTitle = styled.header`
  padding: 20px;
  font-size: ${font.l};
  font-weight: 600;
  border-bottom: 1px solid ${colors.lightGray};
`;

const SelectHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const DropdownWrap = styled.div`
  width: 350px;
`;

const BtnWrap = styled.span`
  margin-top: 10px;
`;
const AllBtn = styled.button`
  padding: 8px 30px;
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

const SelectBtnWrap = styled.div`
  height: 20px;
  padding: 10px 20px;
  background-color: #a3a3a32a;
  font-size: ${font.m};
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CheckboxWrap = styled.div`
  border-right: 0.1px solid ${colors.lightGray};
  border-bottom: 0.1px solid ${colors.lightGray};
  width: 227px;
  height: 50;
`;

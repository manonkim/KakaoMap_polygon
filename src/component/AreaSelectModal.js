import styled from 'styled-components';
import { colors, font } from '../style/theme';
import { Btn } from './SearchBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const AreaSelectModal = () => {
  return (
    <SelectModal>
      <ModalTitle>지역 설정</ModalTitle>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="cityselect">시 선택</InputLabel>
        <Select
          id="cityselect"
          // value={city}
          // onChange={handleChange}
          label="시 선택"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </SelectModal>
  );
};

const SelectModal = styled.div`
  position: fixed;
  top: 120px;
  left: 35vw;
  width: 600px;
  height: 600px;
  z-index: 100;
  padding: 5px 0;
  ${Btn};
`;

const ModalTitle = styled.header`
  padding: 20px;
  font-size: ${font.m};
  font-weight: 600;
  border-bottom: 1px solid ${colors.lightGray};
`;

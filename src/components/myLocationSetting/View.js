import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Keyboard} from 'react-native';
import {StandardView, BTN} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {Text} from 'react-native';
import {SearchInput} from './Input';
import {AutoBtn} from './Button';

const Search = styled(StandardView)`
  margin-horizontal: ${widthPercentageToDP(14)};
`;

export const SearchView = ({marginTop}) => {
  return (
    <Search>
      <NBGBText fontSize={18}>지번, 도로명, 건물명을 입력하세요</NBGBText>
      <SearchInput marginTop={marginTop} fontSize={13} />
      <AutoBtn
        marginTop={10}
        title={'현 위치로 주소 설정'}
        onPress={() => {
          Keyboard.dismiss();
        }}
      />
    </Search>
  );
};

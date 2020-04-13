/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGText, NBGLText, NBGBText} from '../common/Text';
import {HpImg, RefreshImg} from './Image';
import {DivisionView, ReservationItem} from '../reservation/Modal';

// "rows": [
//     {
//       "reservationIndex": 4,
//       "userIndex": 3,
//       "hpid": "A1100008",
//       "officeIndex": 16,
//       "treatmentIndex": 3,
//       "treatmentName": "호흡기질환",
//       "reservationDate": "2020-04-15",
//       "reservationTime": "11:30:00",
//       "comment": null,
//       "status": "ACCEPTED",
//       "createdAt": "2020-04-08T11:25:43.000Z",
//       "updatedAt": "2020-04-08T11:25:43.000Z",
//       "hospital": {
//         "dutyName": "(학)고려대학교의과대학부속병원(안암병원)"
//       },
//       "hospitalOffice": {
//         "officeName": "박철수 선생님 - 이비인후과"
//       },
//       "user": {
//         "userName": "이해찬",
//         "age": 21,
//         "tel": null,
//         "email": "haechan@sm.com"
//       }
//     }
//   ]

const Reservation = styled(StandardView)`
  margin-top: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-bottom: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-left: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-right: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  padding-top: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  padding-bottom: ${({padding}) =>
    padding ? widthPercentageToDP(padding) : 0};
  padding-left: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  padding-right: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  border-radius: ${widthPercentageToDP(10)};
  background-color: white;
`;

// 접수중(예약내역)
export const ReservationHistoryItem = ({data}) => {
  return (
    <Reservation margin={10} padding={30}>
      {data[0].status === 'PENDING' ? (
        <StandardView>
          <StandardView
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <StandardView style={{flexDirection: 'row', alignItems: 'center'}}>
              <HpImg width={24} height={24} />
              <NBGBText marginLeft={10}>
                {data[0].user.userName}님 접수현황
              </NBGBText>
            </StandardView>
            <BTN>
              <RefreshImg width={24} height={24} />
            </BTN>
          </StandardView>
          <StandardView>
            <NBGBText marginTop={20} align={'center'} fontSize={30}>
              접수중
            </NBGBText>
          </StandardView>
          <DivisionView />
          <ReservationItem
            itemTitle={'접수일'}
            reservationData={
              data[0].reservationDate + ' / ' + data[0].reservationTime
            }
          />
          <ReservationItem
            itemTitle={'병원명'}
            reservationData={data[0].hospital.dutyName}
          />
          <ReservationItem
            itemTitle={'진료실'}
            reservationData={data[0].hospitalOffice.officeName}
          />
          <DivisionView />
          <StandardView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <NBGText>병원 내원 전</NBGText>
            <BTN
              style={{
                padding: widthPercentageToDP(10),
                borderWidth: widthPercentageToDP(1),
                borderColor: '#dbdbdb',
                borderRadius: widthPercentageToDP(10),
              }}>
              <NBGText>접수 취소</NBGText>
            </BTN>
          </StandardView>
          <DivisionView />
          <NBGLText>
            접수 신청이 증가하여 접수 가능 여부를 확인 중입니다. 접수 상태
            변경을 확인하시려면, 새로고침 버튼을 클릭하여 주세요!
          </NBGLText>
        </StandardView>
      ) : null}
    </Reservation>
  );
};

import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {StartImg, ConnectionImg, FinishImg} from '../home/Image';
import {Img} from '../common/Image';

// 길찾기 페이지 - 대략적 길 정보 뷰
const Leg = styled(StandardView)`
  margin-left: ${widthPercentageToDP(10)};
  margin-right: ${widthPercentageToDP(10)};
  margin-top: ${widthPercentageToDP(10)};
  margin-bottom: ${widthPercentageToDP(10)};
  align-items: center;
`;

const LegInnerView = styled(StandardView)`
  flex-direction: ${({flexDirection}) =>
    flexDirection ? flexDirection : 'column'};
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
  margin-right: ${({marginRight}) =>
    marginRight ? widthPercentageToDP(marginRight) : 0};
  align-items: ${({align}) => (align ? align : 'flex-start')};
`;

const LegText = styled(NBGBText)`
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? widthPercentageToDP(marginBottom) : 0};
`;

export const LegView = ({legs}) => {
  return legs !== null ? (
    <Leg>
      <LegText marginBottom={10}>간략 길찾기 정보</LegText>
      <LegInnerView flexDirection={'row'} align={'center'}>
        <LegInnerView align={'center'} marginRight={5}>
          <StartImg
            width={32}
            height={32}
            source={require('../../../assets/image/home/start.png')}
          />
          <LegText fontSize={12}>{legs.start}</LegText>
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5} align={'center'}>
          <LegText fontSize={10}>{legs.distance + '\n'}</LegText>
          <LegText fontSize={10}>{legs.duration}</LegText>
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView align={'center'} marginRight={5}>
          <FinishImg
            style={{marginBottom: widthPercentageToDP(2)}}
            width={26}
            height={26}
            source={require('../../../assets/image/home/finish.png')}
          />
          <LegText fontSize={12}>{legs.end}</LegText>
        </LegInnerView>
      </LegInnerView>
    </Leg>
  ) : null;
};

// 간략정보 출발&도착 주소 뷰
export const AddressView = styled(LegInnerView)``;

// 간략정보 출발&도착 주소 뷰
export const DetailContainerView = styled(StandardView)``;

export const DetailTitleView = styled(LegInnerView)`
  margin-top: ${widthPercentageToDP(30)};
  align-items: center;
`;

// 하위 상세 길찾기 정보 뷰
const DetailList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  padding-top: ${widthPercentageToDP(20)};
`;

// 상세 길찾기 정보 헤더 뷰
const ListHeaderView = styled(Leg)`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  align-items: flex-start;
`;
const ListFooterView = styled(Leg)`
  margin-top: 0;
  margin-left: 0;
  align-items: flex-start;
`;

//
const CircleView = styled(StandardView)`
  width: ${widthPercentageToDP(10)};
  height: ${widthPercentageToDP(10)};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(5)};
  border-color: black;
`;

const StartView = styled(StandardView)`
  flex-direction: ${({flexDirection}) =>
    flexDirection ? flexDirection : 'row'};
  align-items: ${({alignItems}) => (alignItems ? alignItems : 'center')};
`;

const EndView = styled(StartView)``;

const DivisionView = styled(StandardView)`
  height: ${({height}) =>
    height ? widthPercentageToDP(height) : widthPercentageToDP(30)};
  margin-left: ${widthPercentageToDP(3.5)};
  border-left-width: ${widthPercentageToDP(2)};
  border-left-color: ${({borderColor}) =>
    borderColor ? borderColor : '#8be38c'};
  padding-left: ${widthPercentageToDP(15)};
  justify-content: ${({justifyContent}) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

export const DetailView = ({
  detail,
  start,
  end,
  start_address,
  end_address,
  warning,
}) => {
  const _headerView = () => {
    return (
      <ListHeaderView>
        <StartView>
          <CircleView />
          <NBGBText fontSize={10} marginLeft={10}>
            출발 시간: {start}
          </NBGBText>
        </StartView>
        <DivisionView>
          <NBGBText fontSize={10}>출발지: {start_address}</NBGBText>
        </DivisionView>
      </ListHeaderView>
    );
  };

  const _renderItem = ({item, index}) => {
    // 다시 파싱
    let items = JSON.parse(item);
    return items.travel_mode === 'WALKING' ? (
      <DivisionView height={120} justifyContent={'center'}>
        <StandardView alignItems={'center'} flexDirection={'row'}>
          <Img
            width={24}
            height={24}
            source={require('../../../assets/image/home/walk.png')}
          />
          <StandardView
            marginLeft={40}
            style={{width: widthPercentageToDP(270)}}>
            <NBGBText fontSize={12}>이동 거리: {items.distance}</NBGBText>
            <NBGBText fontSize={12}>이동 시간: {items.duration}</NBGBText>
            <NBGBText marginTop={10} fontSize={12}>
              {items.html_instructions}
            </NBGBText>
          </StandardView>
        </StandardView>
      </DivisionView>
    ) : items.html_instructions.indexOf('버스') !== -1 ? (
      <StandardView>
        <DivisionView />
        <StartView>
          <CircleView />
          <StartView flexDirection={'column'} alignItems={'flex-start'}>
            <NBGBText fontSize={10} marginLeft={10}>
              환승 시간: {items.departure_time_text}
            </NBGBText>
            <NBGBText fontSize={10} marginLeft={10}>
              출발 정류장: {items.departure_stop_name}
            </NBGBText>
          </StartView>
        </StartView>
        <DivisionView
          height={200}
          justifyContent={'center'}
          borderColor={'#24a0fa'}>
          <StandardView alignItems={'center'} flexDirection={'row'}>
            <StandardView style={{width: widthPercentageToDP(80)}}>
              <Img
                width={24}
                height={24}
                source={require('../../../assets/image/home/bus-stop.png')}
              />
              <NBGBText marginTop={10} fontSize={10}>
                {items.html_instructions.substring(
                  3,
                  items.html_instructions.length,
                )}
              </NBGBText>
              <NBGBText fontSize={10}>{items.short_name}번 버스</NBGBText>
            </StandardView>
            <StandardView
              marginLeft={30}
              style={{width: widthPercentageToDP(210)}}>
              <NBGBText fontSize={12}>이동 거리: {items.distance}</NBGBText>
              <NBGBText fontSize={12}>이동 시간: {items.duration}</NBGBText>
              {/* <NBGBText fontSize={12}>
                예상 대기시간: {items.headway > 60 ? items.headway / 60 : 0}
                분(이동시간 제외)
              </NBGBText> */}
              <NBGBText fontSize={12}>
                버스 도착: {items.num_stops} 정류장 전
              </NBGBText>
            </StandardView>
          </StandardView>
        </DivisionView>
        <StartView>
          <CircleView />
          <EndView flexDirection={'column'} alignItems={'flex-start'}>
            <NBGBText fontSize={10} marginLeft={10}>
              환승 시간: {items.arrival_time_text}
            </NBGBText>
            <NBGBText fontSize={10} marginLeft={10}>
              도착 정류장: {items.arrival_stop_name}
            </NBGBText>
          </EndView>
        </StartView>
      </StandardView>
    ) : (
      <StandardView>
        <DivisionView />
        <StartView>
          <CircleView />
          <StartView flexDirection={'column'} alignItems={'flex-start'}>
            <NBGBText fontSize={10} marginLeft={10}>
              환승 시간: {items.departure_time_text}
            </NBGBText>
            <NBGBText fontSize={10} marginLeft={10}>
              출발 정거장: {items.departure_stop_name}
            </NBGBText>
          </StartView>
        </StartView>
        <DivisionView
          height={200}
          justifyContent={'center'}
          borderColor={'#24a0fa'}>
          <StandardView alignItems={'center'} flexDirection={'row'}>
            <StandardView style={{width: widthPercentageToDP(80)}}>
              <Img
                width={24}
                height={24}
                source={require('../../../assets/image/home/bus-stop.png')}
              />
              <NBGBText marginTop={10} fontSize={10}>
                {items.html_instructions.substring(
                  4,
                  items.html_instructions.length,
                )}
              </NBGBText>
              <NBGBText fontSize={10}>{items.short_name}번 지하철</NBGBText>
            </StandardView>
            <StandardView
              marginLeft={30}
              style={{width: widthPercentageToDP(210)}}>
              <NBGBText fontSize={12}>이동 거리: {items.distance}</NBGBText>
              <NBGBText fontSize={12}>이동 시간: {items.duration}</NBGBText>
              {/* <NBGBText fontSize={12}>
                예상 대기시간: {items.headway > 60 ? items.headway / 60 : 0}
                분(이동시간 제외)
              </NBGBText> */}
              <NBGBText fontSize={12}>
                지하철 도착: {items.num_stops} 정거장 전
              </NBGBText>
            </StandardView>
          </StandardView>
        </DivisionView>
        <StartView>
          <CircleView />
          <EndView flexDirection={'column'} alignItems={'flex-start'}>
            <NBGBText fontSize={10} marginLeft={10}>
              환승 시간: {items.arrival_time_text}
            </NBGBText>
            <NBGBText fontSize={10} marginLeft={10}>
              도착 지하철: {items.arrival_stop_name}
            </NBGBText>
          </EndView>
        </StartView>
      </StandardView>
    );
  };

  const _footerView = () => {
    return (
      <ListFooterView>
        <DivisionView justifyContent={'flex-end'}>
          <NBGBText fontSize={10}>도착지: {end_address}</NBGBText>
        </DivisionView>
        <EndView>
          <CircleView />
          <NBGBText fontSize={10} marginLeft={10}>
            도착 시간: {end}
          </NBGBText>
        </EndView>
        <NBGLText marginTop={10} color={'red'} fontSize={10}>
          {warning}
        </NBGLText>
      </ListFooterView>
    );
  };

  return (
    <DetailList
      scrollEnabled={false}
      data={detail}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={_headerView}
      ListFooterComponent={_footerView}
      renderItem={_renderItem}
    />
  );
};

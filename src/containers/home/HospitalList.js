/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {CustomTopView} from '../../components/home/View';
import {List} from '../../components/common/DataList';
import {widthPercentageToDP} from '../../utils/util';

// 임시 데이터
const DATA = [
  // {
  //   distance: 0,
  //   dutyAddr: '주소',
  //   dutyDivName: '의원',
  //   dutyName: '병원이름',
  //   dutyTel1: '전화번호',
  //   startTime: '시작시간',
  //   endTime: '종료시간',
  //   latitude: '위도 숫자',
  //   longitude: '경도 숫자',
  // },
];

const HospitalList = props => {
  const [data, setData] = useState(props.hospitalList);
  const [name, setName] = useState(props.navigation.state.params.object);
  const [dutyDiv, setDutyDiv] = useState(props.navigation.state.params.dutyDiv);

  // 홈(메인) 페이지에서 항목에 맞는 병원 리스트만 보여지는 것으로 가정.

  useEffect(() => {
    const Matching = (findData, dutyDiv) => {
      let searchData = [];

      let MatchingData = data.map((item, index) => {
        if (
          item.dutyName.indexOf(findData) !== -1 ||
          item.dutyDiv.indexOf(dutyDiv) !== -1
        ) {
          return searchData.push(item);
        }
      });

      return searchData;
    };

    setData(Matching(name, dutyDiv));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <TopView
        marginBottom={5}
        title={'HospitalList Page'}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeHandler={() => {
          props.navigation.goBack();
        }}
      /> */}
      <CustomTopView
        settingLocation={props.address}
        height={55}
        navigation={props.navigation}
      />
      {/* <List data={data} navigation={props.navigation} /> */}
      <List data={data} navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default connect(state => ({
  address: state.common.address,
  hospitalList: state.common.hospitalList,
}))(HospitalList);

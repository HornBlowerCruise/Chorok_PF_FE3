import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Grid, Image, Text } from "../../Elements";
import PlantProfile from "../PlantProfile";



// 투두페이지 상단 내 식물 원형 프로필 

const TodoProfile = () => {

  const history = useHistory();

  // 식물 추가 flow로 
  const openAddPlant = () => {
    history.push('/plant');
  };


  return (
    <React.Fragment>
      <ProfileBox>
        <Grid is_flex>
          <PlantProfile  name="전체" imgUrl="img/all.png" />
          <PlantProfile  name="동동이" plant="몬스테라" />
          <PlantProfile  name="동동이" plant="몬스테라" />
          <PlantProfile  imgUrl="img/add.png" />
        </Grid>
      </ProfileBox>
    </React.Fragment>
  );
}


const ProfileBox = styled.div`
    box-sizing: border-box;
    
    width: 100%;
    height: 108px;

    overflow-x: scroll;

    -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

&::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
`


export default TodoProfile;
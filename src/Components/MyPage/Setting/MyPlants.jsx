import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Text, Grid, Image, Button } from '../../../Elements';
import { useHistory } from 'react-router-dom';
import { actionCreators as MyActions } from '../../../Redux/Modules/MyPage';


const MyPlants = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const myPlantList = useSelector(state => state.mypage?.plantList);
    const myPlantCount = useSelector(state => state.mypage?.myPlantCount);
    const scrapPlantList = useSelector(state => state.mypage?.scrapPlantList);
    const scrapPlantCount = useSelector(state => state.mypage?.scrapPlantCount);

    console.log(scrapPlantList);

    useEffect(() => {
        dispatch(MyActions.getMySixPlantsDB());
        dispatch(MyActions.getScrapSixPlantListDB());
    }, [])

    if (!myPlantList || !scrapPlantList) {
        return (
            <div></div>
        )
    }
    return (
        <React.Fragment>
            <Grid padding="0px 16px" width="100%">
                {/* 내 식물 */}
                <TitleWrap>
                    <Text size="large" weight="700">내 식물 <span style={{ color: "#0AAF42" }}>{myPlantCount}</span></Text>
                    {myPlantList?.length ?
                        <AbsoluteBox>
                            <Button type="tran" _onClick={() => history.push('/myplants')}>
                                <Text size="small" color="#525252">더보기</Text>
                            </Button>
                        </AbsoluteBox>
                        : null}

                </TitleWrap>
                <ContentWrap>
                    {myPlantList?.map((p, index) => {
                        return (
                            <Contents key={index}>
                                <Image type="circle" size="96px"
                                    imgUrl={p.myPlantImgUrl ? p.myPlantImgUrl : '/img/plantProfile.svg'} />
                                <Text display="block">
                                    {p?.myPlantName.length < 6 ? p.myPlantName : p.myPlantName.slice(0, 4) + '...'}</Text>
                                <Text size="small" color="#6F6F6F" display="block">
                                    {p.plantName.length < 6 ? p.plantName : p.plantName.slice(0, 5) + '...'}</Text>
                            </Contents>
                        )
                    })}
                </ContentWrap>
                {/* 스크랩한 식물 */}
                <TitleWrap style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <Text size="large" weight="700">스크랩한 식물 <span style={{ color: "#0AAF42" }}>{scrapPlantCount}</span></Text>
                    {scrapPlantList?.length ?
                        <AbsoluteBox>
                            <Button type="tran" _onClick={() => history.push('/scrap-plant')}>
                                <Text size="small" color="#525252">더보기</Text>
                            </Button>
                        </AbsoluteBox>
                        : null}

                </TitleWrap>
                <ScrapContentWrap>
                    {scrapPlantList?.map((p, idx) => {
                        return (
                            <Contents key={idx} onClick={() => history.push(`/plant/${p.plantNo}`)}>
                                <Image type="circle" size="96px" imgUrl={p.plantImgUrl} />
                                <Text size="small" color="#6F6F6F" display="block">
                                    {p.plantName.length < 6 ? p.plantName : p.plantName.slice(0, 5) + '...'}</Text>
                                {/* <Text size="small" color="#6F6F6F" display="block">장미</Text> */}
                            </Contents>
                        )
                    })}
                </ScrapContentWrap>
            </Grid>

        </React.Fragment>
    )
}

const TitleWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    align-items: center;
`
const ContentWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap:20px;
    grid-row-gap:16px;
    width: 100%;
    place-items: center;
    margin-top: 12px;
    margin-bottom: 40px;
`
const ScrapContentWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap:20px;
    grid-row-gap:16px;
    width: 100%;
    place-items: center;
    margin-top: 12px;
    margin-bottom: 40px;
`
const Contents = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    text-align: center;
`

const AbsoluteBox = styled.div`
    position: absolute;
    right: 9px;
`

export default MyPlants;
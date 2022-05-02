import React from 'react';
import styled from 'styled-components';
import { ScrapPicturesHeader, ScrapPicturesPostList } from '../../Components';
import { Text, Grid, Container } from '../../Elements';

const ScrapPicturesPage = () => {

    return (
        <React.Fragment>
            <Container>
                <ScrapPicturesHeader />
                <ScrapPicturesPostList />
            </Container>
        </React.Fragment>
    )
}
export default ScrapPicturesPage;

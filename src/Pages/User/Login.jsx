import { Input, Text} from '../../Elements/index';
import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Grid from '../../Elements/Grid';
import { useHistory } from 'react-router-dom';
import Container from '../../Elements/Container';
//1. JWT토큰 const isLogin  = dispatch(isLogin(sessionStorage.getItem('token')))
//2. 소셜 로그인 (구글 로그인, 카카오로그인)
const Login = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Container>
      <Grid padding="30px 10px">
        <InnerWrap>
          <InnerDiv>
            {/* 로고 */}
            <Image src="sample.jpeg" alt="logo"/>
          </InnerDiv>
          <InnerDiv>
            <form>
              <Input placeholder="이메일(아이디)" type="email" name="user_id"/>
              <Input type="password" placeholder="비밀번호" name="user_pwd" />
              <Button variant='contained' 
              style={{display:"block", margin:"10px auto", width:"320px"}}>Login</Button>
            </form>
            <Button variant='text' 
            style={{display:"block", margin:"10px auto", width:"320px"}} 
            onClick={()=>history.push('/findpwd')}>비밀번호 찾기</Button>
          </InnerDiv>
          <hr />
          <InnerDiv>
            <Button variant='contained' 
            style={{display:"block", margin:"10px auto", width:"320px"}}>Google Login</Button>
            <Button variant='contained' 
            style={{display:"block", margin:"10px auto", width:"320px"}}>KaKao Login</Button>
          </InnerDiv>
          <hr />
          <InnerDiv>
            <Text >회원이 아니신가요? </Text>
            <Button variant='contained' 
            style={{display:"block", margin:"10px auto", width:"320px"}} 
            onClick={()=>history.push('/signup')}>회원가입</Button>
            <Button variant='text' 
            style={{display:"block", margin:"10px auto", width:"320px"}}
            onClick={() => history.push('/home')}>먼저 둘러보고 싶어요! </Button>
          </InnerDiv>
        </InnerWrap>
      </Grid>
      </Container>
    </React.Fragment>
    );
  }
  
const InnerWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px auto;
`
const InnerDiv = styled.div`
width: 100%;
height: 100%;
margin: 0px auto;
text-align:center;
`
const Image = styled.img`
width:100px;
height: 100px;
margin: 0px auto;
border-radius: 30px;
`
export default Login;
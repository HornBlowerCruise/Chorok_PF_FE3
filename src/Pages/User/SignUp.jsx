import { Input, Text, Container, Button } from '../../Elements/index';
import React, { useRef } from 'react';
import styled from 'styled-components';
import Grid from '../../Elements/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../Redux/Modules/User';
import { idCheck, pwdCheck } from '../../Shared/RegEx';
import { userAPI } from '../../Shared/api';
//1. 회원가입 이메일 . 비밀번호 . 닉네임 정규식  > const emailCheck, passwordCheck, nicknameCheck
//2. 프로필 이미지 용량 제한

const SignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isLogin = localStorage.getItem('token');
  
    React.useEffect(() => {
      if(isLogin){
        history.replace('/home');
      }
    }, []);

    const [loading, setLoading] = React.useState(false);

    const [nextPage, setNextPage] = React.useState(1);
    const [userEmail, setUserEmail] = React.useState("");
    const [duplicated, setDuplicated] = React.useState(false);
    const [duplicatedNickname, setDuplicatedNickname] = React.useState(true);
    const [openResult, setOpenResult] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const [profileImgUrl, setProfileImageUrl] = React.useState(null);
    const [nickname, setNickname] = React.useState("");
    const [preview, setPreview] = React.useState("img/profilepreview.svg");

    //회원가입 페이지 내 이동
    const showNextPage = (i) => {
      setNextPage(i+1);
    }
    //이미지 미리보기 부분 클릭시 input클릭되게 연동
    const profileImageRef = useRef("");
    const handleClick = () => {
      profileImageRef.current.click();
    }

    // Base64로 인코딩하여 미리보기 이미지 출력
    const reader = new FileReader(); //FileReader의 인스턴스 reader을 생성한다.
    const encodeFileToBase64 = (fileBlob) => {
      reader.readAsDataURL(fileBlob); //인자로 받은 fileBlob을 base64로 인코딩한다.
      return new Promise(() => {
        reader.onload = () => {
          setPreview(reader.result);  //reader가 인코딩을 성공했다면 reader.result 안에 담긴 문자열을 imageSrc로 세팅해준다.
        }
      })
    }
    

    //email 중복확인
    const checkDuplicated = (userEmail) => {
      userAPI
      .userEmailCheck(userEmail)
      .then((res) => {
        if(res.data.StatusCode === "400 BAD_REQUEST"){
          setDuplicated(true);
        }else {
          setDuplicated(false);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert('연결에 실패하였습니다.');
      })
    }
    //비밀번호 일치 확인
    const passwordMatch = (password, passwordChk) => {
      return password === passwordChk;
    }

    //닉네임 중복확인
    const checkDuplicatedNickname = (nickname) => {
      userAPI
      .nicknameCheck(nickname)
      .then((res) => {
        if(res.data.StatusCode === "400 BAD_REQUEST"){
          setDuplicatedNickname(true);
        }else {
          setDuplicatedNickname(false);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert('연결에 실패하였습니다.');
      })
    }

    //회원가입! 
    const signUp = () => {
      if(nickname === "") {
        window.alert('닉네임을 작성해주세요! ');
        return;
      }
      // 나중에 여기서 dispatch해서 넘겨줄것
      dispatch(userActions.signUpDB(userEmail, password, nickname, profileImgUrl));
    }
    
    return (
      <React.Fragment>
        <Container>
            {nextPage === 1 ? 
              <Grid margin="10px auto">
                <img src="img/progressbar1.svg" style={{marginRight:"4px"}}/><img src="img/progressbar2.svg" style={{marginRight:"4px"}}/><img src="img/progressbar2.svg" />
              </Grid> :
              (
                nextPage === 2 ? 
                <Grid margin="10px auto">
                  <img src="img/progressbar2.svg" style={{marginRight:"4px"}} /><img src="img/progressbar1.svg" style={{marginRight:"4px"}} /><img src="img/progressbar2.svg" />
                </Grid> :
                <Grid margin="10px auto">
                  <img src="img/progressbar2.svg" style={{marginRight:"4px"}} /><img src="img/progressbar2.svg" style={{marginRight:"4px"}} /><img src="img/progressbar1.svg" />
                </Grid>
              )}
            {nextPage === 1 ? 
            <Grid padding="30px 12px" width="100%">
              <SingUpPage>
              <Text margin="36px 0px 24px 0px" size="large" display="block" bold>반가워요! <br /> 사용하실 이메일과  <br />비밀번호를 입력해주세요. 😀</Text>
              <Grid width="100%" >
              {userEmail === ""? 
                // 정상 input
                <Input 
                _onChange={(e)=>{setUserEmail(e.target.value); 
                                idCheck(e.target.value); setOpenResult(false);}} 
                placeholder="이메일" type="email" 
                width="100%" padding="0px 0px 0px 20px" border="1px solid #D5D8DB"></Input>
                :
                ( duplicated || !idCheck(userEmail) ? 
                  // 오류 input
                  <Input 
                  _onChange={(e)=>{setUserEmail(e.target.value); 
                                  idCheck(e.target.value); setOpenResult(false);}} 
                  placeholder="이메일" name="signup_id" type="email" 
                  display="inline-block" height="48px" width="100%" padding="0px 0px 0px 20px" border="1px solid #FA4D56" borderRadius="6px" focusOutline="1px solid #FA4D56"></Input> 
                  : 
                  // 정상 input
                  <Input 
                    _onChange={(e)=>{setUserEmail(e.target.value); 
                                    idCheck(e.target.value); setOpenResult(false);}} 
                    placeholder="이메일" name="signup_id" type="email" 
                    display="inline-block" height="48px" width="100%" padding="0px 0px 0px 20px" border="1px solid #D5D8DB" borderRadius="6px"></Input>
                )
              }
              </Grid>

              <Grid position="relative" width="100%" height="44px" display="flex" align="center"  margin="0px 0px 10px 0px">
              <Grid  margin="0px 0px 0px 10px">
                { userEmail !== "" && !idCheck(userEmail) ? 
                      <Text size="xsmall" color="#FA4D56">이메일 형식이 올바르지 않습니다.</Text> : ""
                }
              </Grid>
              {/* 중복확인 후에 아래 텍스트 출력 */}
              {openResult? 
                <Grid  margin="0px 0px 0px 10px">
                  {duplicated ? 
                      <Text size="xsmall" color="#FA4D56">이미 사용 중인 이메일입니다.</Text> :
                      <Text size="xsmall" color="#0AAF42">사용하실 수 있는 이메일입니다.</Text>
                    }
                </Grid>: 
                null
              }
              <Button type="tran" disabled={!idCheck(userEmail)}
                _onClick={()=> {checkDuplicated(userEmail); setOpenResult(true);}}
                style={{position:"absolute", right:"0px", color:"#6F6F6F", fontSize:"13px"}} variant='text'>중복확인</Button>
              </Grid>
              
              {/* 비밀번호 */}
              {passwordMatch(password, passwordChk) || passwordChk === ""?
              <React.Fragment>
                <Input 
                _onChange={(e)=>{setPassword(e.target.value); 
                                pwdCheck(e.target.value)}} 
                placeholder="비밀번호" type="password" name="signup_pwd" height="52px" width="100%" padding="0px 0px 0px 20px" border="1px solid #D5D8DB" borderRadius="6px"
                margin="0px 0px 8px 0px"></Input>
                <Grid  margin="0px 0px 8px 8px">
                { password !== "" && !pwdCheck(password) ? 
                      <Text size="xxsmall" color="#FA4D56">영문 대문자, 소문자, 숫자를 포함하여 8~20자를 입력해주세요.</Text> : ""
                }
              </Grid>
                <Input 
                _onChange={(e)=>{setPasswordChk(e.target.value); 
                                pwdCheck(e.target.value); }} 
                placeholder="비밀번호 확인" type="password" name="signup_pwd_check" height="52px" width="100%" padding="0px 0px 0px 20px" border="1px solid #D5D8DB" borderRadius="6px" margin="0px"></Input>
                </React.Fragment> 
                : 
                <React.Fragment>
                  <Input 
                  _onChange={(e)=>{setPassword(e.target.value); 
                                  pwdCheck(e.target.value)}} 
                  placeholder="비밀번호" type="password" name="signup_pwd" height="52px" width="100%" padding="0px 0px 0px 20px" border="1px solid #FA4D56" focusOutline="1px solid #FA4D56" borderRadius="6px"
                  margin="0px 0px 8px 0px"></Input>
                   <Grid  margin="0px 0px 8px 8px">
                    { !pwdCheck(password) ? 
                          <Text size="xxsmall" color="#FA4D56">영문 대문자, 소문자, 숫자를 포함하여 8~20자를 입력해주세요.</Text> : ""
                    }
                  </Grid>
                  <Input 
                  _onChange={(e)=>{setPasswordChk(e.target.value); 
                                  pwdCheck(e.target.value); }} 
                  placeholder="비밀번호 확인" type="password" name="signup_pwd_check" height="52px" width="100%" padding="0px 0px 0px 20px" focusOutline="1px solid #FA4D56" border="1px solid #FA4D56" borderRadius="6px"  margin="0px"></Input> 
                </React.Fragment>
              
              }
              
              {passwordMatch(password, passwordChk) || passwordChk === ""?
                "" : 
                <Grid  margin="0px 0px 0px 10px">
                  <Text size="xsmall" color="#FA4D56"> 비밀번호가 일치하지 않습니다.</Text>
                </Grid>
              }
              {/* <Text fontSize="0.7em" color="grey">비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</Text> */}
              {duplicated === true || passwordMatch(password, passwordChk) === false ?

                <Button disabled={duplicated || passwordMatch() === false}
                style={{display:"block", margin:"95px auto auto auto", width:"100%", height:"48px", boxShadow:"none", backgroundColor:"#F4F4F4", color:"#A8A8A8", borderRadius:"6px"}} >다음으로</Button> : 

                (pwdCheck(password) ? 
              
                  <Button style={{display:"block", margin:"95px auto auto auto", width:"100%", height:"48px", boxShadow:"none", backgroundColor:"#0AAF42", color:"#FFFFFF", borderRadius:"6px"}} 
                  onClick={() => {showNextPage(nextPage); setOpenResult(false);}}>다음으로</Button> : 
                  
                  <Button disabled={duplicated || passwordMatch() === false}
                  style={{display:"block", margin:"95px auto auto auto",width:"100%", height:"48px", boxShadow:"none", backgroundColor:"#F4F4F4", color:"#A8A8A8", borderRadius:"6px"}} >다음으로</Button>                   
                )
              }
            </SingUpPage> 
          </Grid>: 
          
            (nextPage === 2 ? 
              <Grid padding="30px 0px" width="100%">
                <ProfileWrap>
                  <Text margin="36px 0px 24px 12px" size="large" display="block" bold>사용하실 닉네임과 <br />프로필이미지를 설정해주세요. 😀</Text>

                    {/* 미리보기 클릭하면 input type=file 오픈하기 */}
                  <Grid margin="32px auto 24px auto" 
                  // _onClick={() => document.getElementById('profileUpdate').click()} 
                  _onClick={handleClick}>
                    {/* 프로필 이미지 미리보기 */}
                    {preview && (
                    <Image
                      src={preview}
                      alt="preview-img"/>
                  )}
                  </Grid>
                  <input 
                  ref = {profileImageRef}
                  onChange={(e)=>{
                                  setProfileImageUrl(e.target.files[0]); 
                                  encodeFileToBase64(e.target.files[0]);}} 
                  type="file" 
                  name="signup_profile_img" id="profileUpdate"
                  style={{margin:"20px auto", display:"none"}} ></input>
                  <Input  
                  max="8"
                  _onChange={(e) => setNickname(e.target.value)} 
                  placeholder="닉네임 ( 최대 8자 )" name="signup_profile_nickname"
                  display="inline-block" margin="0px" height="52px" width="100%" padding="0px 0px 0px 20px" border="1px solid #D5D8DB" borderRadius="6px" ></Input>
                  <Grid width="100%" position="relative" height="44px" display="flex" align="center">
                  {/* 중복확인 후에 아래 텍스트 출력 */}
                  {openResult? 
                    <Grid  margin="0px 0px 0px 10px">
                      {duplicatedNickname  ? 
                        <Text size="xsmall" color="#FA4D56">이미 존재하는 닉네임입니다.</Text> : 
                        <Text size="xsmall" color="#0AAF42">사용하실 수 있는 닉네임입니다.</Text> 
                      }
                    </Grid>: 
                    null
                  }
                    <Button type="tran"
                    _onClick={()=>{checkDuplicatedNickname(nickname); setOpenResult(true);}}>중복확인</Button>
                  </Grid>
                  {duplicatedNickname === "" || duplicatedNickname === true? 
                    <Button disabled={true} style={{display:"block", margin:"95px auto auto auto", width:"320px", height:"48px", boxShadow:"none", backgroundColor:"#F8F8F8", color:"#D5D8DB", borderRadius:"6px"}} variant='contained' name="signup_submit" >회원가입</Button> :
                    <Button style={{display:"block", margin:"95px auto auto auto", width:"320px", height:"48px", boxShadow:"none", backgroundColor:"#0AAF42", color:"#FFFFFF", borderRadius:"6px"}} variant='contained' name="signup_submit" _onClick={()=>{signUp(); showNextPage(nextPage);}}>회원가입</Button>
                  }
                  
                </ProfileWrap> 
              </Grid> :

              <Grid width="100%">
                <Grid margin="160px auto 32px auto">
                  <img src="img/Logo/LOGO.svg" />
                </Grid>
                <Grid margin="10px auto">
                  <Text weight="700">초록 가입을 환영합니다👍</Text>
                </Grid>
                <Grid margin="auto" align="center">
                  <Text size="small">아래의 메일로 인증 메일을 전송하였습니다. <br />전송된 메일에서 링크를 클릭하면 <br />회원가입이 완료됩니다.</Text>
                  <Grid margin="20px 0px 16px 0px" bg="#F7F8FA" width="100%" height="48px" borderRadius="6px" align="center" is_flex>
                    <Text>{userEmail}</Text>
                  </Grid>
                  <Grid margin="auto"
                   _onClick={()=>{dispatch(userActions.signUpDB(userEmail, password, nickname, profileImgUrl)); }}>
                    <p style={{borderBottom:"1px solid #8D8D8D", color:"#8D8D8D", fontSize:"13px"}} >인증메일 재발송</p>
                  </Grid>
                </Grid>

                
                {/* <Grid margin="auto" align="center">
                  <Text size="small">다시 로그인을 하시면 초록을 이용하실 수 있습니다.</Text>
                  <Button onClick={()=>history.push('/login')}
                  variant="text" style={{color: "#42BE65", margin:"50px auto", fontWeight:"700"}}>로그인하기</Button>
                </Grid> */}
              </Grid>
              )}
        </Container>
      </React.Fragment>
    )
}

const SingUpPage = styled.div`
width: 100%;
// text-align: center;
margin: 30px auto;
position: relative;

transition: 0.3s;
`
const ProfileWrap = styled.div`
width: 100%;
height: 80%;
// text-align: center;
margin: 30px auto;
position: relative;
`

const Image = styled.img`
width: 134px;
height: 134px;
border-radius: 134px;
`
export default SignUp;
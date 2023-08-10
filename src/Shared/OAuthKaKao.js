
const REACT_APP_KAKAO_REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback"; // local
// const REACT_APP_KAKAO_REDIRECT_URI =  "https://chorok.shop/auth/kakao/callback"; // deploy
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=61987d99dfe1738afbdd8c691b70409a&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;


// export const GOOGLE_OAUTH_REDIRECT_URI = "http://localhost:3000/auth/google/callback" // local
export const GOOGLE_OAUTH_REDIRECT_URI = "https://chorok.netlify.app/auth/google/callback" // deploy

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth?client_id=" + 
                                process.env.REACT_APP_GOOGLE_CLIENT_ID + 
                                "&redirect_uri=" + GOOGLE_OAUTH_REDIRECT_URI +
                                "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile" + 
                                "&response_type=token" + 
                                "&include_granted_scopes=true"
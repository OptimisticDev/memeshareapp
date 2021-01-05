const PORT = process.env.REACT_APP_PORT || "http://localhost:5000";

export const USER_SIGNUP_POST_URL = `${PORT}/api/users/signup`;
export const USER_SIGNIN_POST_URL = `${PORT}/api/users/signin`;
export const USER_PASSWORD_RESET_POST_URL = `${PORT}/api/users/reset-password`;
export const USER_NEW_PASSWORD_RESET_POST_URL = `${PORT}/api/users/new-password`;

export const POST_POST_URL = `${PORT}/api/posts`;
export const POST_GET_URL = `${PORT}/api/posts`;
export const POST_GET_MYPOST_URL = `${PORT}/api/posts/mypost`;
export const POST_UPDATE_LIKE_UNLIKE_URL = `${PORT}/api/posts/likeunlike`;
export const POST_UPDATE_COMMENT_URL = `${PORT}/api/posts/comment`;

// Cloudnary image upload apiUrl

export const CLOUDNARY_API_URL =
  "https://api.cloudinary.com/v1_1/dhku5t0x0/image/upload";

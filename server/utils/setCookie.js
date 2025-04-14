const { tokenExpirationTime } = require('./expiresTime');

const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokenExpirationTime,
  });
};

module.exports = setCookie

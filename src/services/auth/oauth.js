const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const UserModel = require("../users/schema");
const { authenticate } = require("../auth/tools");

passport.use(
  "spotify",
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: "http://localhost:3003/users/3rdparty/spotify/redirect",
    },
    async function (accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
      try {
        const user = await UserModel.findOne({ email: profile._json.email });
        if (!user) {
          const newUser = {
            name: profile.displayName,
            imgUrl: profile.photos[0].value,
            favourites: [],
            email: profile._json.email,
          };
          const createdUser = new UserModel(newUser);
          await createdUser.save();
          const tokens = await authenticate(createdUser);
          done(null, { user: createdUser, tokens });
        } else {
          const tokens = await authenticate(user);
          done(null, { user, tokens });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser(function (user, next) {
  next(null, user);
});

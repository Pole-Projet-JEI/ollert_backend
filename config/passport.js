const fs = require('fs');
const path = require('path');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const members = require("../controllers/memberController");
const pathToKey = path.join(__dirname, '../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const opts = {
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : PUB_KEY,
algorithms : ["RS256"],
}
const strategy = new JwtStrategy(opts, function(payload, done) {
    members.findOneByID(payload.sub).then((member)=>{
        if (member) {
            return done(null, member);
        } else {
            return done(null, false);
        }
    }).catch((err)=>{
            return done(err, false);
    });
});
module.exports = (passport) => {
    passport.use(strategy)
}
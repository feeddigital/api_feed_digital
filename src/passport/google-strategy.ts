import * as services from '../services/user.services';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import 'dotenv/config';
import { UserType } from '../types/User';

const strategyConfig = {
    clientID: process.env.CLIENT_ID_GOOGLE || '',
    clientSecret: process.env.CLIENT_SECRET_GOOGLE || '',
    callbackURL: process.env.ENV === "prod" ? process.env.CALLBACK_URL_GOOGLE_PROD : process.env.CALLBACK_URL_GOOGLE,
    scope: ['profile', 'email'],
    state: true,
};

const registerOrLogin = async(accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
        // console.log(profile);
        const email = profile._json.email ?? '';
        const firstname = profile._json.given_name ?? '';
        const lastname = profile._json.family_name ?? '';
        const username = email ? email.split("@")[0] : firstname;
        const user = await services.getByEmail(email);
        if(user) return done(null, user);
        const newUser = await services.register({
            firstname,
            lastname,
            username,
            email,
            password: ' ',
            image: profile._json.picture,
            type: UserType.Student,
            active: true
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

passport.use('google', new googleStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user: any, done)=>{
    done(null, user.id)
});

passport.deserializeUser(async(id: string, done)=>{
    try {
        const user = await services.getById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});



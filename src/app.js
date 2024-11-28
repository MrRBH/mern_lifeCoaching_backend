import express from "express";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';
import userprofileRouter from './routes/userprofile.routes.js';
import QuickAskrouter from './routes/quickAsk.routes.js';
import coachqualificaonRouter from './routes/CoachQualification.routes.js';
import  coachProfileRouter from './routes/Coachprofile.routes.js';
import passport from 'passport';
import "./../src/utils/passport.js";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";


const app = express();

 
// console.log(process.env.SESSION_SECRET);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
}))
app.use(passport.initialize());
app.use(passport.session());



// Middlewares
const upload = multer()
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true  , limit: "16kb" }));
app.use(express.static("public")); 
app.use(cookieParser());



// Routes
app.use("/api/v1/user", userRouter);           // for user-related routes
app.use("/api/v1/userprofile", userprofileRouter); // for user profile-related routes
app.use("/api/v1/Quick", QuickAskrouter); // for user profile-related routes
app.use("/api/v1/coach", coachqualificaonRouter); // for coach profile-related routes
app.use("/api/v1/coachProfile", coachProfileRouter); // for coach profile-related routes


// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Export app
export { app };

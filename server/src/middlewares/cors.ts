import  { config} from "dotenv";
config();
export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://app.job.grindby.me"]
    : ["http://localhost:3000"];

export const corsOptions = {
    origin: function (origin: string | undefined, cb: (err: Error | null, allow? :boolean) => void) {
        if(!origin) return cb(null, true);
        if(allowedOrigins.indexOf(origin) !== -1) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS' ],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 864000
};

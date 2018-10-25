export const ENV = {
    production: false,
    isDebugMode: false,
    verifyMobileNumber: false,
    google: {
        notification: {
            appId: "PUTHERE",
            googleProjectNumber: "PUTHERE"
        },
        maps: {
            apiKey: "PUTHERE"
        }
    },
    courierSearchRangeInKm: 20,
    pinLength: 4,
    restApi: {
        protocol: 'https',
        port: 443,
        host: 'lwf.global',
        apiUrl: 'rest/'
    },
    paypal: {
        accessKey: 'PUTHERE',
        sandbox: true
    },
};

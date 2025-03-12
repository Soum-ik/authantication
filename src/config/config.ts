export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
    },
    database: {
        uri: process.env.DATABASE_URI
    }   
})
let env = process.env.NODE_ENV
export const url = env == 'development' ? 'http://localhost:3001' : 'https://www.sendmsg.ai'

export default {
    url: url,
};

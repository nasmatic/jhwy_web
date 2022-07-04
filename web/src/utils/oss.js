import request from './request';

let accessid = '';
let signature = '';
let policy = '';
let expire = 0;
let host = '';
let saveName = '';
let now = Date.now();

function ossRes() {
    return {
        host,
        key: saveName,
        policy,
        OSSAccessKeyId: accessid,
        success_action_status: '200',
        signature
    };
}

export default filename => {
    now = Date.now();
    saveName = filename;

    if (expire < now + 10000) {
        return request.get('/upload/sign').then(res => {
            policy = res.data['policy'];
            accessid = res.data['accessid'];
            signature = res.data['signature'];
            expire = parseInt(res.data['expire']);
            host = res.data['host'];
            console.log(policy)
            console.log(accessid)
            console.log(signature)
            console.log(host)


            return ossRes();
        });
    } else {
        return Promise.resolve(ossRes());
    }
};

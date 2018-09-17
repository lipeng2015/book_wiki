const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, openid} = ctx.request.query
    try {
        const mysplSelect = mysql('comments').select('comments.*', 'cSessionInfo.user_info').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
        let comments
        if (bookid) {
            comments = await mysplSelect.where('bookid', bookid)
        } else if (openid) {
            comments = await mysplSelect.where('openid', openid)
        }
        ctx.state.data = {
            list: comments.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    title: info.nickName,
                    image: info.avatarUrl
                })
            })
        }
    } catch (e) {
        ctx.state.data = {
            msg: '查询失败+' + e.sqlMessage
        }
    }
}

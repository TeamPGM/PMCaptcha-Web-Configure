export const actionlist = [{
    label: '封禁',
    value: 'ban'
}, {
    label: '封禁并删除对话',
    value: 'delete'
}, {
    label: '不执行任何操作',
    value: 'none'
}]

export const premiumlist = [{
    label: '白名单',
    value: 'allow'
}, {
    label: '封禁',
    value: 'ban'
}, {
    label: '不执行任何操作',
    value: 'none'
}, {
    label: '只允许',
    value: 'only'
}]

export const typelist = [{
    label: '计算验证',
    value: 'math'
}, {
    label: '图像辨识验证',
    value: 'img'
}, {
    label: ' 贴纸验证',
    value: 'sticker'
}]

export const floodactlist = [{
    label: '同验证失败处理',
    value: 'asis'
}, {
    label: '删除并举报(最快)',
    value: 'delete'
}, {
    label: '逐一进行 CAPTCHA 挑战',
    value: 'captcha'
}, {
    label: '不执行任何操作',
    value: 'none'
}]

export const imgproviderlist = [{
    label: 'ArkLabs funCaptcha',
    value: 'func'
}, {
    label: 'GitHub 螺旋星系',
    value: 'github'
}, {
    label: 'Google reCAPTCHA ',
    value: 'rec'
}]

export const defaults = {
    "welcome": "",
    "blacklist": "",
    "whitelist": "",
    "timeout": null,
    "img_timeout":null,
    "sticker_timeout":null,
    "disable_pm": false,
    "action": "ban",
    "report": true,
    "premium": "none",
    "groups_in_common": null,
    "chat_history": null,
    "initiative": true,
    "silent": false,
    "flood": null,
    "flood_username": false,
    "flood_act": "delete",
    "collect_logs": true,
    "type": "math",
    "img_captcha": "func",
    "img_captcha_retry": null,
    "version": "2.26",
    "cmd":"pmcaptcha"
}
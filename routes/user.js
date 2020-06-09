const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: { id: req.user.id}});       // foreignKey : 'followerId' 로 역할함.(아래 실행하면)
        await user.addFollowing(parseInt(req.params.id, 10));       // req.params.id가 followingId로 됨.
        // user.addFollowing(매개변수);  하는 순간!
            // user가 followerId 이고,  ( Follow테이블의 foreignKey임.)
            // 매개변수가 followingId(as를 소문자+Id)로 바뀌어서 대입됨.
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: { id : req.user.id}});
        await user.removeFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (err) {
        console.log('오류에요!!!!!!');
        next(err);
    }
});

module.exports = router;
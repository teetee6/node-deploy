const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',   // 현재 나의 Id(Source Id)가 들어감.
  as: 'Followings',     // associate되서 db로 들어가면,  followingId로 바뀜(Target Id로 바뀌는 뜻).
  through: 'Follow',
});

// db.User.belongsToMany(db.Post, {
//   foreignKey: 'postingId',
//   as: 'Likings',
//   through: 'Like',
// });

// db.Post.belongsToMany(db.User, {
//   foreignKey: 'likingId',
//   as: 'Postings',
//   through: 'Like',
// });

module.exports = db;
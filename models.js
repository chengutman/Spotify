const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:[true,'User name is required']
    },
    email:{
        type: String,
        required:[true,'email is required'],
        unique:true
    },
    genre:{
        type:[String],
        enum:['Pop','Rock','R&B','Hiphop','Rap','Jazz','Classical','Soul','Gosspel','Metal','Latin']
    }
});
const songSchema = new mongoose.Schema({
    songName:{ type: String, required:[true,'song name is required']},
    Artist:{type:String},
    genre:{
        type:String,
        enum:['Pop','Rock','R&B','Hiphop','Rap','Jazz','Classical','Soul','Gosspel','Metal','Latin'],
        required:true
    }
});
const PlaylistSchema= new mongoose.Schema({
   user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
   },
   songs:{
       type:[mongoose.Schema.Types.ObjectId],
       ref:'Song',
       required:true
   }
});

const User = mongoose.model('User', userSchema);
const Song = mongoose.model('Song', songSchema);
const Playlist = mongoose.model('Playlist',PlaylistSchema);
module.exports={
    User,
    Song,
    Playlist
}
const express=require('express');
const router = express.Router();
const {User,Song,Playlist}= require('./models');
const {createPlaylist,updateUserPlaylist,deleteUserPlaylist,showPlaylist} = require('./handlers');


router.post('/addUser',async (req, res) =>{
    const newUser = new User({
        userName: req.body.name,
        email: req.body.email,
        genre: req.body.genre
    });
    try{
        let savedUser = await newUser.save();
        res.json(savedUser);
        createPlaylist(savedUser._id,{$in:savedUser.genre});
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            let msg = `Invalid Input Error: the email address is already used`;
            console.log(msg);
            res.json({message: msg});
        }else{
            console.log(err.message);
            res.json({message:err.message});
           
        }
    }

});


router.post('/getSongsIDs', async (req, res) =>{
    createPlaylist(1,req.body.genres);
    res.send("ok");
})
router.post('/addSong', async (req, res) => {
    const newSong = new Song({
        songName: req.body.name,
        Artist: req.body.artist,
        genre: req.body.genre
    });
    try{
        let savedSong = await newSong.save();
        res.json(savedSong);
    }catch(err){
        res.json({message: err.message});
    }
})
router.put('/updateGenre',async (req, res) =>{
   
    try{
        let findUserId= await User.findOne({email: req.body.email},'_id');
        let updateUserGenre = await User.updateOne({email:req.body.email }, { $set: { genre: req.body.genre } });
        if(updateUserGenre.n==0)
        {
            console.log(`we could not find ${email}`);
            res.json({message:`we could not find ${email}`});
        }
        else{
            updateUserPlaylist(findUserId,req.body.genre);
            console.log(`updated successfully!`);
            res.json({message:`updated successfully!`});
        }
    }catch(err){
            console.log(err.message);
            res.json({message:err.message});
    }

});

router.delete('/deleteUser',async (req, res) =>{
    try{
        let findUserId= await User.findOne({email: req.body.email},'_id');
        let deleteUser = await User.deleteOne({email: req.body.email});
        if(!deleteUser)
        {
            console.log(`we could not find ${req.body.email} to delete`);
            res.json({message:`we could not find ${req.body.email} to delete`});
        }
        else{
                console.log(findUserId);
                deleteUserPlaylist(findUserId);
                console.log(`deleted successfully!`);
                res.json({message:`deleted successfully!`});
        }
    }catch(err){
            console.log(err.message);
            res.json({message:err.message});
    }

});
router.get('/viewAllUsers',async (req, res) =>{ 
    try{
        let allUsers = await User.find();
        res.json(allUsers);
    }catch(err){
            console.log(err.message);
            res.json({message:err.message});
    }

});
router.get('/showPlaylist',async (req, res) =>{
   
    try{
        let findUser = await User.findOne({email:req.query.email});
        if (findUser)
        {
            try{
                console.log(findUser._id);
                let findUserPlaylist = await Playlist.findOne({user:findUser._id});
                if(findUserPlaylist)
                {
                    console.log(`This is ${findUser.userName}'s playlist:`);
                    showPlaylist(findUserPlaylist._id).then( result => {
                        console.log(result);
                        res.json({result});
                    });
                }
                else{
                    console.log(`There is no playlist for ${findUserPlaylist.name}`);
                }
            }
            catch{
                console.log(err.message);
                res.json({message:err.message});
            }
        }
        
    }catch(err){
            console.log(err.message);
            res.json({message:err.message});
    }

});

module.exports={
    router
}
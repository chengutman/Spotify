const {User,Song,Playlist}= require('./models');


const createPlaylist= async(userId,genreUser)=>{
    try{
        let userPlaylisetSongs=await Song.find({genre: genreUser},'_id');
        console.log(userPlaylisetSongs);
        if(!userPlaylisetSongs.length)
        {
                console.log(`There are no songs in these musical genres`);
        }
        else{
            console.log(userPlaylisetSongs);
            const newPlaylist = new Playlist({
                user: userId,
                songs: userPlaylisetSongs
            })
            try{
                let savedPlaylist = await newPlaylist.save();
                console.log('user playlist song was created successfully!');
            }catch(err){
                return err;
            }
            
        }
    }catch(err){
        return err;
    }
}

const updateUserPlaylist= async(userId,genreUser)=>{
    try{
        let updatePlaylisetSongs=await Song.find({genre:{$in:genreUser}},'_id');
        if(!updatePlaylisetSongs.length)
        {
                console.log(`There are no songs in these musical genres`);
        }
        else{
            const updatedPlaylist = await Playlist.updateOne({user:userId._id},{$set: {songs:updatePlaylisetSongs} });
            if(updatedPlaylist.n==0)
            {
                console.log(`we could not find ${userId.name} Playlist`);
            }
            else{
                console.log(`updated successfully!`);
                console.log(updatedPlaylist);
            }
            
        }
    }catch(err){
        return err;
    }
   
 }

 const deleteUserPlaylist= async(userId)=>{
    try{
        let deletePlayliset= await Playlist.deleteOne({user: userId._id});
        if(!deletePlayliset)
        {
            console.log(`There is no playlist for ${deletePlayliset.name}`);
        }
        else{
            console.log(`deleted successfully!`);
        }
    }catch(err){
        return err;
    }
   
 }
 const showPlaylist = async (playlistID) => {
    try{
        let songsId = await Playlist.findOne({_id: playlistID}, 'songs');
        if(!songsId)
        {
            console.log(`There is no playlist`);
        }
        else{
            let showSongs = await Song.find({_id:{$in: songsId.songs}},'songName');
            return showSongs;
        }
    }catch(err){
        return err;
    }
   
 }

module.exports={
    createPlaylist,
    updateUserPlaylist,
    deleteUserPlaylist,
    showPlaylist
   
}
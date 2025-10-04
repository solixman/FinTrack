


function checkUser(req,res,next){

    if( !req.session.user || !req.session.isLoggedIn){
        console.log(req.originalUrl);
        console.log('not logged in');
        req.flash('message','please log in to be anle to use this function');
        return res.redirect('/login');

    }
       console.log('user is logged in ');
       next();
        
}

module.exports=checkUser;
const Sauces = require('../models/sauces');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
  
};

exports.createSauces =  (req, res, next) => {
    console.log("createSauces")
    console.log(req.body)
    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    const sauces = new Sauces({
      ...saucesObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersdisLiked: [],
    });
    sauces.save() //A modifier impérativement 
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneSauces =  (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    const saucesObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body };
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};





exports.likes = (req, res, next) => {

    
  //recuperer id client envoye par front
  const userId =req.body.userId;
  
  //si like = 1
  if (req.body.like == 1){
  //Ajouter le userID  au tableau userLiked +1like
  Sauces.updateOne({_id: req.params.id}, {$push: { usersLiked : userId },$inc: { likes: +1 }})
  .then(()=> res.status(201).json({message: 'liked !'}))
  .catch(error => res.status(400).json({ error }));      
      
  }

  else {
      //si disliked =1
      if (req.body.like == -1){
        //Ajouter le userID  au tableau userDisliked
        Sauces.updateOne({_id: req.params.id}, {$push: { usersDisliked : userId },$inc: { dislikes: +1 }})
        .then(()=> res.status(201).json({message: 'Disliked !'}))
        .catch(error => res.status(400).json({ error }));      
      
      }
      //si like = 0  il faudrat enlever l id user de userliked et userDisliked 
      else {
        //rechercher la sauce 
        Sauces.findOne({ _id: req.params.id})
        .then((sauce) =>{
          //Si le user est dans  usersliked 
          if(sauce.usersLiked.includes(userId)){
                //Retirer le userID  au tableau userLiked - 1 likes
            Sauces.updateOne({_id: req.params.id}, {$pull: { usersLiked : userId }, $inc: {likes : -1 }})
            .then(()=> res.status(201).json({message: 'not liked anymore!'}))
            .catch(error => res.status(400).json({ error }));                   
          }
          //Si le user est dans  usersliked
          if(sauce.usersDisliked.includes(userId)){
            //Retirer le userID  au tableau userLiked -1 dislikes
            Sauces.updateOne({_id: req.params.id}, {$pull: { usersDisliked : userId }, $inc: {dislikes : -1 }})
            .then(()=> res.status(201).json({message: 'not disliked anymore!'}))
            .catch(error => res.status(400).json({ error }));                   
      }
        
        })

      }
  }
};
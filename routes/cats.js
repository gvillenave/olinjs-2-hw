// routes for cats
var Cat = require('../models/cats')

// random function
Array.prototype.random = function (length) {
    return this[Math.floor((Math.random()*length))];
}

// list all the cats sorted by age
exports.list = function(req, res){
  var cats = Cat.find({}).sort('age').execFind(function (err, docs) {
      if (err)
          return console.log("error", cats);
      // display the list
      res.render('cats', {cats: docs, title: 'All the cats!!!'});
  });
};

// list cats of a specified color
exports.listcolor = function(req, res){
    var cats = Cat.find({ colors: { $all: req.params.color } }).sort('age').execFind(function (err, docs) {
        if (err)
            return console.log("error", cats);
        // display the list
        res.render('cats', {cats: docs, title: 'All the ' + req.params.color + ' cats!!!'});
    });
}

// create a new cat
exports.create = function(req, res){
    // pick a random name
    var names = ['Robert', 'King Meow', 'Captain Pussy', 'Catnye West', 'Beyonce Meowles'];
    var randName = names.random(names.length);

    // pick random colors
    var colors = ['brown', 'white', 'black', 'ginger', 'rainbow', 'zebra'];
    var randColors = [];
    for(var i=0; i<Math.floor((Math.random()*4)); i++) {
        randColors.push(colors.random(colors.length));
    }

    // pick a random age
    var randAge = Math.floor((Math.random()*15));

  var newCat = new Cat({ name: randName, age: randAge, colors: randColors});
  newCat.save(function (err) {
    if (err)
      return console.log("error we couldn't save this cat :(");
    // redirect to the list of cats
    res.redirect('/cats');
  });
};

// delete the oldest cat
exports.deleteold = function(req, res){
    var delCat = Cat.findOne({}).limit(1).sort('-age').exec(function (err, docs) {
        if (err)
            return console.log("error", delCat);
        // remove the cat
        docs.remove();
        res.redirect('/cats');
    });
}
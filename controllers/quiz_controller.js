var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error);});
};


// GET /quizes/
exports.index = function(req, res) {
  if(req.query.search){    
    var search  = '%'+ req.query.search.replace(/ /g, '%') + '%';

    models.Quiz.findAll({where: ["pregunta like ?", search],order: 'pregunta ASC'}).then(
      function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes});
      }
    ).catch(function(error){next(error);});

  } else {
    models.Quiz.findAll().then(
      function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes});
      }
    ).catch(function(error){next(error);});

  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(
    function(quiz){
      res.render('quizes/show', {quiz: quiz});
    }
  ).catch(function(error){next(error);});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

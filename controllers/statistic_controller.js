var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res) {
  var statistics = {};

  // Obtiene el total de preguntas
  models.Quiz.count().then( function(count) {
    statistics.totPreg = count;
 
    // Obtiene el total de comentarios
    models.Comment.count().then( function(count) {
      statistics.totComen = count;
 
      // Obtiene la media de comentarios por pregunta
      statistics.mediaComen= parseFloat( statistics.totComen / statistics.totPreg ).toFixed(2);
       
      // Obtiene el total de preguntas con comentarios
      global.sequelize.query('SELECT count(DISTINCT "QuizId") AS "count" FROM "Comments" AS "Comment"' 
        ,{ type: sequelize.QueryTypes.SELECT}).then(function(count){
        statistics.totPregConComen = count[0]["count"];
 
        // Obtiene el total de preguntas sin comentarios
        statistics.totPregSinComen = statistics.totPreg - statistics.totPregConComen;
 
        // Muestra los resultados obtenidos
        res.render('statistics/index.ejs', { statistics: statistics, errors: []});
      });

    });

  });

 };

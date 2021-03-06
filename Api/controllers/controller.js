import db from '../db/db';
/* eslint-disable class-methods-use-this */
class controller {
  getAllquestions(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'questions retrieved successfully',
      questions: db,
    });
  }

  getquestion(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((question) => {
        if (question.id === id) {
            console.log("got here")
            return res.status(200).send({
                success: 'true',
                message: 'question retrieved successfully',
                question,
            });
        }
        else if (Number.isInteger(id) === false  || id == false) {
            console.log("got here now")
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid params',
            });
        }
        else {
            console.log("lastly")
            return res.status(404).send({
                success: 'false',
                message: 'question does not exist',
            });
        }
    });
}
  

  createquestion(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }
    const question = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description,
    };
    db.push(question);
    return res.status(201).send({
      success: 'true',
      message: 'question added successfully',
      question,
    });
  }

  updatequestion(req, res) {
    const id = parseInt(req.params.id, 10);
    let questionFound;
    let itemIndex;
    db.map((question, index) => {
      if (question.id === id) {
        questionFound = question;
        itemIndex = index;
      }
    });

    if (!questionFound) {
      return res.status(404).send({
        success: 'false',
        message: 'question not found',
      });
    }
    if (!req.body.title && !req.body.description) {
      console.log("got here")
      return res.status(400).send({
        success: 'false',
        message: 'body is required',
      });
    } else if (!req.body.title) {
      console.log("got here title")
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      console.log("got here description ")
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newquestion = {
      id: questionFound.id,
      title: req.body.title || questionFound.title,
      description: req.body.description || questionFound.description,
    };

    db.splice(itemIndex, 1, newquestion);

    return res.status(201).send({
      success: 'true',
      message: 'question added successfully',
      newquestion,
    });
  }

  deletequestion(req, res) {
    const id = parseInt(req.params.id, 10);
    let questionFound;
    let itemIndex;
    db.map((question, index) => {
      if (question.id === id) {
        questionFound = question;
        itemIndex = index;
      }
      else if (Number.isInteger(id ) === false || id  == false) {
        console.log("got here now")
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid params',
        });
    }
      else if (!questionFound) {
        console.log("got here")
        return res.status(404).send({
          success: 'false',
          message: 'question not found',
        });
      }
      db.splice(itemIndex, 1);
      return res.status(200).send({
        success: 'true',
        message: 'question deleted successfuly',
      });
     
    });

   
    

    
  }
}

const Controller = new controller();
export default Controller;

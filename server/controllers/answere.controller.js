import Answer from '../models/answer.model.js';

export const getAnswer = async (req, res) => {
  const { modulename, questionNumber } = req.query;
  
  try {
    const answer = await Answer.findOne({ modulename, questionNumber });
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    return res.status(200).json(answer);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

export const createAnswer = async (req, res) => {
  try {
    const answer =  await Answer.insertMany(req.body);
  
    console.log(answer);
    return res.status(201).json(answer);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

export const updateAnswer = async (req, res) => {
  const { modulename, questionNumber } = req.query;
  
  try {
    const answer = await Answer.findOneAndUpdate(
      { modulename, questionNumber },
      req.body,
      { new: true } 
    );
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    console.log(answer);
    return res.status(200).json(answer);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

export const deleteAnswer = async (req, res) => {
  const { modulename, questionNumber } = req.query;
  
  try {
    const answer = await Answer.findOneAndDelete({ modulename, questionNumber });
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    console.log(`Deleted answer: ${answer}`);
    return res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

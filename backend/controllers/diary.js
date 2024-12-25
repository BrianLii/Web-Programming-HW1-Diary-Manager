import DiaryModel from "../models/diaryModel.js";

export const getDiaries = async (req, res) => {
  try {
    const diaryEntries = await DiaryModel.find({});
    res.json(diaryEntries);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateDiary = async (req, res) => {
  try {
    const { date, content, tag, mood, id } = req.body;
    const diary = await DiaryModel.findOne({'_id' : id})
    diary.date = date;
    diary.content = content;
    diary.mood = mood;
    diary.tag = tag;
    await diary.save();
    res.status(200).json(diary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const createDiary = async (req, res) => {
  try {
    const { date, content, tag, mood } = req.body;
    const diary = new DiaryModel({ date, content, tag, mood });
    await diary.save();
    res.status(201).json(diary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
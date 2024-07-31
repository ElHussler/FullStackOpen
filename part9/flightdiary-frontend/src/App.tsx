import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, VisibilityFormType, Weather, WeatherFormType } from './types/types';
import { addDiary, getAllDiaries } from './services/diaryService';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<VisibilityFormType>(null);
  const [newWeather, setNewWeather] = useState<WeatherFormType>(null);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])

  const handleAddDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!newWeather || !newVisibility || newDate.length === 0) {
      setError(`Required fields are empty`);
      setTimeout(() => {
        setError('');
      }, 5000);

      return;
    }

    const newDiaryEntry = {
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment
    }

    addDiary(newDiaryEntry)
      .then(addedDiary => {
        setDiaries(diaries.concat(addedDiary));
      })
      .catch(error => {
        let msg = 'Error. Something went wrong.'

        if (axios.isAxiosError(error)) {
          if (error.response) {
            msg = `${error.response.data}`;
          }
        }
        setError(msg);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <>
      <h1>Add Diary</h1>
      <div>
        {error}
      </div>
      <form onSubmit={handleAddDiary}>
        <div>
          date <input
            type='date'
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
            />
        </div>
        <div>
          weather: {Object.values(Weather).map(w => (
            <div key={w.toString()} style={{display: 'inline-block'}}>
              {w.toString()} <input
                type='radio'
                name='weather'
                value={w.toString()}
                onChange={(event) => setNewWeather(event.target.value as Weather)}
              />
            </div>
          ))}
        </div>
        <div>
          visibility: {Object.values(Visibility).map(v => (
            <div key={v.toString()} style={{display: 'inline-block'}}>
              {v.toString()} <input
                type='radio'
                name='visibility'
                value={v.toString()}
                onChange={(event) => setNewVisibility(event.target.value as Visibility)}
                />
            </div>
          ))}
        </div>
        <div>
          comment: <input
            type='text'
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            />
        </div>
        <button type='submit'>add</button>
      </form>

      <h1>Diary entries</h1>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
          <p>Comments: {(!d.comment || d.comment === "") ? "N/A" : d.comment}</p>
        </div>
      ))}
    </>
  )
}

export default App

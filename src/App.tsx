import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css'

import MockDate from 'mockdate'
import timemachine from 'timemachine';
import tk from 'timekeeper';
import moment from 'moment';
import { format, endOfDay  } from 'date-fns'
import dayjs from 'dayjs';

function App() {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    axios.get('https://api-dev.komodo.digital/v1/tender/info').then((response) => {
      tk.travel(new Date(response.headers.date));

      // MockDate.set(new Date(response.headers.date))

      // timemachine.config({
      //   dateString: new Date(response.headers.date).toString(),
      //   tick: true,
      // })

      console.log('moment', moment().isAfter(new Date('2022-08-05')));
      console.log('dayjs', dayjs())
      console.log(format(endOfDay(new Date()), 'yyyy-MM-dd'))
      setDate(new Date());
    })
  }, []);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <div className="App">
      {date.toString()}

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

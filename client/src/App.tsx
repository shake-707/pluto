import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [hello, setHello] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/hello`);

        if (!response.ok) {
          throw new Error('couldnt get data');
        }

        const data = await response.text();

        setHello(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div>{hello}</div>
    </>
  );
}

export default App;

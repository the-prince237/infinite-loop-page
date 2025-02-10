import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [pages, setPages] = useState(2)
  const scrollRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const prevScrollY = useRef<number>(0)

  const handleScroll = () => {
    const scrollPosition = scrollRef.current?.scrollTop || 0;
    
    if(scrollPosition >= prevScrollY.current) {
      const scrollHeight = scrollRef.current?.scrollHeight || 0;
      const viewportHeight = window.innerHeight;
      const scrollLimit = scrollHeight - viewportHeight - 5;

      if ((scrollPosition - 5) % scrollLimit === 0) {
        setPages(pages => pages+1);
      }
    } else {
      setPages(2)
    }

    prevScrollY.current = scrollPosition;
  };

  useEffect(() => {
    return handleScroll()
  }, [])
  

  return (
    <div className='App' ref={scrollRef} onScroll={handleScroll}>
      <div ref={wrapperRef} className='Wrapper'>
        {Array.from({length: pages}, (_item, index) => 
          <div className='Content' key={index}>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
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
        )}
      </div>
    </div>
  )
}

export default App

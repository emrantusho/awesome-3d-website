import { Suspense, cloneElement, useEffect, useState } from 'react'

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), [])
  return null
}

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // this shouldn't be necessary but for some reason the suspense never resolves - setReady is never called    
    setTimeout(() => setReady(true), 2000)
  }, []);

  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        { clicked ? children : <></> }
      </Suspense>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div className="stack">
          <a href="#" onClick={() => setClicked(true)}>
            {!ready ? 'loading' : 'click to continue'}
          </a>
        </div>        
      </div>
    </>
  )
}

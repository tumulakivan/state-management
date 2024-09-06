import Bar from './components/Bar'

import { useState } from 'react'

function App() {
  const [queue, setQueue] = useState([])
  const [prioQueue, setPrioQueue] = useState([])
  const [regQueue1, setRegQueue1] = useState([])
  const [regQueue2, setRegQueue2] = useState([])
  const [regQueue3, setRegQueue3] = useState([])
  const [currPrio, setCurrPrio] = useState([])
  const [currTask, setCurrTask] = useState([])
  const [prio_tasks, set_new_prio] = useState([])
  const [q1_tasks, set_new_q1] = useState([])
  const [q2_tasks, set_new_q2] = useState([])
  const [q3_tasks, set_new_q3] = useState([])
  const [totalPrio, setNewTotalPrio] = useState(0)
  const [totalQ1, setNewTotalQ1] = useState(0)
  const [totalQ2, setNewTotalQ2] = useState(0)
  const [totalQ3, setNewTotalQ3] = useState(0)

  const createItem = () => {
    const randomNumber = testRandom()
    const rank = Math.random() < 0.2 ? 1 : 0
    setCurrPrio([...currPrio, rank])
    setCurrTask([...currTask, randomNumber])
    const squareComponent = createSquareComponent(randomNumber, rank)

    return (
      <div>
        {squareComponent}
      </div>
    )
  }

  const createSquareComponent = (number, rank) => {
    return (
      <div style={{
        width: '50px',
        height: 'auto',
        margin: '2px',
        borderRadius: '5px',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rank === 1 ? '#f78f9f' : '#6195c9',
        boxShadow: '3px 7px 10px rgba(1, 0, 0, 0.35)',
        fontSize: '18px'
      }}>
        {number}
      </div>
    )
  }
  
  const enqueue = () => {
    const newItem = createItem()
    setQueue([...queue, newItem])
  }

  const enqueueHighPrio = (item, task) => {
    const newItem = item
    setPrioQueue([...prioQueue, newItem])

    const newTask = task
    set_new_prio([...prio_tasks, newTask])

    const total = prio_tasks.reduce((acc, item) => acc + item, 0) + task
    setNewTotalPrio(total)
  }

  const enqueue1 = (item, task) => {
    const newItem = item
    setRegQueue1([...regQueue1, newItem])

    const newTask = task
    set_new_q1([...q1_tasks, newTask])

    const total = q1_tasks.reduce((acc, item) => acc + item, 0) + task
    setNewTotalQ1(total)
  }

  const enqueue2 = (item, task) => {
    const newItem = item
    setRegQueue2([...regQueue2, newItem])

    const newTask = task
    set_new_q2([...q2_tasks, newTask])

    const total = q2_tasks.reduce((acc, item) => acc + item, 0) + task
    setNewTotalQ2(total)
  }

  const enqueue3 = (item, task) => {
    const newItem = item
    setRegQueue3([...regQueue3, newItem])

    const newTask = task
    set_new_q3([...q3_tasks, newTask])

    const total = q3_tasks.reduce((acc, item) => acc + item, 0) + task
    setNewTotalQ3(total)
  }

  const dequeue = () => {
    let enqueueItem = 0
    let enqueueTask = 0
    
    if(queue.length > 0) {
      enqueueItem = queue[0]
      const newQueue = [...queue]
      newQueue.shift()
      setQueue(newQueue)

      enqueueTask = currTask[0]
      const newCurrTask = [...currTask]
      newCurrTask.shift()
      setCurrTask(newCurrTask)
      
      const newCurrPrio = [...currPrio]
      newCurrPrio.shift()
      setCurrPrio(newCurrPrio)
    }

    {/* conditions for queueing. spaghetti code begins :( */}

    if(enqueueItem != 0) {
      if(currPrio[0] === 1) {
        enqueueHighPrio(enqueueItem, enqueueTask)
      } else {
        if(regQueue3.length === 0) {
          enqueue3(enqueueItem, enqueueTask)
        } else if(regQueue2.length === 0) {
          enqueue2(enqueueItem, enqueueTask)
        } else if(regQueue1.length === 0) {
          enqueue1(enqueueItem, enqueueTask)
        } else if(totalQ3 < totalQ2 && totalQ3 < totalQ1) {
          enqueue3(enqueueItem, enqueueTask)
        } else if(totalQ2 < totalQ3 && totalQ2 < totalQ1) {
          enqueue2(enqueueItem, enqueueTask)
        } else {
          enqueue1(enqueueItem, enqueueTask)
        }
      }
    }
  }

  const testRandom = () => {
    return Math.floor(Math.random() * 100) + 1
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen p-5 bg-slate-500">
      <div className="flex flex-row w-4/5 h-full p-3 border border-black rounded-lg bg-slate-300">
        <div className="w-3/5 h-full p-5 border border-black rounded-sm">
          <div className="h-28">
            <button className="w-auto p-2 rounded-lg bg-lightpurple hover:bg-darkpurple" onClick={enqueue}>Add random task</button>
          </div>
          <div>
            <h1 className="font-bold">Task Queue</h1>
          </div>
          <div className="flex flex-row flex-wrap">
            {queue.map((square, index) => (
              <div key={index}>
                {square}
              </div>
            ))}
          </div>
          <div className="my-10">
            <button className="w-auto p-2 rounded-lg bg-lightpurple hover:bg-darkpurple" onClick={dequeue}>Admit task</button>
          </div>
        </div>

        <div className="flex flex-col w-2/5 h-full">
          <div className="flex flex-col justify-between w-full p-2 border border-black rounded-md h-1/4">
            <h1 className="text-2xl font-bold">High Priority Queue</h1>
            <div className="flex flex-row flex-wrap">
              {prioQueue.map((square, index) => (
                <div key={index}>
                  {square}
                </div>
              ))}
            </div>
            <Bar total={totalPrio} />
          </div>

          <div className="flex flex-col justify-between w-full p-2 border border-black rounded-md h-1/4">
            <h1 className="text-2xl font-bold">Regular Queue 1</h1>
            <div className="flex flex-row flex-wrap">
              {regQueue1.map((square, index) => (
                <div key={index}>
                  {square}
                </div>
              ))}
            </div>
            <Bar total={totalQ1} />
          </div>

          <div className="flex flex-col justify-between w-full p-2 border border-black rounded-md h-1/4">
            <h1 className="text-2xl font-bold">Regular Queue 2</h1>
            <div className="flex flex-row flex-wrap">
              {regQueue2.map((square, index) => (
                <div key={index}>
                  {square}
                </div>
              ))}
            </div>
            <Bar total={totalQ2} />
          </div>

          <div className="flex flex-col justify-between w-full p-2 border border-black rounded-md h-1/4">
            <h1 className="text-2xl font-bold">Regular Queue 3</h1>
            <div className="flex flex-row flex-wrap">
              {regQueue3.map((square, index) => (
                <div key={index}>
                  {square}
                </div>
              ))}
            </div>
            <Bar total={totalQ3} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
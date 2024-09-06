import { useState, useEffect } from 'react'

const Bar = ({ total }) => {
    const [val, setVal] = useState(total) 
    const [currentTotal, setCurrentTotal] = useState(total)

    // Update the bar's value when the total changes
    useEffect(() => {
        setVal(total)
        setCurrentTotal(total)
    }, [total])

    // Decrement the value over time
    useEffect(() => {
        const intervalId = setInterval(decrement, 1)
        return () => clearInterval(intervalId)
    }, [])

    const decrement = () => {
        setVal(prevValue => {
            if (prevValue <= 0) {
                setCurrentTotal(0)
                return 0
            }
            return Math.max(prevValue - 1, 0)
        })
    }

    const prcnt = () => {
        if (currentTotal === 0) {
            return 0
        } else {
            return (val / currentTotal) * 100
        }        
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <progress value={val} max={currentTotal} className="w-5/6"/>
            <h1>{val} / {currentTotal} ({prcnt().toFixed(2)}%)</h1>
        </div>
    )
}

export default Bar
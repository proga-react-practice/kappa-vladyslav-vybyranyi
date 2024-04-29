import { useState } from 'react'

// Hook for version control variable
export default function VCV<T>(value : T){
    const [state, setState] = useState<T>(value)
    const [history, setHistory] = useState<T[]>([value])
    const [index, setIndex] = useState(0)

    function revertTo(index : number){
        if (index < 0 || index >= history.length) return
        setIndex(index)
        setState(history[index])
    }

    function undo(){
        if (index === 0) return
        setIndex(index - 1)
        setState(history[index - 1])
    }

    function redo(){
        if (index === history.length - 1) return
        setIndex(index + 1)
        setState(history[index + 1])
    }

    function setValue(value : T){
        if (index !== history.length - 1){
            setHistory(history.slice(0, index + 1))
        }
        setHistory([...history.slice(0, index + 1), value, ...history.slice(index + 1)])
        setIndex(index + 1)
        setState(value)
    }

    return {state, setValue, undo, redo, revertTo, index, history}
}
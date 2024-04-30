import { useEffect, useState } from 'react'

interface Entry {
    str: string,
    index: number,
}

interface Diff {
    added: Entry[],
    removed: Entry[],
}

function sumEntries(entries: Entry[]): Entry[] {
    const result: Entry[] = []
    entries = entries.sort((a, b) => a.index - b.index)
    let offset = 1
    for (let i = 0; i < entries.length; i++){
        if (result.length === 0){
            result.push(entries[i])
            offset = 1
        } else if (entries[i].index === result[result.length - 1].index + offset){
            result[result.length - 1].str += entries[i].str
            offset++
        } else {
            result.push(entries[i])
            offset = 1
        }
    }
    return result
}

function calculateDiff( a: string, b: string ) : Diff {
    const result : Diff = {added: [], removed: []}
    const dp : number[][] = []
    for (let i = 0; i <= a.length; i++){
        dp.push([])
        for (let j = 0; j <= b.length; j++){
            dp[i].push(0)
        }
    }
    for (let i = 1; i <= a.length; i++){
        for (let j = 1; j <= b.length; j++){
            if (a[i - 1] === b[j - 1]){
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    let i = a.length
    let j = b.length
    while (i > 0 || j > 0){
        if (i === 0){
            result.added.push({str: b[j - 1], index: j - 1})
            j--
        } else if (j === 0){
            result.removed.push({str: a[i - 1], index: i - 1})
            i--
        } else if (a[i - 1] === b[j - 1]){
            i--
            j--
        } else if (dp[i - 1][j] > dp[i][j - 1]){
            result.removed.push({str: a[i - 1], index: i - 1})
            i--
        } else {
            result.added.push({str: b[j - 1], index: j - 1})
            j--
        }
    }
    result.added = sumEntries(result.added)
    result.removed = sumEntries(result.removed)
    return result
}

function applyDiff( str: string, diff: Diff ) : string {
    let result = ''
    let offset = 0
    diff.removed = diff.removed.sort( (a, b) => a.index - b.index)
    diff.added = diff.added.sort( (a, b) => a.index - b.index)
    for (let i = 0; i < diff.removed.length; i++){
        result += str.slice(offset, diff.removed[i].index)
        offset = diff.removed[i].index+diff.removed[i].str.length
    }
    result += str.slice(offset)
    offset = 0
    for (let i = 0; i < diff.added.length; i++){
        result = result.slice(0, diff.added[i].index + offset) + diff.added[i].str + result.slice(diff.added[i].index + offset)
    }
    return result
}


// Hook for version control variable
export default function VCV<T>(value : T){
    const [state, setState] = useState<T>(value)
    const [history, setHistory] = useState<T[]>([value])
    const [diffs, setDiffs] = useState<Diff[]>([])
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

    useEffect(() => {
        history
    }, [history])

    useEffect(() => {
        const temp_history = history.slice(0, index !== 0 ? index : 1)
        const temp_diffs = diffs.slice(index-1)
        temp_diffs.forEach((diff) => {
            temp_history.push(JSON.parse(applyDiff(JSON.stringify(temp_history[temp_history.length - 1]), diff)) as T)
        })

        setHistory(temp_history)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diffs] )

    function setValue(value : T){
        // if (index !== history.length - 1){
        //     setDiffs(diffs.slice(0, index + 1))
        //     setHistory(history.slice(0, index + 1))
        // }
        if (index === 0){
            setDiffs([calculateDiff(JSON.stringify(history[index]), JSON.stringify(value)), ...diffs.slice(index)])
        }else if (index === history.length - 1){
            setDiffs([...diffs, calculateDiff(JSON.stringify(history[index]), JSON.stringify(value))])
        }else{
            setDiffs([...diffs.slice(0, index), calculateDiff(JSON.stringify(history[index]), JSON.stringify(value)), ...diffs.slice(index)])
        }
        
        setIndex(index + 1)
        setState(value)
    }

    return {state, setValue, undo, redo, revertTo, index, history}
}
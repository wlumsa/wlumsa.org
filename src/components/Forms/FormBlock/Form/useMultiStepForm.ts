"use client"
import { ReactElement,useState } from "react"

export function useMutlistepForm(steps:ReactElement[]){
    const [currStepIndex,setCurrStepIndex] = useState(0);

    function next(){
        setCurrStepIndex( i=> {
            //Make sure we don't go over length of Array steps
            if(i>steps.length-1){
                return i
            }
            return i+1
        })
    }

    function back() {
        setCurrStepIndex( i=> {
            //Make sure we dont go below 0 
            if(i<=0){
                return i
            }
            return i-1
        })
    }

    function goTo(index:number){
        setCurrStepIndex(index)
    }

    return {
        currStepIndex,
        step: steps[currStepIndex],
        goTo,
        next,
        back,
    }
}
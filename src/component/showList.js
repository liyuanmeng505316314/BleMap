
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../store";



let A=''
let B='小橙'
let C='小蓝'
let D=''
let E=''
let H='小红'


const Component = observer(() => {
   
    useEffect(() => {
        console.log('进入组件')
        return () => {
            console.log('卸载')
        }
    }, []);

    return (
        <>
        <div>
            <p>该信标A有设备：{A}</p>
            <p>该信标B有设备：{B}</p>
            <p>该信标C有设备：{C}</p>
            <p>该信标D有设备：{D}</p>
            <p>该信标E有设备：{E}</p>
            <p>该信标H有设备：{H}</p>
        </div>
        </>
    );
});

export default Component;
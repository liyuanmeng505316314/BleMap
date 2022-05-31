import React, {useEffect, useRef} from "react";
import styled from "styled-components";
// import { useStore } from "../store";
import $ from 'jquery'
import * as echarts from "echarts";
import List from '../component/showList'
import {Spin } from 'antd';

const Wrapper = styled.div`
  #wrapper {
    height: 80vh;
    display: flex;
    flex-direction: column;
  }


  main {
    flex: 1;
    overflow：hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  #middle {
    height: 100%;;
    flex: 1;
    > .chart {
      height: 100%;
    }
  }

`

// var ROOT_PATH ='https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

let ROOT_PATH = 'http://lc-34eLG26l.cn-n1.lcfile.com'

// 通过判断



let point1=[
    [420, 610],
    [430, 610],
  ]
let point2=[
    [110, 470],
    [120, 470],
  ]
let point3=[
    [200,610],
    [200,600],
  ]

const Location=(x)=>{
    if(x==='A'){
        point1 = [
           [410,610],
           [420,610]
       ]
   }else if(x==='B'){
       point1 = [
           [190,610],
           [180,610]
       ]
   }else if(x==='C'){
       point1 = [
           [90,430],
           [90,440]
       ]
   }else if(x==='D'){
       point1 = [
           [90,30],
           [90,40]
       ]
   }else if(x==='E'){
       point1 = [
           [450,430],
           [450,440]
       ]
   }else if(x==='H'){
       point1 = [
           [280,850],
           [270,850]
       ]
   }
   
}

Location('H')

let people = 'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'



const Main = () => {
    const divRef = useRef(null);
    // const { ImageStore} =useStore()
    useEffect(() => {
        // if(ImageStore.serverFile.attributes.url.attributes.url){
        //  console.log(ImageStore.serverFile.attributes.url.attributes.url)
        // }
        let myChart = echarts.init(divRef.current);
        let option;
        $.get(
            ROOT_PATH + '/um3mMhjgykwKHLg7AseMUG3wGcVNL9Tv/%E9%AB%98%E6%B8%85%E5%AF%BC%E8%88%AA%E5%9B%BE%E7%89%87.svg',
            // ROOT_PATH + '/data/asset/geo/MacOdrum-LV5-floorplan-web.svg',
            (svg)=> {
                echarts.registerMap('MyMap', {svg: svg});
                option = {
                    title: {
                        left: 'center',
                        bottom: 10
                    },
                    tooltip: {},
                    geo: {
                        map: 'MyMap',
                        roam: false,
                        aspectScale: 1,
                        emphasis: {
                            itemStyle: {
                                color: undefined
                            },
                            label: {
                                show: false
                            }
                        }
                    },
                    series: [
                        {
                            name: 'Route',
                            type: 'lines',
                            coordinateSystem: 'geo',
                            geoIndex: 0,
                            emphasis: {
                                label: {
                                    show: false
                                }
                            },
                            polyline: true,
                            lineStyle: {
                                color: '#c46e54',
                                width: 5,
                                opacity: 1,
                                type: 'dotted'
                            },
                            // 实现实时定位，小人儿速度为0.1，且只显示一个点
                            effect: {
                                show: true,
                                period: 10,
                                color: '#a10000',
                                constantSpeed: 0.1, 
                                trailLength: 0,
                                symbolSize: [20, 12],
                                symbol: people,
                            },
                            z: 100,
                            data: [
                              {
                                effect: {
                                  color: '#FF0000',
                                  constantSpeed: 0.01,
                                  delay: 0
                                },
                                coords: point1
                              },
                              {
                                effect: {
                                  color: '#0000FF',
                                  constantSpeed: 0.01,
                                  delay: 0
                                },
                                coords: point2
                              },
                              {
                                effect: {
                                  color: '#FFA500',
                                  constantSpeed: 0.01,
                                  delay: 0
                                },
                                coords: point3
                              }
                            ]

                            // 这里的data可以支持多个点，具体看
                            // data: [{coords: point}]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        );
        option && myChart.setOption(option);
    }, []);
    return (
        <>
        <span >
          设备扫描中：
          <Spin size="large" />
        </span>
          <Wrapper>
                <div id="wrapper">
                    <main>
                        <div id="left">
                            <div ></div>
                        </div>
                        <div id="middle">
                            <div ref={divRef} className="chart"></div>
                        </div>
                    </main>
                </div>
          </Wrapper>
          <List/>
        </>
    );
};

export default Main;

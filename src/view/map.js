import React, {useEffect, useRef} from "react";
import styled from "styled-components";
// import { useStore } from "../store";
import $ from 'jquery'
import * as echarts from "echarts";
import List from '../component/showList'
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


let point = [
    [110.6189462165178, 456.64349563895087],
    [124.10988522879458, 450.8570048730469],
    [123.9272226116071, 389.9520693708147],
    [61.58708083147317, 386.87942320312504],
    [61.58708083147317, 72.8954315876116],
    [258.29514854771196, 72.8954315876116],
    [260.75457021484374, 336.8559607533482],
    [280.5277985253906, 410.2406672084263],
    [275.948185765904, 528.0254369698661],
    [111.06907909458701, 552.795792593471],
    [118.87138231445309, 701.365737015904],
    [221.36468155133926, 758.7870354617745],
    [307.86195445452006, 742.164737297712],
    [366.8489324762834, 560.9895157073103],
    [492.8750778390066, 560.9895157073103],
    [492.8750778390066, 827.9639780566406],
    [294.9255269587053, 827.9639780566406],
    [282.79803391043527, 868.2476088113839]
]

  
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
                            data:[{coords:point}]
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

import {List, Spin} from "antd";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../store";
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const Component = observer(() => {
    const {HistoryStore} = useStore();
    const loadMore = () => {
        console.log('执行了loadMore，但是不知道会不会执行find');
        HistoryStore.find();
        console.log("HistoryStore.list是,component的list" + HistoryStore.list)
    };
    useEffect(() => {
        console.log('进入组件')
        return () => {
            console.log('卸载')
            HistoryStore.reset();
        }
    }, []);

    return (
        <div>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={true}
            >
                <List 
                    dataSource={HistoryStore.list}
                    renderItem={
                        item => <List.Item key={item.id}>
                            <div>
                                <Img src={item.attributes.url.attributes.url}/>
                            </div>
                            <div>
                                <h5>这里是地图的名称：&nbsp;&nbsp;&nbsp;&nbsp; {item.attributes.title}</h5>
                            </div>
                            <div>
                                <h5>这里该地图的拥有的信标Name：&nbsp;&nbsp;&nbsp;&nbsp; 教四216</h5>
                            </div>

                        </List.Item>
                    }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip="加载中"/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
});

export default Component;
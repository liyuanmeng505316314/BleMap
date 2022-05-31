import {List, Spin,Button} from "antd";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../store";
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';



const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const StyledButton = styled(Button)`
  margin-left: 40px;
`;



const Component = observer(() => {
    const {HistoryStore} = useStore();
    const history = useHistory();
    const loadMore = () => {
        console.log('执行了loadMore，但是不知道会不会执行find');
        HistoryStore.findBeacon();
        console.log("HistoryStore.list是,component的list" + HistoryStore.list)
    };
    const onClick = () => {
        history.push('/map')
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
                                <h5>{item.attributes.title}</h5>
                            </div>
                            <div>
                                <h5>所拥有的信标：&nbsp;&nbsp;{item.attributes.beacon}</h5>
                            </div>
                            <StyledButton type="primary" onClick={onClick}>进入地图</StyledButton>
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
import {List, Spin} from "antd";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../store";
import InfiniteScroll from 'react-infinite-scroller';



const Component = observer(() => {
    const {BeaconStore} = useStore();
    const loadMore = () => {
        console.log('执行了devicelist的loadMore，但是不知道会不会执行find');
        BeaconStore.find();
    };
    useEffect(() => {
        console.log('进入组件')
        return () => {
            console.log('卸载')
            BeaconStore.reset();
        }
    }, []);

    return (
       <>
<div>
    <InfiniteScroll initialLoad={true} pageStart={0} loadMore={loadMore} hasMore={!BeaconStore.isLoading &&BeaconStore.hasMore} useWindow={true}>
        <List dataSource={ BeaconStore.list} renderItem={ item=>
            <List.Item key={item._serverData.deviceID}>
                <div>
                    <span>信标ID为：{item._serverData.beaconID}，</span>
                    <span>信标Name为：{item._serverData.beaconName}</span>
                </div>
            </List.Item>
            }
            >
            {BeaconStore.isLoading &&BeaconStore.hasMore && (
            <div>  <Spin tip="加载中" />  </div>
            )}
        </List>
    </InfiniteScroll>
</div>
       </>
    );
});

export default Component;


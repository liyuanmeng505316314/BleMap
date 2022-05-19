import {List, Spin} from "antd";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../store";
import InfiniteScroll from 'react-infinite-scroller';


const Component = observer(() => {
    const {DeviceStore} = useStore();
    const loadMore = () => {
        console.log('执行了devicelist的loadMore，但是不知道会不会执行find');
        DeviceStore.find();
    };
    useEffect(() => {
        console.log('进入组件')
       
        return () => {
            console.log('卸载')
            DeviceStore.reset();
        }
    }, []);

    return (
       <>
       <div> 
<InfiniteScroll
    initialLoad={true}
    pageStart={0}
    loadMore={loadMore}
    hasMore={!DeviceStore.isLoading && DeviceStore.hasMore}
    useWindow={true}
>
    <List
        dataSource={DeviceStore.list}
        renderItem={
            item => <List.Item key={item._serverData.deviceID}>
            
                <div>
                    <span>设备ID为：{item._serverData.deviceID}，</span>
                    <span>设备IMEI为：{item._serverData.deviceIMEI}</span>
                </div>

            </List.Item>
        }
    >
        {  DeviceStore.isLoading &&DeviceStore.hasMore && (<div> <Spin tip="加载中"/> </div>)  }
    </List>
</InfiniteScroll>
</div> 
       </>
    );
});

export default Component;


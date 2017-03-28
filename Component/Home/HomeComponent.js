/** 
 * 主页面view组件
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DrawerLayoutAndroid,
    ListView,
    ScrollView
} from 'react-native';

import SideBar from './SideBar';
import Header from '../Common/Header';
/**
 * 首页轮播图
 */
import HomeSwiper from './HomeSwiper';
import ListViewCell from '../Common/ListViewCell'
import CommonLoading from '../Common/CommonLoading.js'
import config from '../Tool/config'
import req from '../Tool/request'
class HomeComponent extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state={

            listResource:[],
            
           
            ds:ds,
            swiperData: []
        };
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={(drawer) => { this.drawer = drawer; }}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() =>this.renderSideBar()}>

                    <View style={{backgroundColor: '#ddd',flex:1}}>
                        <Header
                            title = '首页'
                            openMenu = {()=>this.open()}
                            leftNum = {0}
                            rightNum = {0}
                            navigator={this.props.navigator}
                        />
                         <ScrollView>
                            {/*轮播图*/}
                            {this.renderHomeSwiper()}
                            {/*轮播图下面列表组件*/}
                            {this.renserNewsList()}
                        </ScrollView>
                    </View>
            </DrawerLayoutAndroid>
        );
    }


    //侧边栏内容
    renderSideBar(){
        return(
          <SideBar
            navigator={this.props.navigator}
            closeDrawer={()=>{
                this.close();
            }}
          />
          
        )
    }

    //打开侧边栏调用事件
    open=()=>{
        this.drawer.openDrawer();
    }
    
    close=()=>{
        this.drawer.closeDrawer();
    }
      componentDidMount(){
        // 请求首页数据
        this.getData()
    }
     getData(){
         req.get(config.api.base+config.api.newslaste)
            .then((responseJson) => {
                this.setState({
                    listResource:responseJson.stories,
                    swiperData:responseJson.top_stories,
                    ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.stories))
                })
               
            })
      
    }
        /**
         * 渲染主页轮播图
         * 
         * @returns 
         * 
         * @memberOf HomeComponent
         */
      renderHomeSwiper(){
        if(this.state.swiperData.length){
            return (
                <HomeSwiper
                    data = {this.state.swiperData}
                    navigator={this.props.navigator}
                />
            )
        }
    }
    /**
     * 
     * 渲染主页下的新闻列表
     * 
     * @memberOf HomeComponent
     */
    renserNewsList(){
        if(this.state.listResource.length){
            return(
               <ListView
                    dataSource={this.state.ds}
                    renderRow={(rowData) =><ListViewCell data={rowData} navigator={this.props.navigator} />}
                />
            )
        }else{
            return(
                <CommonLoading/>
            )
        }
    }
   


  
}

const styles = StyleSheet.create({
   
});

export default HomeComponent;

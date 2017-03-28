
/**
 * 主题日报页面
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DrawerLayoutAndroid,
    TouchableOpacity,
    ScrollView,
    ListView,
    Dimensions
} from 'react-native';

import Header from '../Common/Header';
import CommonLoading from '../Common/CommonLoading';
import ListViewCell from '../Common/ListViewCell';
import SideBar from '../Home/SideBar';
const {width, height} = Dimensions.get('window');
import config from '../Tool/config';
import req from '../Tool/request';
class ThemePage extends Component {
  
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state ={
          ds:ds,
          listResource:[],
          editors:[],
         
        }
    }
    render() {
        return (
          <DrawerLayoutAndroid
            ref={(drawer) => {this.drawer = drawer;}}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={()=>this.renderSideBar()}
          >
          <View style={{backgroundColor:'#ddd',flex:1}}>
              <Header />
              
              <ScrollView>
                  {this.renderView()}
                  {this.rendereditors()}
                  {this.renderNewsList()}
                  
              </ScrollView>

          </View>

          </DrawerLayoutAndroid>
        );
    }
    renderSideBar(){
            return(
                <SideBar 
                 navigator={this.props.navigator}
                closeDrawer = {() => this.close()}
                />
            )
    }

    
    //打开侧边栏调用事件
    open=()=>{
        this.drawer.openDrawer();
    }
    //关闭侧边栏调用事件
    close=()=>{
        this.drawer.closeDrawer();
    }


    renderView(){
         let data = this.props.data;
           console.log(data);
           return(
             <View style={{height:230}}>
                 <Image source={{uri:data.thumbnail}} style={{height:230,width:width}}></Image>
                 <Text style={styles.topTitleStyle}>{data.description}</Text>
             </View>
               
            
           )
    }

    rendereditors(){
        return(
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.editorItems}>
                    <Text>
                        主编
                    </Text>
                    {/*主编头像渲染*/}
                    {this.renderImage()}
                   
                </View>
            </TouchableOpacity>    
        )
    }

    renderImage(){
        let imageArr = [];
        let dataArr = this.state.editors;
        for (let i = 0; i < dataArr.length; i++) {
            let itemData = dataArr[i];
            imageArr.push(
                <Image
                    key={i}
                    source={{uri:itemData.avatar}}
                    style={{width:36,height:36,borderRadius:18,marginLeft:15}}
                 />
            )
        }
        return imageArr;

    }

    renderNewsList(){
        if(this.state.listResource.length){
            return(
                <ListView
                    dataSource={this.state.ds}
                    renderRow={(rowData)=><ListViewCell data={rowData} navigator={this.props.navigator}/>}

                />
            )
        }else{
            <CommonLoading />
        }
    }

    componentDidMount(){
        this.getData();
    }
    getData(){
        req.get(config.api.base+config.api.theme+'/'+this.props.data.id)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    listResource:responseJson.stories,
                    editors:this.state.listResource.concat(responseJson.editors),
                    ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.stories))
                })
            })
    }
    

}

const styles = StyleSheet.create({
  topTitleStyle: {
        position: 'absolute',
        left:20,
        bottom:30,
        fontSize:18,
        color: '#fff',
        width:width*0.9
    },
    editorItems:{
        height:60,
         backgroundColor:'#ddd',
        flexDirection:'row',
         alignItems:'center'
    }
});

export default ThemePage;

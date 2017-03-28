
/**
 * 首页导航
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
//引入字体文件
import Ionicons from 'react-native-vector-icons/Ionicons';
//侧边栏下面的主题列表

//首页
import config from '../Tool/config';
import req from '../Tool/request';
import Home from './HomeComponent';
//侧边栏主题cell
import ThemeListViewCell from './ThemeListViewCell'
import Login from '../Common/Login'
class SideBar extends Component {
  static defaultProps={
      closeDrawer:null
  }
    constructor(props){
        super(props);
        const ds =new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.state ={
            listResource:[],
            ds:ds
        }
    }
    render() {
        return (
            <ScrollView>
            <View style={{flex:1,backgroundColor:'gray'}}>
              <View style={{backgroundColor:'#099fde' }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>this.pushToLogin()} >
                            <View style={styles.headerTopStyle}>
                                <Image source={{uri: 'account_avatar'}} style={styles.TopHeadImage}/>
                                <Text style={{fontSize:16, color: '#fff',marginLeft:10}}>请登录</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headerBottomStyle}>
                            <View style={styles.headerBottomItemStyle}>
                               <Ionicons
                                    name='ios-cloud-download-outline'
                                    size={14}
                                    color='#fff'
                                />
                                <Text style={{fontSize:14,color:'#fff',marginLeft:20}}>我的收藏</Text>
                            </View>
                            <View style={styles.headerBottomItemStyle}>
                                <Ionicons
                                    name='ios-cloud-download-outline'
                                    size={14}
                                    color='#fff'
                                />
                                <Text style={{fontSize:14,color:'#fff',marginLeft:20}}>离线下载</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress = {() =>this.pushToHome()}>
                        <View style={styles.homeStyle}>
                            <Ionicons
                                name='ios-home'
                                size={15}
                                color='#099fde'
                            />
                            <Text style={{fontSize:16, color: '#099fde',marginLeft:20}}>首页</Text>
                        </View>
                    </TouchableOpacity>
                    {/*主题列表*/}
                    {this.renderThemeList()}
            </View>
              </ScrollView>
        );
    }
       renderThemeList(){
        return(
            <ListView
                dataSource={this.state.ds}
                renderRow={
                    (rowData) =><ThemeListViewCell
                        //往下级页面传递数据
                        data={rowData}
                        navigator={this.props.navigator}
                        //往上传递 调用上面的关闭抽屉的函数
                        closeDrawer = {this.props.closeDrawer}
                    />
                }
            />
        )
    }


    componentDidMount(){
        //获取数据
        req.get(config.api.base+config.api.themes)
              .then((responseJson) => {
                this.setState({
                    listResource:responseJson.others,
                    ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.others))
                })
            })
    }


    pushToLogin(){
        // 先关闭侧栏
        // this.props.closeDrawer();
          this.props.navigator.push({
            component: Login,
            title: '登录页'
        })
     
    }
   

    pushToHome(){
      
        this.props.navigator.replace({
            component:Home,
            title:'home'
        })
    }


}

const styles = StyleSheet.create({
     headerTopStyle: {
        height: 60,
        flexDirection : 'row',
        alignItems: 'center'
    },
 TopHeadImage:{
     width:36, 
     height:36,
     borderRadius: 18,
     marginLeft:20
 },
 headerBottomStyle:{
         height: 60,
        flexDirection : 'row',
        alignItems: 'center',
 },
 headerBottomItemStyle:{
       flexDirection : 'row',
        alignItems: 'center',
        marginLeft: 20,
 },
 homeStyle:{
        height: 50,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: '#ddd'
 }

});

export default SideBar;

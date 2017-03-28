
/**
 * 首页导航
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


class Header extends Component {
    static defaultProps ={
         commentNum: '',  //评论数
        praiseNum: '',   //赞数
        openMenu: null,  //菜单回调函数
        //goBack: null,    //返回按钮回调

        leftNum: '',        //设立标记 让左边的图标显示为什么样  0 为菜单图标 加标题 1为返回图标加标题
        rightNum: '',      //设立标记 让右边的图标显示为什么样
                            // 0为 首页的铃铛和三个点 2个图标
                            //1 为内容页面的分享 收藏 评论 赞 这4个图标
                            // 2 为加关注这个图标'+'
    }
    constructor(props){
        super(props);
        this.state ={
            color:'#fff'
        }
    }
    render() {
        return (
            <View style={styles.NavBarStyle}>
                <Text>
                    导航
                </Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({
   NavBarStyle:{
       height:35,
       justifyContent:'center',
       alignItems:'center'

   }
});

export default Header;

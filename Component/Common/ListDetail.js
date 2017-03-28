/*最终的内容页*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Navigator,
    TouchableOpacity,
    WebView,
    View
} from 'react-native';
//引入头部
import Header from '../Common/Header';
// 引入加载动画
import CommonLoading from '../Common/CommonLoading'
import config from '../Tool/config'
import req from '../Tool/request'
class ListDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            detail:null
        
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            //获取详细页数据
            this.getData();
         
        },300)

    }
    getData(){
        req.get(config.api.base+config.api.news+'/'+this.props.id)
            .then((responseJson) => {
                fetch('http://daily.zhihu.com/css/share.css?v=5956a')
                    .then((responseCSS) => {
                        // alert(JSON.stringify(responseCSS._bodyInit))  拼接css
                        if(this.refs.webviewbridge){
                            let cssLink = '<style>'+responseCSS._bodyInit+'</style>',
                                imgLink = '<div class="img-wrap"><h1 class="headline-title">'+responseJson.title+'</h1><span class="img-source"></span><img src="'+responseJson.image+'" alt=""><div class="img-mask"></div></div>';
                            this.setState({
                                detail: cssLink + responseJson.body.replace(/<div class=\"img-place-holder\"><\/div>/,imgLink),
                                css:responseJson.css[0]
                            })
                        }
                    })
            })
    }



    render() {
        return (
            <View ref = "webviewbridge" style={{flexDirection:'column',flex:1,backgroundColor:'#ddd'}}>
                    <Header
                    />
                {/*渲染WebView*/}
                {this.renderHtml()}
            </View>
        );
    }

    renderHtml(){
        if(this.state.detail){
            return(
                <WebView
                    style={{flex:1}}
                    javaScriptEnabled={false}
                    source={{html: this.state.detail}}
                />
            )
        }else{
            return (
                <CommonLoading />
            )
        }
    }
}
const styles  = StyleSheet.create({

})
export default ListDetail;

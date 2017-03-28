
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemePage from '../Theme/ThemePage';

class ThemeListViewCell extends Component {
    static defaultProps = {
        closeDrawer:null
    }
    constructor(props){
        super(props);
        this.state ={
            
        }
    }
    render() {
          let item = this.props.data;
        return (
          <TouchableOpacity activeOpacity={0.5} onPress={(e) => {this.pushToThemePage(item)}}>
                <View style={styles.themeListStyle}>
                    <Text style={{fontSize: 16,color:'#000', marginLeft:15}}>{item.name}</Text>
                    <Ionicons
                        name='ios-cloud-download-outline'
                        size={14}
                        color='#ddd'
                        style={{marginRight: 50}}
                    />
                </View>
            </TouchableOpacity>
        );
    }
    pushToThemePage(item){
    this.props.closeDrawer();
        this.props.navigator.replacePrevious({
            name: 'ThemePage',
            component: ThemePage,
            params:{
                data:item
            }
        })
    }

}

const styles = StyleSheet.create({
 themeListStyle:{
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
 }
});

export default ThemeListViewCell;

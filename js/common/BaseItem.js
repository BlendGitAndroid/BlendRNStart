import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PropTypes } from 'prop-types';

export default class BaseItem extends Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
        }
    }

    /**
     * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
     * componentWillReceiveProps在新版React中不能再用了
     * 
     * getDerivedStateFromProps 会在调用 render 方法之前调用，即在渲染 DOM 元素之前会调用，并且在初始挂载及后续更新时都会被调用。
     * state 的值在任何时候都取决于 props。
     * getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
     * 这样做的目的是为了保持组件的内部状态（`state`）与外部传入的 `props` 值保持同步，确保组件能够正确地响应外部的变化。
    //  * @param nextProps
    //  * @param prevState
    //  * @returns {*}
    //  */
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const isFavorite1 = nextProps.projectModel.isFavorite;
    //     if (prevState.isFavorite !== isFavorite1) {
    //         console.log('getDerivedStateFromProps', "111");
    //         return {    //和setState的效果是一样的
    //             isFavorite: isFavorite1,
    //         };
    //     }
    //     return null;
    // }

    // 详情页的收藏点击，这里onSelect的入参是一个函数
    onItemClick() {
        this.props.onSelect(isFavorite => {
            this.setFavoriteState(isFavorite);
        });
    }
    

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        console.log('this.state.isFavorite', this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }

    setFavoriteState(isFavorite) {
        //下面的这种写法其实是不对的，因为是单向数据流，不能这样改数据
        //这个isFavorite直接这样改了props的值，导致item的isFavorite也被改了,界面刷新
        this.props.projectModel.isFavorite = isFavorite;
        // 修改本组件的值
        this.setState({
            isFavorite: isFavorite,
        })
    }

    // Item的收藏点击
    _favoriteIcon() {
        const { theme } = this.props;
        return <TouchableOpacity
            style={{ padding: 6 }}
            underlayColor='transparent'
            onPress={() => this.onPressFavorite()}>
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                size={26}
                style={{ color: theme.themeColor }}
            />
        </TouchableOpacity>
    }
}

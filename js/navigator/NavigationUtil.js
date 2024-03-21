export default class NavigationUtil {


    /**
     * 跳转到指定的界面
     * @param {要传递的参数} params 
     * @param {要跳转的页面名} page 
     */
    static goPage(params, page) {
        //从HomePage传过来的navigation
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null');
        }
        navigation.navigate(page, { ...params });
    }

    /**
    * 返回上一页
    * @param navigation
    */
    static goBack(navigation) {
        navigation.goBack();
    }


    /**
     * 
     * 重置到首页 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        //跳转到createSwitchNavigator中定义的Main的路由
        navigation.navigate('Main');
    }

}
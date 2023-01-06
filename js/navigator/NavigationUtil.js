export default class NavigationUtil {


    /**
     * 跳转到指定的界面
     * @param {要传递的参数} params 
     * @param {要跳转的页面名} page 
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null');
        }
        navigation.navigate(page, { ...params });
    }


    /**
     * 
     * 重置到首页 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate('Main');
    }

}
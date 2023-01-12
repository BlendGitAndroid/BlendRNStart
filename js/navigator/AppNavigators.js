import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AsyncStorageDemoPage from "../../demo/AsyncStorageDemoPage";
import FetchDemoPage from "../../demo/FetchDemoPage";
import DetailPage from "../page/DetailPage";
import HomePage from "../page/HomePage";
import WelcomePage from "../page/WelcomePage";

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null,   //隐藏头部
            }
        }
    }
);

const MainNavigator = createStackNavigator({
    //主页
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,//隐藏头部
        },
    },
    //详情页
    DetailPage: DetailPage,
    FetchDemoPage: FetchDemoPage,
    AsyncStorageDemoPage: AsyncStorageDemoPage,
});


export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    },
    {
        navigationOptions: {
            header: null,
        }
    }
))
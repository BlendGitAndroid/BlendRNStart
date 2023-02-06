import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AsyncStorageDemoPage from "../../demo/AsyncStorageDemoPage";
import FetchDemoPage from "../../demo/FetchDemoPage";
import AboutMePage from "../page/about/AboutMePage";
import AboutPage from "../page/about/AboutPage";
import DetailPage from "../page/DetailPage";
import HomePage from "../page/HomePage";
import WebViewPage from "../page/WebViewPage";
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
            headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        },
    },
    //详情页
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        },
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        },
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        },
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        },
    },
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
            headerShown: false,
        },
    }
))
package com.blend.hybridandroid;

import android.os.Bundle;
import android.view.KeyEvent;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.devsupport.DoubleTapReloadRecognizer;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;


/**
 * 创建一个Activity来作为React Native的容器
 * 通过ReactInstanceManager来创建和加载JS的，然后重写了Activity的生命周期来对ReactInstanceManager进行回调,
 * 另外，重写了onKeyUp来启用开发者菜单等功能。
 */
public class RNPageActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    //是否支持开发者模式
    private boolean mDeveloperSupport = true;
    //是否支持双击
    private DoubleTapReloadRecognizer mDoubleTapReloadRecognizer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                //打包时放在assets目录下的JS bundle包的名字，App release之后会从该目录下加载JS bundle
                .setBundleAssetName("index.android.bundle")
                //  JS bundle中主入口的文件名
                .setJSMainModulePath("index")
                //向RN添加Native Module，这里添加了new MainReactPackage()这个是必须的，另外，
                //如果我们创建一些其他的Native Module也需要通过addPackage的方式将其注册到RN中。需要指出的是
                //RN除了这个方法外，也提供了一个addPackages方法用于批量向RN添加Native Module
                .addPackage(new MainReactPackage())
                //设置RN是否开启开发者模式(debugging，reload，dev menu)，比如我们常用开发者弹框；
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                //通过这个方法来设置RN初始化时所处的生命周期状态，一般设置成LifecycleState.RESUMED就行，
                //和下文讲的Activity容器的生命周期状态关联
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        // 这个"App1"名字一定要和我们在index.js中注册的名字保持一致AppRegistry.registerComponent()
        // 第一个参数是mReactInstanceManager，
        // 第二个参数是我们在index.js中注册的组件的名字，
        // 第三个参数接受一个Bundle来作为RN初始化时传递给JS的初始化数据
        mReactRootView.startReactApplication(mReactInstanceManager, "App1", null);

        setContentView(mReactRootView);

        mDoubleTapReloadRecognizer = new DoubleTapReloadRecognizer();
    }


    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }

    /**
     * 一个 ReactInstanceManager可以被多个activities或fragments共享，所以我们需要在Activity的生命周期中
     * 回调ReactInstanceManager的对应方法。
     */
    @Override
    protected void onPause() {
        super.onPause();
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    //这个不属于Activity生命周期中的方法onBackPressed，添加它的目的主要是为了当用户单击手机的返回键之后将
    // 事件传递给JS，如果JS消费了这个事件，Native就不再消费了，如果JS没有消费这个事件那么RN会回调
    // invokeDefaultOnBackPressed代码。
    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
        }
    }


    /**
     * 添加开发者菜单
     */
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (getUseDeveloperSupport()) {
            if (keyCode == KeyEvent.KEYCODE_MENU) {//Ctrl + M 打开RN开发者菜单
                mReactInstanceManager.showDevOptionsDialog();
                return true;
            }
            boolean didDoubleTapR = Assertions.assertNotNull(mDoubleTapReloadRecognizer).didDoubleTapR(keyCode, getCurrentFocus());
            if (didDoubleTapR) {//双击R 重新加载JS
                mReactInstanceManager.getDevSupportManager().handleReloadJS();
                return true;
            }
        }
        return super.onKeyUp(keyCode, event);
    }

    public boolean getUseDeveloperSupport() {
        return mReactInstanceManager != null && mDeveloperSupport;
    }
}

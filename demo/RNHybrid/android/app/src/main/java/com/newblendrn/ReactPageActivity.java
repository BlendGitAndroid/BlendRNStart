package com.newblendrn;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

/**
 * 还有一种方式,就是继承ReactActivity来封装一个RN容器
 * 查看RN的源码你会发现在RN sdk中有个叫ReactActivity的Activity，该Activity是RN官方封装的一个RN容器
 */
public class ReactPageActivity extends ReactActivity implements IJSBridge {


    private static String moduleName;
    private DataToJSPresenter dataToJSPresenter;

    public static void start(Context context, String moduleName, String initParams) {
        ReactPageActivity.moduleName = moduleName;
        Intent intent = new Intent(context, ReactPageActivity.class);
        intent.putExtra("initParams", initParams);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dataToJSPresenter = new DataToJSPresenter(getReactInstanceManager(), this, "by ReactActivity+ReactApplication");
    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        return moduleName;
    }

    @Override
    public void sendMessage(ReadableMap params) {
        Toast.makeText(this, params.toString(), Toast.LENGTH_LONG).show();
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
                // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
                DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        ) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                if (getIntent() != null) {
                    Bundle bundle = new Bundle();//RN初始化时传递给JS的初始化数据
                    bundle.putString("params", getIntent().getStringExtra("initParams"));
                    return bundle;
                }
                return super.getLaunchOptions();
            }
        };
    }

}

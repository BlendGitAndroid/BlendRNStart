package com.blendrnstart;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class JsToAndroidModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    public JsToAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    //这个getName就是要暴露给JS代码的类名
    @NonNull
    @Override
    public String getName() {
        return "AndroidModule";
    }

    //这里要用ReactMethod注解
    @ReactMethod
    public void toToast(String msg, Callback callback) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
        callback.invoke(0, "success");
    }
}

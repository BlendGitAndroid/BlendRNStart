package com.blend.hybridandroid;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

/**
 * 还有一种方式,就是继承ReactActivity来封装一个RN容器
 * 查看RN的源码你会发现在RN sdk中有个叫ReactActivity的Activity，该Activity是RN官方封装的一个RN容器
 */
public class ReactPageActivity extends ReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "App1";
    }
}

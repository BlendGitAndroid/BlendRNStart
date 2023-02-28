package com.blend.hybrid;

import com.facebook.react.bridge.ReadableMap;

public interface IJSBridge {

    void sendMessage(ReadableMap params);

}

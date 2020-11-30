package com.lucidlauncher;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReactContextBaseJavaModule;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AppsListModule extends ReactContextBaseJavaModule {

    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";
    private final ReactApplicationContext reactContext;

    public AppsListModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void loadApps(Promise promise) {
        try {
            PackageManager pm = reactContext.getPackageManager();

            Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
            mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);

            List<ResolveInfo> appList = pm.queryIntentActivities(mainIntent, 0);
            Collections.sort(appList, new ResolveInfo.DisplayNameComparator(pm));

            promise.resolve(appList);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "AppsListModule";
    }
}

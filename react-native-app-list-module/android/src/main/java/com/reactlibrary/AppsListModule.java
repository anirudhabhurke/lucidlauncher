package com.reactlibrary;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.lang.String;

import java.util.Map;
import java.util.HashMap;
import java.io.File;

public class AppsListModule extends ReactContextBaseJavaModule {

    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";
    private final ReactApplicationContext reactContext;

    public AppsListModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppsListModule";
    }

    @ReactMethod
    public void loadApps(Promise promise) {
        try {
                PackageManager packageManager = this.reactContext.getPackageManager();
                WritableArray list = Arguments.createArray();

                Intent i = new Intent(Intent.ACTION_MAIN, null);
                i.addCategory(Intent.CATEGORY_LAUNCHER);

                List<ResolveInfo> availableApps = packageManager.queryIntentActivities(i, 0);
                for (ResolveInfo ri : availableApps) {
                    WritableMap appInfo = Arguments.createMap();
                    appInfo.putString("packageName", ri.activityInfo.packageName);
                    appInfo.putString("appName", ((String) ri.loadLabel(packageManager)).trim());

                    list.pushMap(appInfo);
                }
                promise.resolve(list);
        
        }
        catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

    @ReactMethod
    public void openAppUsingPackageName(String packageName) {
        Intent launchIntent = this.reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
        this.reactContext.startActivity( launchIntent );
    }
}
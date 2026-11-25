package com.supertelemurgia.game;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.DisplayCutout;
import android.view.HapticFeedbackConstants;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedDispatcher;

import androidx.webkit.WebViewAssetLoader;

/**
 * SuperTeleMurgia for Android.
 *
 * The whole game is the same HTML5 canvas page as the PC version, bundled in assets/game/
 * and served from a private https origin so saves (localStorage) work and nothing touches
 * the network. This activity only adds what a phone needs: full screen, landscape,
 * camera-cutout safety, the back button, haptics, pause/resume and keep-screen-on.
 */
public class MainActivity extends Activity {

    private static final String HOST = "appassets.androidplatform.net";
    private static final String START = "https://" + HOST + "/assets/game/index.html";
    private static final int NIGHT = 0xFF120C18;

    private WebView web;
    private FrameLayout root;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        // the hospital ending needs 90 seconds without touching the screen
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        root = new FrameLayout(this);
        root.setBackgroundColor(NIGHT);
        web = new WebView(this);
        web.setBackgroundColor(NIGHT);
        root.addView(web, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(root);

        // keep the stage clear of punch-hole cameras and notches
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int l = 0, t = 0, r = 0, b = 0;
            if (Build.VERSION.SDK_INT >= 28) {
                DisplayCutout c = insets.getDisplayCutout();
                if (c != null) { l = c.getSafeInsetLeft(); t = c.getSafeInsetTop(); r = c.getSafeInsetRight(); b = c.getSafeInsetBottom(); }
            }
            v.setPadding(l, t, r, b);
            return insets;
        });

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setTextZoom(100);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setVerticalScrollBarEnabled(false);
        web.setHorizontalScrollBarEnabled(false);
        web.setHapticFeedbackEnabled(true);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .setDomain(HOST)
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                // the game never leaves its own page
                return !HOST.equals(request.getUrl().getHost());
            }

            @Override
            public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                // the system killed the renderer (low memory): rebuild instead of crashing; the save survives
                root.removeView(web);
                web.destroy();
                web = null;
                recreate();
                return true;
            }
        });
        web.addJavascriptInterface(new Host(), "AndroidHost");

        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::sendBack);
        }

        web.loadUrl(START);
        hideSystemBars();
    }

    private void sendBack() {
        if (web != null) web.evaluateJavascript("window.__stmBack && window.__stmBack()", null);
    }

    /** Android 12 and older. Newer versions use the OnBackInvokedCallback registered above. */
    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        sendBack();
    }

    @SuppressWarnings("deprecation")
    private void hideSystemBars() {
        Window w = getWindow();
        if (Build.VERSION.SDK_INT >= 30) {
            w.setDecorFitsSystemWindows(false);
            WindowInsetsController c = w.getInsetsController();
            if (c != null) {
                c.hide(WindowInsets.Type.systemBars());
                c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemBars();
    }

    @Override
    protected void onPause() {
        if (web != null) {
            web.evaluateJavascript("window.__stmPause && window.__stmPause()", null);
            web.onPause();
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) {
            web.onResume();
            web.evaluateJavascript("window.__stmResume && window.__stmResume()", null);
        }
        hideSystemBars();
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            root.removeView(web);
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    /** Exposed to the game page as window.AndroidHost. */
    private class Host {
        @JavascriptInterface
        public void haptic(int strong) {
            runOnUiThread(() -> {
                if (web != null) web.performHapticFeedback(strong == 1
                        ? HapticFeedbackConstants.LONG_PRESS : HapticFeedbackConstants.KEYBOARD_TAP);
            });
        }

        @JavascriptInterface
        public void quit() {
            runOnUiThread(MainActivity.this::finishAndRemoveTask);
        }

        @JavascriptInterface
        public String platform() {
            return "android";
        }
    }
}

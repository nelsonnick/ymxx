package com.wts.common;

/**
 * Created by 王天硕 on 2016/7/12.
 */
public enum Whether {
    YES(), NO();

    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

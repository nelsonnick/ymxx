package com.wts.common;

import java.io.Serializable;

/**
 * Created by 王天硕 on 2016/7/12.
 */
public class AjaxResult implements Serializable {
    public static final Integer AJAX_STATUS_CODE_SUCCESS = 0;
    public static final Integer AJAX_STATUS_CODE_WARN = 1;
    public static final Integer AJAX_STATUS_CODE_ERROR = 2;
    private static final long serialVersionUID = -125356135878750343L;
    private Integer statusCode;
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public AjaxResult() {
        super();
    }

    public AjaxResult(Integer statusCode, String message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    public static AjaxResult success() {
        AjaxResult ajaxResult = new AjaxResult();
        ajaxResult.setStatusCode(AJAX_STATUS_CODE_SUCCESS);
        ajaxResult.setMessage("操作成功");
        return ajaxResult;
    }

    public static AjaxResult error() {
        AjaxResult ajaxResult = new AjaxResult();
        ajaxResult.setStatusCode(AJAX_STATUS_CODE_ERROR);
        return ajaxResult;
    }

    public static AjaxResult warn() {
        AjaxResult ajaxResult = new AjaxResult();
        ajaxResult.setStatusCode(AJAX_STATUS_CODE_WARN);
        return ajaxResult;
    }
}

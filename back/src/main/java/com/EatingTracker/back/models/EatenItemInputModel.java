package com.EatingTracker.back.models;

import com.EatingTracker.back.entities.EatenItemType;

public class EatenItemInputModel {
    private String day;
    private String id;
    private float amm;
    private int type;

    EatenItemInputModel(){

    }

    public EatenItemInputModel(String id, float amm, int type, String day) {
        this.id = id;
        this.amm = amm;
        this.type = type;
        this.day = day;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getAmm() {
        return amm;
    }

    public void setAmm(float amm) {
        this.amm = amm;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}

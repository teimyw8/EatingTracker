package com.EatingTracker.back.models;

public class EatenItemModel {
    private DisplayListItemModel item;

    private int amm;

    public EatenItemModel(){}
    public EatenItemModel(DisplayListItemModel item, int amm) {
        this.item = item;
        this.amm = amm;
    }

    public DisplayListItemModel getItem() {
        return item;
    }

    public void setItem(DisplayListItemModel item) {
        this.item = item;
    }

    public int getAmm() {
        return amm;
    }

    public void setAmm(int amm) {
        this.amm = amm;
    }
}


package com.EatingTracker.back.models;

import com.EatingTracker.back.entities.EatenItemType;
import com.EatingTracker.back.entities.EatenListItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;

import java.util.ArrayList;
import java.util.List;

public class EatenItemModel {
    private DisplayListItemModel item;

    private float amm;

    public EatenItemModel(){}
    public EatenItemModel(DisplayListItemModel item, float amm) {
        this.item = item;
        this.amm = amm;
    }

    public DisplayListItemModel getItem() {
        return item;
    }

    public void setItem(DisplayListItemModel item) {
        this.item = item;
    }

    public float getAmm() {
        return amm;
    }

    public void setAmm(float amm) {
        this.amm = amm;
    }

}


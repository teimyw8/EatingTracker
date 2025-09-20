package com.EatingTracker.back.models;

import java.sql.Date;
import java.util.List;

public class CurrentDayModel {

    private Date today;

    private List<EatenItemModel> eatenList;


    public CurrentDayModel(Date today, List<EatenItemModel> eatenList) {
        this.today = today;
        this.eatenList = eatenList;
    }
    public CurrentDayModel(){}

    public Date getToday() {
        return today;
    }

    public void setToday(Date today) {
        this.today = today;
    }

    public List<EatenItemModel> getEatenList() {
        return eatenList;
    }

    public void setEatenList(List<EatenItemModel> eatenList) {
        this.eatenList = eatenList;
    }
}

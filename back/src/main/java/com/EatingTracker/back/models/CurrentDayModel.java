package com.EatingTracker.back.models;

import java.time.LocalDate;
import java.util.List;

public class CurrentDayModel {

    private LocalDate today;

    private List<EatenItemModel> eatenList;


    public CurrentDayModel(LocalDate today, List<EatenItemModel> eatenList) {
        this.today = today;
        this.eatenList = eatenList;
    }
    public CurrentDayModel(){}

    public LocalDate getToday() {
        return today;
    }

    public void setToday(LocalDate today) {
        this.today = today;
    }

    public List<EatenItemModel> getEatenList() {
        return eatenList;
    }

    public void setEatenList(List<EatenItemModel> eatenList) {
        this.eatenList = eatenList;
    }
}

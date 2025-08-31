package com.EatingTracker.back.entities;

import java.sql.Date;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.EatingTracker.back.models.IngrModel;

import jakarta.persistence.*;


@Entity
@Table(name="CURRENTDAY")
public class CurrentDay {
    @Column
    @Id
    private Date today;

    public CurrentDay(){}
    public CurrentDay(Date today) {
        this.today = today;
    }

    public Date getToday() {
        return today;
    }

    public void setToday(Date today) {
        this.today = today;
    }
}

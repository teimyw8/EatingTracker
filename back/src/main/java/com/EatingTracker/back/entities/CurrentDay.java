package com.EatingTracker.back.entities;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.EatingTracker.back.models.IngrModel;

import jakarta.persistence.*;


@Entity
@Table(name="CURRENTDAY")
public class CurrentDay {
    @Column
    @Id
    private LocalDate today;

    public CurrentDay(){}
    public CurrentDay(LocalDate today) {
        this.today = today;
    }

    public LocalDate getToday() {
        return today;
    }

    public void setToday(LocalDate today) {
        this.today = today;
    }
}

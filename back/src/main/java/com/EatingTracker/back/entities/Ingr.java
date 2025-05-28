package com.EatingTracker.back.entities;


import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.EatingTracker.back.models.IngrModel;

import jakarta.persistence.*;


@Entity
@Table(name="ingr")
public class Ingr {
    @Id
    @Column(name="ID")
    @UuidGenerator
    private UUID id;

    @Column
    private String name;

    @Column
    private double cals;

    @Column(name="PROTEIN")
    private double prot;

    @Column
    private double servG;

//Constructors

    public Ingr( String name, double cals, double servG, double prot) {
        this.name = name;
        this.cals = cals;
        this.servG = servG;
        this.prot = prot;
    }

    public Ingr(IngrModel model){
        this.name = model.getName();
        this.cals = model.getCals();
        this.servG = model.getServG();
        this.prot = model.getProt();
    }

    public Ingr(IngrModel model, UUID id ){
        this.name = model.getName();
        this.cals = model.getCals();
        this.servG = model.getServG();
        this.prot = model.getProt();
        this.id = id;
    }

    public Ingr(){ }

// custom methods
    public void update(Ingr model){
        this.name = model.getName();
        this.cals = model.getCals();
        this.servG = model.getServG();
        this.prot = model.getProt();
    }

// Getters Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCals() {
        return cals;
    }

    public void setCals(double cals) {
        this.cals = cals;
    }

    public double getProt() {
        return prot;
    }

    public void setProt(double prot) {
        this.prot = prot;
    }

    public double getServG() {
        return servG;
    }

    public void setServG(double servG) {
        this.servG = servG;
    }
}

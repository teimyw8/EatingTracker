package com.EatingTracker.back.entities;

import jakarta.persistence.*;


@Entity
@Table(name="ingr")
public class IngrEnt {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private double cals;

    @Column(name="PROTEIN")
    private double prot;

    @Column
    private double servG;

    public IngrEnt( String name, double cals, double servG, double prot) {
        this.name = name;
        this.cals = cals;
        this.servG = servG;
        this.prot = prot;
    }

    public IngrEnt(){ }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

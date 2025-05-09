package com.EatingTracker.back.models;

public class IngrModel {
    private String name;
    private double cals;
    private double prot;
    private double servG;


    public IngrModel (){}

    public IngrModel(double cals, double prot, String name, double servG) {
        this.cals = cals;
        this.prot = prot;
        this.name = name;
        this.servG = servG;
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

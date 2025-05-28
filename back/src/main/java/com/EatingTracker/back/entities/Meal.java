package com.EatingTracker.back.entities;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="meal")
public class Meal {

    @Id
    @Column(name="ID")  
    @UuidGenerator
    private UUID id;

    @Column
    private String name;

    public Meal () {      
    }
    
    public Meal(String name){
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    
}
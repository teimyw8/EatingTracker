package com.EatingTracker.back.entities;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.UUID;

@Entity
@IdClass(EatenListId.class)
@Table(name="EATENLIST")
public class EatenList {
    @Id
    @Column
    private EatenItemType type;

    @Id
    @Column
    private Date dayId;

    @Id
    @Column
    private UUID itemId;

    public EatenList(EatenItemType type, Date dayId, UUID itemId) {
        this.type = type;
        this.dayId = dayId;
        this.itemId = itemId;
    }

    public EatenList(){}

    public EatenItemType getType() {
        return type;
    }

    public void setType(EatenItemType type) {
        this.type = type;
    }

    public Date getDayId() {
        return dayId;
    }

    public void setDayId(Date dayId) {
        this.dayId = dayId;
    }

    public UUID getItemId() {
        return itemId;
    }

    public void setItemId(UUID itemId) {
        this.itemId = itemId;
    }
}

package com.EatingTracker.back.entities;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.UUID;

@Entity
@IdClass(EatenListId.class)
@Table(name="EATENLIST")

// In the scenario where the same item is eaten multiple times in one day, combine the amounts rather than adding another entry
// This is an ID limitation
public class EatenListItem {

    @Column
    private EatenItemType type;

    @Id
    @Column
    private Date dayId;

    @Id
    @Column
    private UUID itemId;

    @Column
    private float amm;

    public EatenListItem(EatenItemType type, Date dayId, UUID itemId, float amm) {
        this.type = type;
        this.dayId = dayId;
        this.itemId = itemId;
        this.amm = amm;
    }

    public EatenListItem(){}

    public EatenItemType getType() {
        return type;
    }

    public void setType(EatenItemType type) {
        this.type = type;
    }

    public Date getDayId() {
        return dayId;
    }

    public float getAmm() {
        return amm;
    }

    public void setAmm(float amm) {
        this.amm = amm;
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

package com.EatingTracker.back.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
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
    private LocalDate dayid;

    @Id
    @Column
    private UUID itemid;

    @Column
    private float amm;

    public EatenListItem(EatenItemType type, LocalDate dayId, UUID itemId, float amm) {
        this.type = type;
        this.dayid = dayId;
        this.itemid = itemId;
        this.amm = amm;
    }

    public EatenListItem(){}

    public EatenItemType getType() {
        return type;
    }

    public void setType(EatenItemType type) {
        this.type = type;
    }

    public LocalDate getDayId() {
        return dayid;
    }

    public float getAmm() {
        return amm;
    }

    public void setAmm(float amm) {
        this.amm = amm;
    }

    public void setDayId(LocalDate dayId) {
        this.dayid = dayId;
    }

    public UUID getItemId() {
        return itemid;
    }

    public void setItemId(UUID itemId) {
        this.itemid = itemId;
    }
}

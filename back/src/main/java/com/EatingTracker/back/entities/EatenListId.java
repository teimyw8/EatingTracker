package com.EatingTracker.back.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

public class EatenListId implements Serializable {

    private EatenItemType type;
    private LocalDate dayid;

    private UUID itemid;

    public EatenListId(){

    }

    public EatenListId( LocalDate dayID, UUID itemID) {

        this.itemid = itemID;
        this.dayid = dayID;
    }
}

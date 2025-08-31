package com.EatingTracker.back.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.UUID;

public class EatenListId implements Serializable {

    private EatenItemType type;
    private Date dayId;

    private UUID itemId;

    public EatenListId(){

    }

    public EatenListId(EatenItemType type, Date dayID, UUID itemID) {
        this.type = type;
        this.itemId = itemID;
        this.dayId = dayID;
    }
}

package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.EatenListItem;
import com.EatingTracker.back.entities.EatenListId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EatenListRepository extends JpaRepository<EatenListItem, EatenListId> {
    List<EatenListItem> findByDayid(LocalDate day);
}

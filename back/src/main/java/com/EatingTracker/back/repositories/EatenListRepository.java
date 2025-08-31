package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.EatenList;
import com.EatingTracker.back.entities.EatenListId;
import com.EatingTracker.back.entities.Ingr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EatenListRepository extends JpaRepository<EatenList, EatenListId> {
}

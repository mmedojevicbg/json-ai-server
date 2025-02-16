package com.mmedojevic.json_ai_server.repository

import com.mmedojevic.json_ai_server.model.entity.Dataset
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DatasetRepository: JpaRepository<Dataset, Int>  {
    fun findAllByOrderByIdDesc() : List<Dataset>
}
package com.mmedojevic.json_ai_server.controller

import com.mmedojevic.json_ai_server.model.AddDataset
import com.mmedojevic.json_ai_server.model.entity.Dataset
import com.mmedojevic.json_ai_server.service.DatasetService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/dataset")
@CrossOrigin("*")
class DatasetController(val datasetService: DatasetService) {
    @PostMapping
    fun addDatasetDefinition(@RequestBody addDataset: AddDataset): Int {
        val dataset = datasetService.addData(
            addDataset.title!!,
            addDataset.description!!,
            addDataset.jsonSample!!)
        return dataset.id!!
    }

    @GetMapping
    fun getDatasetDefinitions(): List<Dataset> {
        return datasetService.getDatasetDefinitions()
    }

    @GetMapping("/json/{id}")
    fun getDatasetJson(@PathVariable id: Int): String {
        return datasetService.getDatasetGeneratedJson(id)
    }
}
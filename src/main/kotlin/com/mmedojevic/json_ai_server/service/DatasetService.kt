package com.mmedojevic.json_ai_server.service

import com.mmedojevic.json_ai_server.model.entity.Dataset
import com.mmedojevic.json_ai_server.repository.DatasetRepository
import jakarta.persistence.EntityNotFoundException
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import java.util.Date

@Service
class DatasetService(val datasetRepository: DatasetRepository, val aiService: AiService) {

    fun addData(title: String, description: String, jsonSample: String): Dataset {
        val dataset = Dataset()
        dataset.title = title
        dataset.description = description
        dataset.jsonSample = jsonSample
        dataset.submissionDate = Date()
        var jsonResponse = generateJsonResponse(dataset)
        jsonResponse = jsonResponse.replace("```json", "")
        jsonResponse = jsonResponse.replace("```", "")
        dataset.jsonResult = jsonResponse
        return datasetRepository.save(dataset)
    }

    private fun generateJsonResponse(dataset: Dataset): String {
        var prompt = ""
        prompt += dataset.description
        prompt += "Result should contain array of JSON nodes. Starts with [ and ends with ]. \n"
        prompt += "Single JSON node is in following format: \n"
        prompt += dataset.jsonSample + "\n\n"
        prompt += "Return only JSON without any additional text"
        return aiService.executePrompt(prompt)
    }

    fun getDatasetDefinitions() : List<Dataset> {
        return datasetRepository.findAllByOrderByIdDesc()
    }

    fun getDatasetGeneratedJson(id: Int): String {
        return getDataset(id).jsonResult ?: ""
    }

    fun getDataset(id: Int): Dataset {
        return datasetRepository.findById(id).orElseThrow { EntityNotFoundException("Entity not found with id: $id") }
    }
}
package com.mmedojevic.json_ai_server.controller

import com.mmedojevic.json_ai_server.service.ImageService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/image")
@CrossOrigin("*")
class ImageController(val imageService: ImageService) {
    @PostMapping
    fun addDatasetDefinition(@RequestBody prompt: String): String {
        return imageService.generateImage(prompt)
    }
}
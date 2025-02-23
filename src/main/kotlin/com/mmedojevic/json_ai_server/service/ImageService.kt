package com.mmedojevic.json_ai_server.service

import org.springframework.stereotype.Service

@Service
class ImageService(val aiService: AiService) {

    fun generateImage(prompt: String): String {
        return aiService.generateImage(prompt);
    }
}
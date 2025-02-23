package com.mmedojevic.json_ai_server.service

import com.mmedojevic.json_ai_server.exception.UnknownAIModelException
import org.springframework.ai.image.ImageModel
import org.springframework.ai.openai.OpenAiImageModel
import org.springframework.stereotype.Component

@Component
class AiImageModelFactory(val openAiImageModel: OpenAiImageModel) {
    fun create(type: String): ImageModel {
        return when (type) {
            "openai" -> openAiImageModel
            "claude" -> throw UnknownAIModelException("$type model doesn't support image generation")
            else -> throw UnknownAIModelException("$type model is unknown")
        }
    }
}
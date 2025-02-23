package com.mmedojevic.json_ai_server.service

import org.springframework.ai.chat.prompt.Prompt
import org.springframework.ai.image.ImageOptionsBuilder
import org.springframework.ai.image.ImagePrompt
import org.springframework.ai.openai.OpenAiImageModel
import org.springframework.ai.openai.OpenAiImageOptions
import org.springframework.ai.openai.api.OpenAiImageApi
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class AiService(val aiChatModelFactory: AiChatModelFactory,
                val aiImageModelFactory: AiImageModelFactory) {
    @Value("\${jsonaiserver.model}")
    private lateinit var aiModel: String

    fun executePrompt(promptText: String): String {
        val chatModel = aiChatModelFactory.create(aiModel)
        val prompt = Prompt(promptText)
        val chatResponse = chatModel.call(prompt)
        return chatResponse.result.output.content
    }

    fun generateImage(promptText: String): String {
        val imageModels = HashMap<String, String>().apply {
            put("openai", "dall-e-2")
        }
        val imageModel = aiImageModelFactory.create(aiModel)
        val prompt = ImagePrompt(promptText, ImageOptionsBuilder.builder()
            .withN(1)
            .withModel(imageModels[aiModel])
            .withHeight(256)
            .withWidth(256).build())
        val chatResponse = imageModel.call(prompt)
        return chatResponse.result.output.url
    }
}
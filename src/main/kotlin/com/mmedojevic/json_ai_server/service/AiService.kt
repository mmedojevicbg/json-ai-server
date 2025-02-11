package com.mmedojevic.json_ai_server.service

import org.springframework.ai.chat.prompt.Prompt
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class AiService(val aiChatModelFactory: AiChatModelFactory) {
    @Value("\${jsonaiserver.model}")
    private lateinit var aiModel: String

    fun executePrompt(promptText: String): String {
        val chatModel = aiChatModelFactory.create(aiModel)
        val prompt = Prompt(promptText)
        val chatResponse = chatModel.call(prompt)
        return chatResponse.result.output.content
    }
}
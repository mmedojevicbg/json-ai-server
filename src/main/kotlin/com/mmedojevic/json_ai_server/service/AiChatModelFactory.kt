package com.mmedojevic.json_ai_server.service

import com.mmedojevic.json_ai_server.exception.UnknownAIModelException
import org.springframework.ai.anthropic.AnthropicChatModel
import org.springframework.ai.chat.model.ChatModel
import org.springframework.ai.openai.OpenAiChatModel
import org.springframework.stereotype.Component

@Component
class AiChatModelFactory(val openAiChatModel: OpenAiChatModel,
                         val anthropicChatModel: AnthropicChatModel) {
    fun create(type: String): ChatModel {
        return when (type) {
            "openai" -> openAiChatModel
            "claude" -> anthropicChatModel
            else -> throw UnknownAIModelException("$type model is unknown")
        }
    }
}
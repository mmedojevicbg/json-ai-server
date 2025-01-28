package com.mmedojevic.json_ai_server.service

import org.springframework.ai.chat.prompt.Prompt
import org.springframework.ai.openai.OpenAiChatModel
import org.springframework.stereotype.Service

@Service
class AiService(val chatModel: OpenAiChatModel) {
    fun executePrompt(promptText: String): String {
        val prompt = Prompt(promptText)
        val chatResponse = chatModel.call(prompt)
        return chatResponse.result.output.content
    }
}
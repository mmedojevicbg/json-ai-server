package com.mmedojevic.json_ai_server.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping



@Controller
class FrontendController {
    @GetMapping(value = ["/front/{path:[^\\.]*}"])
    fun forward(): String {
        return "forward:/index.html"
    }
}
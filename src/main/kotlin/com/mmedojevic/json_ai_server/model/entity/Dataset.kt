package com.mmedojevic.json_ai_server.model.entity

import jakarta.persistence.*
import java.util.*

@Entity
class Dataset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null
    var title: String? = null
    @Column(length = 2000)
    var description: String? = null
    @Column(length = 10000)
    var jsonSample: String? = null
    @Column(length = 1000000)
    var jsonResult: String? = null
    var submissionDate: Date? = null
}
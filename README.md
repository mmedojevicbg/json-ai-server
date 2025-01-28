# JSON AI Server

A Spring Boot application built with Kotlin that serves AI-generated JSON data, perfect for testing and development environments. This service provides an easy way to generate and serve realistic dummy data through RESTful endpoints.

## Features

- Built with Spring Boot and Kotlin
- Powered by Spring AI
- Uses H2 embedded database for data persistence
- RESTful API endpoints for data generation and retrieval
- Configurable data generation patterns
- Lightweight and easy to set up
- Suitable for local development and testing environments

## Prerequisites

- JDK 21 or later
- Claude API key


## Configuration

### Environment variables

Define `CLAUDE_API_KEY` environment variable before startging the application.

## API Endpoints

### Generate Data

```
POST /api/dataset
```

Generate new dummy data with specified parameters.

Request body:
```json
{
    "title": "ECommerce - laptop computers",
    "description": "Generate list of laptop computers products. Field image contains any valid image url.",
    "jsonSample": "{\"productName\": \"Coffee Machine\", \"manufacturer\": \"Bosh\", \"price\": 400, \"image\": \"https://assets.epicurious.com/photos/62741684ef40ea9d3866a0be/16:9/w_2560%2Cc_limit/breville-bambino-espresso-maker_HERO_050422_8449_VOG_Badge_final.jpg\"}"
}
```

### Retrieve All Generated Datasets

```
GET /api/dataset
```

### Retrieve Specific Dataset by ID

```
GET /api/dataset/json/{id}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support

For support and questions, please open an issue in the GitHub repository.
FROM openjdk:21-jdk-slim

WORKDIR /opt/app/
ARG JAR_FILE=target/json-ai-server.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "-XX:+UseSerialGC", "application.jar"]
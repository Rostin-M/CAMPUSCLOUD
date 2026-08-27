FROM eclipse-temurin:24-jre
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

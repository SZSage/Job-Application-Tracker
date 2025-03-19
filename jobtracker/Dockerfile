FROM openjdk:21
#WORKDIR /usr/jobtracker
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#COPY target/jobtracker-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 5432

#CMD ["java", "-jar", "/app.jar"]
#FROM openjdk:21
#WORKDIR /usr/jobtracker
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#COPY target/jobtracker-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 5432

FROM openjdk:21
WORKDIR /usr/jobtracker
EXPOSE 8080
#CMD ["java", "-jar", "/app.jar"]
CMD ["./mvnw", "spring-boot:run"]

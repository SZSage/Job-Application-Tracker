FROM openjdk:21
WORKDIR /usr/jobtracker
COPY target/jobtracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5432

CMD ["java", "-jar", "app.jar"]

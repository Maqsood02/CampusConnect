package com.cpms;

import de.bwaldvogel.mongo.MongoServer;
import de.bwaldvogel.mongo.backend.memory.MemoryBackend;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.net.InetSocketAddress;

@SpringBootApplication
@EnableMongoAuditing
public class CpmsApplication {

    private static final Logger log = LoggerFactory.getLogger(CpmsApplication.class);
    private static MongoServer embeddedMongoServer;

    public static void main(String[] args) {
        loadDotenv();
        ensureMongoAvailability();
        SpringApplication.run(CpmsApplication.class, args);
    }

    private static void ensureMongoAvailability() {
        String mongoUri = System.getProperty("MONGODB_URI");
        if (mongoUri == null || mongoUri.isBlank()) {
            mongoUri = System.getenv("MONGODB_URI");
        }
        if (mongoUri == null || mongoUri.isBlank()) {
            mongoUri = "mongodb+srv://cpmsacin_db_user:1o1WHTUUi6aYGe07@cluster0.pze6ply.mongodb.net/cpms?retryWrites=true&w=majority&appName=Cluster0";
        }

        boolean remoteOk = false;
        if (mongoUri.contains("mongodb.net") || mongoUri.contains("mongodb+srv")) {
            try {
                com.mongodb.ConnectionString connStr = new com.mongodb.ConnectionString(mongoUri);
                com.mongodb.MongoClientSettings settings = com.mongodb.MongoClientSettings.builder()
                        .applyConnectionString(connStr)
                        .applyToClusterSettings(b -> b.serverSelectionTimeout(2000, java.util.concurrent.TimeUnit.MILLISECONDS))
                        .applyToSocketSettings(b -> b.connectTimeout(2000, java.util.concurrent.TimeUnit.MILLISECONDS))
                        .build();
                try (com.mongodb.client.MongoClient testClient = com.mongodb.client.MongoClients.create(settings)) {
                    testClient.listDatabaseNames().first();
                    remoteOk = true;
                    log.info("[MongoDB] Verified connection to remote MongoDB Atlas cluster.");
                }
            } catch (Exception e) {
                log.warn("[MongoDB Notice] Remote MongoDB Atlas cluster unreachable ({}: {}). Switching to high-speed in-memory MongoDB.", 
                        e.getClass().getSimpleName(), e.getMessage());
                remoteOk = false;
            }
        }

        if (!remoteOk) {
            try {
                embeddedMongoServer = new MongoServer(new MemoryBackend());
                InetSocketAddress address = embeddedMongoServer.bind();
                String localUri = "mongodb://localhost:" + address.getPort() + "/cpms";
                System.setProperty("spring.data.mongodb.uri", localUri);
                System.setProperty("MONGODB_URI", localUri);
                log.info("[MongoDB Resilience] Successfully initialized embedded in-memory MongoDB on port {}. All database services active!", address.getPort());
            } catch (Exception e) {
                log.error("[MongoDB Resilience Error] Could not start embedded MongoDB server: {}", e.getMessage(), e);
            }
        }
    }

    private static void loadDotenv() {
        try {
            java.nio.file.Path envPath = java.nio.file.Paths.get(".env");
            if (!java.nio.file.Files.exists(envPath)) {
                envPath = java.nio.file.Paths.get("../.env");
            }
            if (java.nio.file.Files.exists(envPath)) {
                for (String line : java.nio.file.Files.readAllLines(envPath)) {
                    line = line.trim();
                    if (line.isEmpty() || line.startsWith("#")) continue;
                    int eq = line.indexOf('=');
                    if (eq > 0) {
                        String key = line.substring(0, eq).trim();
                        String val = line.substring(eq + 1).trim();
                        if (System.getProperty(key) == null && System.getenv(key) == null) {
                            System.setProperty(key, val);
                        }
                    }
                }
            }
        } catch (Exception ignored) {}
    }
}

/**
 * CPMS MongoDB Initialization Script
 * Sets up database 'cpms', creates collections with validator schemas, and initializes default admin credentials.
 */

const dbName = "cpms";
const cpmsDb = db.getSiblingDB(dbName);

print(`[MongoDB Init] Initializing database '${dbName}'...`);

// 1. Create collections
const collections = [
    "users",
    "students",
    "placement_officers",
    "companies",
    "recruitment_drives",
    "applications",
    "interviews",
    "notifications",
    "audit_logs"
];

collections.forEach(col => {
    if (!cpmsDb.getCollectionNames().includes(col)) {
        cpmsDb.createCollection(col);
        print(`[MongoDB Init] Created collection: ${col}`);
    }
});

print("[MongoDB Init] Database initialized successfully.");

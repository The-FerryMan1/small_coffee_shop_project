import { integer, pgEnum, pgTable, timestamp, varchar, text, boolean } from "drizzle-orm/pg-core";


export const userRoles = pgEnum('role', ['customer', 'manager', 'admin'])
export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name",{length: 255}).notNull(),
    lastName: varchar("last_name",{length: 255}).notNull(),
    middleName: varchar("middle_name",{length: 255}).default("N/A"),
    email: varchar("email",{length: 255}).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const CredentialsTable = pgTable('credentials', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userID: integer("user_id").references(()=> usersTable.id, {onDelete: 'cascade'}),
    role: userRoles().default('customer'),
    hashedPassword: text('hashed_password').notNull(),
    emailStatus: boolean("email_status").notNull().default(false),
    emailVerifiedAt: timestamp('email_verified_at'),
    updatedAt: timestamp("updated_at"),
})

export const inventoryTable = pgTable("invetory", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", {length: 255}).notNull(),
    stock: integer("stock").notNull().default(0),
    version: integer("version").notNull().default(1),
    price: integer("price").notNull(),
})

export const orderTable = pgTable("orders", {
     id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
     inventoryID: integer("inventory_id").references(()=>inventoryTable.id),
     quantity: integer("quantity").notNull(),
     totalPrice: integer("total_price").notNull(),
     status: text({enum: ["pending", "completed", "failed"]}).default("pending"),
     createdAt: timestamp("created_at").defaultNow(),
})

export type InventoryItem = typeof inventoryTable.$inferSelect;
export type NewOrder = typeof orderTable.$inferInsert;
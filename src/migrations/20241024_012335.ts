import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
    // Migration code
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
    // Migration code
}

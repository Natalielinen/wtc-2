import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.POSTGRES_URL || "postgresql://neodb-wtc_owner:npg_sOV8CUu5MWfe@ep-noisy-sun-a43l2nq1-pooler.us-east-1.aws.neon.tech/neodb-wtc?sslmode=require");
export const db = drizzle(sql, {schema, logger: true});
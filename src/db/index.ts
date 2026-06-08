import { Pool } from 'pg';
import config from '../config';

export const pool = new Pool({
    connectionString: config.database_url,
});

export const initDB = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL,
                role VARCHAR(100) DEFAULT 'team_member',
                CHECK (role IN ('admin', 'project_manager','team_member')),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                deadline TIMESTAMP,
                status VARCHAR(20) DEFAULT 'active',
                CHECK (status IN ('active', 'completed', 'on_hold')),
                created_by INT REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS project_members (
                id SERIAL PRIMARY KEY,
                project_id INT REFERENCES projects(id) ON DELETE CASCADE,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                joined_at TIMESTAMP DEFAULT NOW(),
                UNIQUE (project_id, user_id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR (200) NOT NULL,
                description TEXT,
                project_id INT REFERENCES projects(id) ON DELETE CASCADE,
                assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
                due_date DATE,
                priority VARCHAR(10) DEFAULT 'medium',
                CHECK (priority IN ('high', 'medium', 'low')),
                status VARCHAR(20) DEFAULT 'pending',
                CHECK (status IN ('pending', 'in_progress', 'completed')),
                created_by INT REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
                CREATE TABLE IF NOT EXISTS activity_logs (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE SET NULL,
                action VARCHAR(100) NOT NULL,
                entity_type VARCHAR(50) NOT NULL,
                entity_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);

        console.log("Database initialized successfully");
    }catch(error){
        console.error("Error initializing database:", error);
    }
}
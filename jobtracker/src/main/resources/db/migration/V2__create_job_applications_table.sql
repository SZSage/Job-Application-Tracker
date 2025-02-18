CREATE TABLE job_applications (
    job_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    salary INTEGER,
    location VARCHAR(255),
    status_id INTEGER,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

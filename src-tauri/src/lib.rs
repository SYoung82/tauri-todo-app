#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod models;
pub mod schema;

use self::models::{NewTask, Task};
use self::schema::tasks::dsl::tasks;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn create_task(conn: &PgConnection, description: &str) -> Task {
    use schema::tasks;

    let new_task = NewTask {
        description,
        complete: false,
    };

    diesel::insert_into(tasks::table)
        .values(&new_task)
        .get_result(conn)
        .expect("Error creating task")
}

pub fn delete_task(conn: &PgConnection, id: i32) {
    diesel::delete(tasks.find(id))
        .execute(conn)
        .expect("Error deleting task");
}

pub fn delete_tasks(conn: &PgConnection) {
    diesel::delete(tasks)
        .execute(conn)
        .expect("Error deleting tasks");
}

pub fn read_tasks(conn: &PgConnection) -> Vec<Task> {
    tasks
        // .filter(complete.eq(true))
        .load::<Task>(conn)
        .expect("Error loading tasks")
}

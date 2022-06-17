use serde::Serialize;

use super::schema::tasks;

#[derive(Queryable, Serialize)]
pub struct Task {
    pub id: i32,
    pub description: String,
    pub complete: bool,
}

#[derive(Insertable)]
#[table_name = "tasks"]
pub struct NewTask<'a> {
    pub description: &'a str,
    pub complete: bool,
}

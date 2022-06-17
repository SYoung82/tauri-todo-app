#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate app;
extern crate diesel;

use self::models::*;
use app::*;

use std::env;
use std::string::String;
use std::vec::Vec;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![
            add_task,
            delete_task_by_id,
            delete_all_tasks,
            get_tasks
        ])
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn add_task(description: String) {
    let connection = establish_connection();
    create_task(&connection, &description);
}

#[tauri::command]
fn delete_task_by_id(id: usize) {
    let connection = establish_connection();

    delete_task(&connection, id.try_into().unwrap());
}

#[tauri::command]
fn delete_all_tasks() {
    let connection = establish_connection();

    delete_tasks(&connection);
}

#[tauri::command]
fn get_tasks() -> Vec<Task> {
    let connection = establish_connection();

    read_tasks(&connection)
}

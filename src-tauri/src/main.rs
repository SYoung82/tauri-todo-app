#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs::OpenOptions;
use std::fs::{copy, remove_file};
use std::io::prelude::*;
use std::io::{BufRead, BufReader};
use std::string::String;
use std::vec::Vec;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![
            add_task,
            delete_task_by_index,
            delete_tasks,
            get_tasks
        ])
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn add_task(content: String) {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("../tasks.txt")
        .expect("Error openening file");

    writeln!(file, "{}", content).expect("Error writing to file");
}

#[tauri::command]
fn delete_task_by_index(index: usize) {
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .open("../tasks.txt")
        .expect("Error openening file");

    let mut temp_file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("../tasks.txt.tmp")
        .expect("Error openening file");

    let reader = BufReader::new(file);
    for (line_index, line) in reader.lines().enumerate() {
        if line_index != index {
            writeln!(temp_file, "{}", line.unwrap()).expect("Error writing to file");
        }
    }

    copy("../tasks.txt.tmp", "../tasks.txt").expect("Error copying file");
    remove_file("../tasks.txt.tmp").expect("Error deleting temporary file");
}

#[tauri::command]
fn delete_tasks() {
    remove_file("../tasks.txt").expect("Error deleting file");
}

#[tauri::command]
fn get_tasks() -> Vec<String> {
    // let file = File::open("../tasks.txt").expect("Error opening file");
    let file = OpenOptions::new()
        .create(true)
        .read(true)
        .write(true)
        .open("../tasks.txt")
        .expect("Error openening file");

    let reader = BufReader::new(file);

    reader.lines().filter_map(std::io::Result::ok).collect()
}

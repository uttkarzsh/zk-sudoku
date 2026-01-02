mod utils;

fn main(given: pub [[u8; 4]; 4], solution: [[u8; 4]; 4]) {
    utils::check_question(given, solution);
    utils::is_valid_solution(solution);
}

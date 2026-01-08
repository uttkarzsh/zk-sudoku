pub fn check_question(given: [[u8; 4]; 4], solution: [[u8; 4]; 4]){
    for r in 0..4{
        for c in 0..4{
            let g = given[r][c] as Field;
            let s = solution[r][c] as Field;
            assert(g * (g - s) == 0);
        }
    }
}

pub fn is_valid_solution(solution: [[u8; 4]; 4]){

    for r in 0..4{
        for c in 0..4 {
            assert(solution[r][c] >= 1);
            assert(solution[r][c] <= 4);
        }
    }

    for r in 0..4{
        let mut appeared: [bool; 4] = [false; 4];

        for c in 0..4{
            let index: u32 = (solution[r][c] - 1) as u32;
            assert(!appeared[index]);
            appeared[index] = true;
        }
    }

    for c in 0..4{
        let mut appeared: [bool; 4] = [false; 4];
        
        for r in 0..4{
            let index: u32 = (solution[r][c] - 1) as u32;
            assert(!appeared[index]);
            appeared[index] = true;
        }
    }

    {
        let mut appeared: [bool; 4] = [false; 4];
        for r in 0..2{
            for c in 0..2{
                let index: u32 = (solution[r][c] - 1) as u32;
                assert(!appeared[index]);
                appeared[index] = true;
            }
        }
    }

    {
        let mut appeared: [bool; 4] = [false; 4];
        for r in 2..4{
            for c in 0..2{
                let index: u32 = (solution[r][c] - 1) as u32;
                assert(!appeared[index]);
                appeared[index] = true;
            }
        }
    }
    
    {
        let mut appeared: [bool; 4] = [false; 4];
        for r in 0..2{
            for c in 2..4{
                let index: u32 = (solution[r][c] - 1) as u32;
                assert(!appeared[index]);
                appeared[index] = true;
            }
        }
    }

    {
        let mut appeared: [bool; 4] = [false; 4];
        for r in 2..4{
            for c in 2..4{
                let index: u32 = (solution[r][c] - 1) as u32;
                assert(!appeared[index]);
                appeared[index] = true;
            }
        }
    }

}
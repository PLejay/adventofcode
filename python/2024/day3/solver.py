data = open("../../../adventofcode-inputs/2024/day3/input.txt")
instruction = data.read()

def calculate_mul_sum_for_line(line: str) -> int:
  mult_sum = 0

  mul_lines = line.split("mul(")

  for line in mul_lines:
    closing_par_index = line.find(")")

    if closing_par_index == -1:
      continue

    possible_ints = line[:closing_par_index]
    if possible_ints.find(",") == -1:
      continue

    split_ints = possible_ints.split(",")
    if (not split_ints[0].isdigit() or not split_ints[1].isdigit()):
      continue

    mult_sum += int(split_ints[0]) * int(split_ints[1])

  return mult_sum

def part_1_solver() -> int:
  return calculate_mul_sum_for_line(instruction)

def part_2_solver() -> int:
  mult_sum = 0

  do_lines = instruction.split("do()")

  for line in do_lines:
    split_do_line = line.split("don't()")
    mult_sum += calculate_mul_sum_for_line(split_do_line[0])

  return mult_sum

print("part 1:", part_1_solver())
print("part 2:", part_2_solver())
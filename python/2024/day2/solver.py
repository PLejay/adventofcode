import os

# Read the data
data = open("../../../adventofcode-inputs/2024/day2/input.txt")
lines = data.read().splitlines()

def is_compliant(val: int, second_val: int, is_descending: bool) -> bool:
  difference = abs(second_val - val)
  if (difference < 1 or difference > 3):
    return False
  if ((is_descending and val < second_val) or ((not is_descending) and val > second_val) ):
    return False
  return True

def is_line_safe(levels: list[int]) -> bool:
  is_descending = levels[0] > levels[1]
  for i in range(len(levels)):
    if i == len(levels) - 1:
      return True

    val = int(levels[i])
    next_val = int(levels[i + 1])
    if not is_compliant(val, next_val, is_descending):
      break

  return False

def solver(tolerance_level: int) -> int:
  safe_sum = 0

  for line in lines:
    split_line = line.split(" ")
    levels = list(map(lambda level: int(level), split_line))
    if is_line_safe(levels):
      safe_sum += 1
      continue

    if tolerance_level == 0:
      continue

    for i in range(len(levels)):
      levels_with_one_removed = levels[:i] + levels[i + 1:]

      if is_line_safe(levels_with_one_removed):
        safe_sum += 1
        break


  return safe_sum


print("part 1: ", solver(0))
print("part 2: ", solver(1))

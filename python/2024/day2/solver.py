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

def old_solver (tolerance_level: int):
  safe_sum = 0

  for line in lines:
    split_line = line.split(" ")
    is_descending = split_line[0] > split_line[1]
    remaining_tolerance = tolerance_level
    for i in range(len(split_line)):
      # If the loop has reached the end of the input without failing, the line is safe
      if i == len(split_line) - 1:
        safe_sum += 1
        break

      val = int(split_line[i])
      next_val = int(split_line[i + 1])
      if not is_compliant(val, next_val, is_descending):
        if remaining_tolerance == 0 or i > len(split_line) - 3:
          break
        else:
          next_next_val = int(split_line[i + 2])
          if not is_compliant(val, next_next_val, is_descending):
            break
          else:
            remaining_tolerance -= 1
            continue


  return safe_sum

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





# For some reason, the answer is off by 1
print("part 1: ", solver(0))

print("part 2: ", solver(1))

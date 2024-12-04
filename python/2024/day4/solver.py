data = open("../../../adventofcode-inputs/2024/day4/input.txt")
lines = data.read().splitlines()
grid_w = len(lines[0])
grid_h = len(lines)

def is_xmas_string_start(x: int, y: int, direction: str) -> bool:
  match direction:
    case "left":
      if x < 3:
        return False
      return "".join([lines[y][x], lines[y][x - 1], lines[y][x - 2], lines[y][x - 3]]) == "XMAS"
    case "right":
      if x > grid_w - 4:
        return False
      return "".join([lines[y][x], lines[y][x + 1], lines[y][x + 2], lines[y][x + 3]]) == "XMAS"
    case "up":
      if y < 3:
        return False
      return "".join([lines[y][x], lines[y - 1][x], lines[y - 2][x], lines[y - 3][x]]) == "XMAS"
    case "down":
      if y > grid_h - 4:
        return False
      return "".join([lines[y][x], lines[y + 1][x], lines[y + 2][x], lines[y + 3][x]]) == "XMAS"
    case "diag_up_left":
      if x < 3 or y < 3:
        return False
      return "".join([lines[y][x], lines[y - 1][x - 1], lines[y - 2][x - 2], lines[y - 3][x - 3]]) == "XMAS"
    case "diag_up_right":
      if x > grid_w - 4 or y < 3:
        return False
      return "".join([lines[y][x], lines[y - 1][x + 1], lines[y - 2][x + 2], lines[y - 3][x + 3]]) == "XMAS"
    case "diag_down_left":
      if x < 3 or y > grid_h - 4:
        return False
      return "".join([lines[y][x], lines[y + 1][x - 1], lines[y + 2][x - 2], lines[y + 3][x - 3]]) == "XMAS"
    case "diag_down_right":
      if x > grid_w - 4 or y > grid_h - 4:
        return False
      return "".join([lines[y][x], lines[y + 1][x + 1], lines[y + 2][x + 2], lines[y + 3][x + 3]]) == "XMAS"
    case _:
      raise Exception("should not hit the default case")

def part_1_solver() -> int:
  xmas_sum = 0

  for y in range(grid_h):
    for x in range(grid_w):
      char = lines[y][x]

      if not char == "X":
        continue

      directions = ["left", "right", "up", "down", "diag_up_left", "diag_up_right", "diag_down_left", "diag_down_right"]

      for direction in directions:
        if is_xmas_string_start(x, y, direction):
          xmas_sum += 1
  return xmas_sum

def is_up_left_to_down_right_mas(x: int, y: int) -> bool:
  if lines[y - 1][x - 1] == "M" and lines[y + 1][x + 1] == "S":
    return True
  if lines[y - 1][x - 1] == "S" and lines[y + 1][x + 1] == "M":
    return True
  return False

def is_up_right_to_down_left_mas(x: int, y: int) -> bool:
  if lines[y - 1][x + 1] == "M" and lines[y + 1][x - 1] == "S":
    return True
  if lines[y - 1][x + 1] == "S" and lines[y + 1][x - 1] == "M":
    return True
  return False

def part_2_solver() -> int:
  x_mas_sum = 0

  for y in range(grid_h):
    for x in range(grid_w):
      char = lines[y][x]
      if x == 0 or y == 0 or x == grid_w - 1 or y == grid_h - 1 or not char == "A":
        continue

      if is_up_left_to_down_right_mas(x, y) and is_up_right_to_down_left_mas(x, y):
        x_mas_sum += 1

  return x_mas_sum

print("part 1:", part_1_solver())
print("part 2:", part_2_solver())
from typing import Dict, Union

data = open("../../../adventofcode-inputs/2024/day6/input.txt")
original_grid = list(data.read().splitlines())
grid_w = len(original_grid[0])
grid_h = len(original_grid)
initial_x = 0
initial_y = 0
# "up" | "down" | "right" | "left"
current_direction = "up"
is_out_of_bounds = False
# set of visited coords with directions, hashed to `{direction}-{y}-{x}`
visited_coords = set()
loop_nums = 0
has_hit_loop = False

for i in range(grid_h):
  starting_index = original_grid[i].find("^")
  if starting_index != -1:
    initial_y = i
    initial_x = starting_index
    break

current_x = initial_x
current_y = initial_y

def add_xs_to_grid(start_x: int, end_x: int, start_y: int, end_y: int, direction: str, grid: list[list[str]]) -> None:
  global visited_coords
  for i in range(start_y, end_y + 1, 1):
    for j in range(start_x, end_x + 1, 1):
      grid[i] = grid[i][:j] + "X" + grid[i][j + 1:]
      visited_coords.add(f"{direction}-{i}-{j}")
  return None

def check_has_hit_loop(x: int, y: int, direction: str) -> bool:
  check_result = f"{direction}-{y}-{x}" in visited_coords
  return f"{direction}-{y}-{x}" in visited_coords


def update_direction() -> None:
  global current_direction
  match current_direction:
    case "left":
      current_direction = "up"
    case "up":
      current_direction = "right"
    case "right":
      current_direction = "down"
    case "down":
      current_direction = "left"
  return None

def print_grid(grid: list[list[str]]) -> None:
  for line in grid:
    print(line)
  print("\n")


def calculate_path(grid: list[list[str]]) -> None:
  global is_out_of_bounds
  global current_x
  global current_y
  global has_hit_loop
  global loop_nums
  new_x = current_x
  new_y = current_y
  row = grid[current_y]
  col = "".join([row[current_x] for row in grid])

  if check_has_hit_loop(current_x, current_y, current_direction):
    has_hit_loop = True
    loop_nums += 1


  # Find the nearest obstacle in the current direction
  match current_direction:
    case "left":
      obstacle_y = current_y
      left_row = row[:current_x]
      obstacle_x = left_row.rfind("#")
      if obstacle_x == -1:
        is_out_of_bounds = True

      new_x = obstacle_x + 1
      add_xs_to_grid(new_x, current_x, current_y, current_y, current_direction, grid)
    case "right":
      obstacle_y = current_y
      right_row = row[current_x + 1:]
      obstacle_x = right_row.find("#")
      new_x = obstacle_x  + current_x

      if obstacle_x == -1:
        is_out_of_bounds = True
        new_x = grid_w - 1

      add_xs_to_grid(current_x, new_x, current_y, current_y, current_direction, grid)
    case "up":
      obstacle_x = current_x
      up_col = col[:current_y]
      obstacle_y = up_col.rfind("#")
      if obstacle_y == -1:
        is_out_of_bounds = True

      new_y = obstacle_y + 1
      add_xs_to_grid(current_x, current_x, new_y, current_y, current_direction, grid)
    case "down":
      obstacle_x = current_x
      down_col = col[current_y + 1:]
      obstacle_y = down_col.find("#")
      new_y = obstacle_y + current_y
      if obstacle_y == -1:
        is_out_of_bounds = True
        new_y = grid_h - 1

      add_xs_to_grid(current_x, current_x, current_y, new_y, current_direction, grid)
    case _:
      raise Exception("should not hit the default case")


  if not is_out_of_bounds:
    current_x = new_x
    current_y = new_y
    update_direction()




def part_1_solver() -> Dict[str, Union[int, list[list[str]]]]:
  global is_out_of_bounds

  grid = list(original_grid)
  counter = 0
  while not is_out_of_bounds and counter < 1000:
    calculate_path(grid)
    counter += 1

  return {"result": sum(row.count("X") for row in grid), "modified_grid": grid}

def reset_global_values() -> None:
  global is_out_of_bounds
  global has_hit_loop
  global visited_coords
  global current_direction
  global current_x
  global current_y

  is_out_of_bounds = False
  has_hit_loop = False
  visited_coords = set()
  current_direction = "up"
  current_x = initial_x
  current_y = initial_y

def part_2_solver() -> int:
  # Run part_1_solver to get the initial X populated
  modified_grid = part_1_solver()["modified_grid"]

  print_grid(modified_grid)

  for i in range(grid_h):
    for j in range(grid_w):
      # Ignore anything that is not visited by the guard in the default case
      if not modified_grid[i][j] == "X":
        continue
      grid_copy = list(original_grid)
      # Introduce an obstacle at each point
      grid_copy[i] = grid_copy[i][:j] + "#" + grid_copy[i][j + 1:]

      reset_global_values()

      counter = 0
      while not is_out_of_bounds and not has_hit_loop and counter <1000:
        calculate_path(grid_copy)
        counter += 1

  return loop_nums



# print(part_1_solver()["result"])
print(part_2_solver())
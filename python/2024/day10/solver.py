from typing import Tuple

data = open("../../../adventofcode-inputs/2024/day10/input.txt")
input_string = data.read()

# [y, x]
Coords = Tuple[int, int]

grid = input_string.splitlines()
grid_w = len(grid[0])
grid_h = len(grid)

def get_trailhead_coord_list() -> list[Coords]:
  coords = list()

  for i in range(grid_h):
    for j in range(grid_w):
      if grid[i][j] == "0":
        coords.append([i, j])

  return coords

def get_neighbouring_coord_list_in_bounds(current_coords: Coords) -> list[Coords]:
  neighbouring_coord_list = list()
  y, x = current_coords

  if y > 0:
    neighbouring_coord_list.append(( y-1, x ))
  if x > 0:
    neighbouring_coord_list.append(( y, x-1 ))
  if y < grid_h - 1:
    neighbouring_coord_list.append(( y+1, x ))
  if x < grid_w - 1:
    neighbouring_coord_list.append(( y, x+1 ))

  return neighbouring_coord_list


def get_reachable_end_coord_set_for_head(current_coords: Coords) -> set[Coords]:
  end_coord_set = set()

  y, x = current_coords

  current_val = int(grid[y][x])
  if current_val == 9:
    end_coord_set.add(current_coords)
    return end_coord_set

  neighbouring_coord_list = get_neighbouring_coord_list_in_bounds(current_coords)

  valid_neighbouring_coord_list = list()

  for neighbouring_coords in neighbouring_coord_list:
    n_y, n_x = neighbouring_coords
    if int(grid[n_y][n_x]) == current_val + 1:
      valid_neighbouring_coord_list.append(neighbouring_coords)

  # print(valid_neighbouring_coord_list)

  for valid_neighbouring_coords in valid_neighbouring_coord_list:
    end_coord_set = end_coord_set | get_reachable_end_coord_set_for_head(valid_neighbouring_coords)

  return end_coord_set

def solver() -> int:
  sum_scores = 0

  trailhead_coord_list = get_trailhead_coord_list()

  for coords in trailhead_coord_list:
    reachable_end_coord_list = get_reachable_end_coord_set_for_head(coords)
    sum_scores += len(reachable_end_coord_list)

  return sum_scores

print(solver())
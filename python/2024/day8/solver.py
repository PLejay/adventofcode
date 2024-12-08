import os
import sys
from typing import Dict, Tuple

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from utils import print_grid

# [y, x]
Coords = Tuple[int, int]

data = open("../../../adventofcode-inputs/2024/day8/input.txt")
input_string = data.read()
grid = input_string.splitlines()
grid_w = len(grid[0])
grid_h = len(grid)


input_chars = list(set(input_string))
unique_frequencies = [char for char in input_chars if not (char == "." or char == "\n")]
print_grid(grid)

def check_are_within_bounds(y: int, x: int) -> bool:
  return y >= 0 and x >= 0 and y < grid_h and x < grid_w

def get_antenna_coords_by_frequency() -> Dict[str, list[Coords]]:
  antenna_coords = {}
  for i in range(grid_h):
    for j in range(grid_w):
      char = grid[i][j]
      if char == ".":
        continue
      if char in antenna_coords:
        antenna_coords[char].append([i, j])
      else:
        antenna_coords[char] = [[i, j]]

  return antenna_coords

def get_antinode_coords_from_antenna_coords(antenna_coords: list[Coords]) -> list[Coords]:
  if len(antenna_coords) <= 1:
    return []

  antinode_coords = set()

  for i in range(len(antenna_coords) - 1):
    for j in range(i + 1, len(antenna_coords), 1):
      antenna_1_x = antenna_coords[i][1]
      antenna_1_y = antenna_coords[i][0]
      antenna_2_x = antenna_coords[j][1]
      antenna_2_y = antenna_coords[j][0]

      antinode_coords.add(tuple([antenna_1_y, antenna_1_x]))
      antinode_coords.add(tuple([antenna_2_y, antenna_2_x]))
      vertical_distance = antenna_1_y - antenna_2_y
      horizontal_distance = antenna_1_x - antenna_2_x

      # antinode set 1 (in one direction)
      antinode_1_y = antenna_1_y + vertical_distance
      antinode_1_x = antenna_1_x + horizontal_distance
      is_antinode_1_within_bounds = check_are_within_bounds(antinode_1_y, antinode_1_x)

      while is_antinode_1_within_bounds == True:
        antinode_coords.add(tuple([antinode_1_y, antinode_1_x]))

        antinode_1_y += vertical_distance
        antinode_1_x += horizontal_distance

        is_antinode_1_within_bounds = check_are_within_bounds(antinode_1_y, antinode_1_x)

      # antinode set 2 (in the other direction)
      antinode_2_y = antenna_2_y - vertical_distance
      antinode_2_x = antenna_2_x - horizontal_distance

      is_antinode_2_within_bounds = check_are_within_bounds(antinode_2_y, antinode_2_x)

      while is_antinode_2_within_bounds == True:
        antinode_coords.add(tuple([antinode_2_y, antinode_2_x]))

        antinode_2_y -= vertical_distance
        antinode_2_x -= horizontal_distance

        is_antinode_2_within_bounds = check_are_within_bounds(antinode_2_y, antinode_2_x)

  return antinode_coords

def solver() -> int:
  unique_antinode_location_sum = 0
  unique_antinode_coords = set()

  antenna_coords_by_frequency = get_antenna_coords_by_frequency()
  for frequency in antenna_coords_by_frequency:
    antinode_coords = get_antinode_coords_from_antenna_coords(antenna_coords_by_frequency[frequency])
    unique_antinode_coords.update(antinode_coords)

  return len(unique_antinode_coords)

print(solver())
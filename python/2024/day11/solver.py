import functools
import math
from collections import defaultdict
from typing import Tuple

data = open("../../../adventofcode-inputs/2024/day11/input.txt")
input_string = data.read()
input_list = [int(val) for val in input_string.split(" ")]

@functools.cache
def get_vals_for_single_stone(stone_int: int) -> Tuple[int, int]:

  if stone_int == 0:
    return (1, None)
  elif len(str(stone_int)) % 2 == 0:
    middle_index = math.floor(len(str(stone_int)) / 2)
    return (int(str(stone_int)[:middle_index]), int(str(stone_int)[middle_index:]))
  else:
    return (stone_int * 2024, None)


@functools.cache
def run_recursion(stone_int: int, recursion_level: int, max_recursion_level: int) -> int:

  if recursion_level >= max_recursion_level:
    return 1

  stone_sum = 0

  val_1, val_2 = get_vals_for_single_stone(stone_int)
  stone_sum += run_recursion(val_1, recursion_level + 1, max_recursion_level)
  if val_2 != None:
    stone_sum += run_recursion(val_2, recursion_level + 1, max_recursion_level)

  return stone_sum



def solver(iteration_count: int) -> int:
  stone_sum = 0
  for stone_int in input_list:
    stone_sum += run_recursion(stone_int, 0, iteration_count)

  return stone_sum


print({"part 1": solver(25), "part 2": solver(75)})
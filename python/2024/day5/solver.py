import math
from collections import namedtuple

data = open("../../../adventofcode-inputs/2024/day5/input.txt")
lines = data.read().splitlines()
index_of_empty_line = lines.index("")

ordering_rules = lines[:index_of_empty_line]
pages_arr = lines[index_of_empty_line + 1:]

# Dict for rules. Values must not come after the key
rule_dict = {}

for rule_line in ordering_rules:
  Rule = namedtuple("Rule", ["before", "after"])
  split_rule_line = rule_line.split("|")
  rules = Rule(before = int(split_rule_line[0]), after = int(split_rule_line[1]))

  if rules.after in rule_dict:
    rule_dict[rules.after].append(rules.before)
  else:
    rule_dict[rules.after] = [rules.before]

def get_invalid_page_index(page_nums: list[int]) -> int | None:
  disallowed_nums = []
  for i in range(len(page_nums)):
    page_num = page_nums[i]
    if page_num in disallowed_nums:
      return i
    if page_num in rule_dict:
      disallowed_nums = disallowed_nums + rule_dict[page_num]
  return None

def get_corrected_page_nums(page_nums: list[int]) -> list[int]:
  page_num_size = len(page_nums)
  corrected_page_nums = []
  skipped_indexes = []

  for i in range(page_num_size):
    if i in skipped_indexes:
      continue

    page_num = page_nums[i]
    if i == page_num_size - 1:
      corrected_page_nums.append(page_num)
      continue

    if page_num in rule_dict:
      disallowed_nums = []
      for j in range(i + 1, page_num_size, 1):
        if page_nums[j] in rule_dict[page_num]:
          disallowed_nums.append(page_nums[j])
          skipped_indexes.append(j)

      # sort the disallowed nums correctly before moving them earlier in the array
      if len(disallowed_nums) > 0:
        sorted_disallowed_nums = get_corrected_page_nums(disallowed_nums)
        corrected_page_nums = corrected_page_nums + sorted_disallowed_nums

    corrected_page_nums.append(page_num)

  # print(f"corrected_page_nums:", corrected_page_nums)
  invalid_page_index = get_invalid_page_index(corrected_page_nums)

  if invalid_page_index is None:
    return corrected_page_nums
  else:
    return get_corrected_page_nums(list(corrected_page_nums))

# def split_and_try_again(page_nums: list[int]) -> list[int]:
#   middle_index = math.floor(len(page_nums) / 2)
#   try:
#     return get_corrected_page_nums(page_nums)
#   except:
#     long_page_nums_first_half = page_nums[:middle_index]
#     long_page_nums_second_half = page_nums[middle_index:]
#     corrected_page_nums_first_half = split_and_try_again(long_page_nums_first_half)
#     corrected_page_nums_second_half = split_and_try_again(long_page_nums_second_half)
#     return split_and_try_again(corrected_page_nums_first_half + corrected_page_nums_second_half)


def solver() -> int:
  middle_num_sum = 0
  corrected_middle_num_sum = 0

  for pages_str in pages_arr:
    page_nums = [int(page_str) for page_str in pages_str.split(",")]
    middle_index = math.floor(len(page_nums) / 2)
    are_page_nums_valid = get_invalid_page_index(page_nums) is None
    if are_page_nums_valid:
      middle_num_sum += page_nums[middle_index]
    else:
      try:
        corrected_page_nums = get_corrected_page_nums(page_nums)
        corrected_middle_num_sum += corrected_page_nums[middle_index]
      except:
        print(f"recursion depth excedeed for {page_nums}")
      # corrected_page_nums = list(page_nums)
      # are_corrected_page_nums_valid = get_invalid_page_index(corrected_page_nums) is None
      # while not are_corrected_page_nums_valid:
      #   corrected_page_nums = get_corrected_page_nums(corrected_page_nums)
      # # corrected_page_nums = split_and_try_again(page_nums)
      # corrected_middle_num_sum += corrected_page_nums[middle_index]

  return f"part 1: {middle_num_sum}, part 2: {corrected_middle_num_sum}"

print(solver())
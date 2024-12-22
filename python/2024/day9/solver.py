from typing import TypedDict

data = open("../../../adventofcode-inputs/2024/day9/input.txt")
input_string = data.read()

def get_parsed_arr_for_part_1() -> list[str]:
  parsed_arr = list()
  counter = 0
  for i in range(len(input_string)):
    num = int(input_string[i])
    is_empty = i % 2 == 1
    for j in range(num):
      char = "." if is_empty else f"{counter}"
      parsed_arr.append(char)
    if is_empty:
      counter += 1

  return parsed_arr

parsed_input_arr_part_1 = get_parsed_arr_for_part_1()
input_length = len(parsed_input_arr_part_1)
# print(f"parsed_input_arr_part_1: {"".join(parsed_input_arr_part_1)}")

def get_checksum_from_result_arr(result_arr: list[str]) -> int:
  # print(f"result_arr: {"".join(result_arr)}")
  print(len(result_arr))
  checksum = 0

  for i in range(len(result_arr)):
    if result_arr[i] == ".":
      continue
    num = int(result_arr[i])
    checksum += num * i

  return checksum


def solver_part_1() -> int:
  result_arr = list()
  last_index = input_length - 1

  print(parsed_input_arr_part_1)

  for i in range(input_length):
    if i > last_index:
      break

    char = parsed_input_arr_part_1[i]
    if char != ".":
      result_arr.append(char)
    else:
      last_char = parsed_input_arr_part_1[last_index]
      while last_char == "." and last_index > i:
        last_index -= 1
        last_char = parsed_input_arr_part_1[last_index]
      result_arr.append(last_char)
      last_index -= 1

  return get_checksum_from_result_arr(result_arr)

class ParsedObj(TypedDict):
  is_blank: bool
  parsed_str: str

def get_parsed_arr_for_part_2( ) -> list[ParsedObj]:
  parsed_arr = list()
  counter = 0
  for i in range(len(input_string)):
    num = int(input_string[i])
    is_empty = i % 2 == 1
    parsed_str = ""
    for j in range(num):
      char = "." if is_empty else f"{counter}"
      parsed_str = parsed_str + char
    parsed_arr.append({
      "is_blank": is_empty,
      "parsed_str": parsed_str
    })
    if is_empty:
      counter += 1

  return parsed_arr

def solver_part_2() -> int:

  parsed_arr = get_parsed_arr_for_part_2()
  result_arr = list(parsed_arr)



  return 0

# print(solver_part_1())
print(solver_part_2())
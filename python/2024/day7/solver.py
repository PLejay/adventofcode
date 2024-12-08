from typing import Dict, Literal, Union

data = open("../../../adventofcode-inputs/2024/day7/input.txt")
input_lines = data.read().splitlines()

ParsedLine = Dict[str, Union[int, list[int]]]
Operator = Literal["+", "*", "||"]

def parse_input() -> list[ParsedLine]:
  parsed_input = list()
  for line in input_lines:
    split_line = line.split(": ")
    parsed_input.append({
      "test_value": int(split_line[0]),
      "operands": [int(val) for val in split_line[1].split(" ")]
    })

  return parsed_input

parsed_lines = parse_input()

def get_updated_value(num_1: int, num_2: int, operator: Operator) -> int:
  match operator:
    case "+":
      return num_1 + num_2
    case "*":
      return num_1 * num_2
    case "||":
      return int(f"{num_1}{num_2}")


def is_line_valid(test_value: int, operands: list[int], operator: Operator) -> bool:
  if operands[0] > test_value:
    return False

  if len(operands) == 1:
    result = True if operands[0] == test_value else False
    return result

  updated_value = get_updated_value(operands[0], operands[1], operator)
  updated_operands = [updated_value] + operands[2:]

  if (is_line_valid(test_value, updated_operands, "+")):
    return True
  elif (is_line_valid(test_value, updated_operands, "*")):
    return True
  else:
    return is_line_valid(test_value, updated_operands, "||")


def solver() -> int:
  valid_test_value_sum = 0
  for line in parsed_lines:
    test_value = line["test_value"]
    operands = line["operands"]
    if is_line_valid(test_value, operands, "+") or is_line_valid(test_value, operands, "*") or is_line_valid(test_value, operands, "||"):
      valid_test_value_sum += test_value

  return valid_test_value_sum


print(solver())
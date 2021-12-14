#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

class Instruction
{
public:
  string direction;
  int distance;
  Instruction(string dir, int dist)
  {
    direction = dir;
    distance = dist;
  }
};

class Position
{
public:
  int horizontalPos = 0;
  int depth = 0;
  int aim = 0;

  int getPosition(void)
  {
    return horizontalPos * depth;
  }

  void down(int x)
  {
    aim += x;
  }

  void up(int x)
  {
    aim -= x;
  }

  void forward(int x)
  {
    horizontalPos += x;
    depth += aim * x;
  }
};

int solver1(vector<Instruction> &instructions)
{
  Position position;
  for (Instruction inst : instructions)
  {
    if (inst.direction == "forward")
    {
      position.horizontalPos += inst.distance;
    }
    else if (inst.direction == "up")
    {
      position.depth -= inst.distance;
    }
    else if (inst.direction == "down")
    {
      position.depth += inst.distance;
    }
  }
  return position.getPosition();
}

int solver2(vector<Instruction> &instructions)
{
  Position position;
  for (Instruction inst : instructions)
  {
    if (inst.direction == "forward")
    {
      position.forward(inst.distance);
    }
    else if (inst.direction == "up")
    {
      position.up(inst.distance);
    }
    else if (inst.direction == "down")
    {
      position.down(inst.distance);
    }
  }
  return position.getPosition();
}

int main()
{

  vector<Instruction> instructions;
  vector<string> lines;
  string line;

  ifstream input_file("input.txt");

  while (input_file >> line)
  {
    lines.push_back(line);
  }

  for (int i = 0; i < lines.size() - 1; i += 2)
  {
    Instruction inst(lines[i], stoi(lines[i + 1]));
    instructions.push_back(inst);
  }

  // for (Instruction i : instructions)
  // {
  //   cout << "direction: " << i.direction << ", ";
  //   cout << "distance: " << i.distance << endl;
  // }
  // cout << endl;

  cout << solver1(instructions) << endl;
  cout << solver2(instructions) << endl;

  input_file.close();
}
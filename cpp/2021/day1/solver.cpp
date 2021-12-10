#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

int solver(vector<int> &measurements, int windowSize)
{
  int depthIncreasesNum = 0;

  for (int i = 0; i < measurements.size() - windowSize; ++i)
  {
    int sum1 = 0;
    int sum2 = 0;
    for (int j = 0; j < windowSize; ++j)
    {
      sum1 = sum1 + measurements[i + j];
      sum2 = sum2 + measurements[i + j + 1];
    }
    if (sum2 > sum1)
      depthIncreasesNum++;
  }

  return depthIncreasesNum;
}

int main()
{
  vector<int> measurements;
  int number;

  ifstream input_file("input.txt");

  while (input_file >> number)
  {
    measurements.push_back(number);
  }

  // for (int i : measurements)
  // {
  //   cout << i << ",";
  // }
  // cout << endl;

  cout << solver(measurements, 1) << endl;
  cout << solver(measurements, 3) << endl;

  input_file.close();
}
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

int listSize;
int bitSize;

int intsToDecimal(vector<int> &ints)
{
  stringstream ss;
  for (size_t i = 0; i < ints.size(); i++)
  {
    ss << ints[i];
  }
  string s = ss.str();
  return stoi(s, 0, 2);
}

int solver1(vector<vector<int>> &bitList)
{
  vector<int> sumOfBits(bitSize, 0);

  for (int i = 0; i < listSize; i++)
  {
    for (int j = 0; j < bitSize; j++)
    {
      sumOfBits[j] += bitList[i][j];
    }
  }
  vector<int> gammaArray(bitSize);
  vector<int> epsilonArray(bitSize);

  for (int i = 0; i < bitSize; i++)
  {
    bool isOneMostCommon = sumOfBits[i] > bitList.size() / 2;
    gammaArray[i] = isOneMostCommon ? 1 : 0;
    epsilonArray[i] = isOneMostCommon ? 0 : 1;
  }
  return intsToDecimal(gammaArray) * intsToDecimal(epsilonArray);
}

int findMostOrLeastCommonBit(vector<vector<int>> &bitList, string mostOrLeast, int currentIndex)
{
  int sumOfBits = 0;
  for (int i = 0; i < listSize; i++)
  {
    sumOfBits += bitList[i][currentIndex];
  }
  int mostCommonBit = sumOfBits > listSize / 2 ? 1 : 0;
  int leastCommonBit = mostCommonBit == 1 ? 0 : 1;

  return mostOrLeast == "most" ? mostCommonBit : leastCommonBit;
}

vector<int> findMatchingBits(vector<vector<int>> bitList, string mostOrLeast)
{
  for (int i = 0; i < listSize; i++)
  {
    if (bitList.size() == 1)
    {
      return bitList[0];
    }
    int requiredBit = findMostOrLeastCommonBit(bitList, mostOrLeast, i);
    for (int j = 0; j < bitList.size(); j++)
    {
      if (bitList[j][i] != requiredBit)
      {
        bitList.erase(j);
      }
    }
  }
}

int solver2(vector<vector<int>> &bitList)
{
  vector<int> co2Rating = findMatchingBits(bitList, "most");
  vector<int> lifeSupportRating = findMatchingBits(bitList, "least");

  return intsToDecimal(co2Rating) * intsToDecimal(lifeSupportRating);
}

int main()
{

  vector<vector<int>> bitList;
  vector<string> lines;
  string line;

  ifstream input_file("input.txt");

  while (input_file >> line)
  {
    vector<int> bits;

    for (int i = 0; i < line.size(); ++i)
    {
      bits.push_back(int(line[i]) - 48);
    }
    bitList.push_back(bits);
  }

  listSize = bitList.size();
  bitSize = bitList[0].size();

  // for (int i : bitList[1])
  // {
  //   cout << i << endl;
  // }
  // cout << endl;

  cout << "solution 1: " << solver1(bitList) << endl;
  cout << "solution 2: " << solver2(bitList) << endl;

  input_file.close();
}
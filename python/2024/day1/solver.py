# Read the data
data = open("../../../adventofcode-inputs/2024/day1/input.txt")
lines = data.read().splitlines()

list1 = []
list2 = []
distanceSum = 0
similaritySum = 0

for line in lines:
  splitLine = line.split("   ")
  list1.append(int(splitLine[0]))
  list2.append(int(splitLine[1]))

sortedList1 = sorted(list1)
sortedList2 = sorted(list2)

for i in range(len(list1)):
  distanceSum += abs(sortedList1[i] - sortedList2[i])
  similarityScore = list2.count(list1[i]) * list1[i]
  print("similarityScore:", similarityScore)
  similaritySum += similarityScore

print("distanceSum: ", distanceSum)
print("similaritySum: ", similaritySum)
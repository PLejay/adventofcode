print("Is python running?")

def get_data():
   with open("input.txt", "rt") as AoCinput:
       lines = AoCinput.read().splitlines()
       return lines

entries=get_data()
entries[:5]
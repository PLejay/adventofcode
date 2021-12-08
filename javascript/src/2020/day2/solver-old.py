import pandas as pd
import numpy as np
#change txt file into a dataframe
entries = pd.read_csv('AdventofCode2020Day2.txt', sep=" ",header=None)
entries.head()

#break text of the first column on the hyphen
minmax_split = entries.iloc [:,0].str.split("-", n = -1, expand = True)
entries = pd.concat([entries, minmax_split], axis=1)
#give new column headings
entries.columns = ['frequencies','givenletter','passwords','min','max']
#remove unneeded punctuation
entries["givenletter"] = entries["givenletter"].str.replace(":", "")
#count number of givenletter in the password
entries['frequency'] = entries.apply(lambda x:x['passwords'].count(x['givenletter']), axis=1)

entries.head()

#the min max columns need to be integers if they are to be compared to the frequency column
entries['min']= entries['min'].astype(int)
entries['max']= entries['max'].astype(int)
entries.dtypes

#flag if frequency falls within the minmax limits
entries["validation"] = np.where((entries['frequency'] >= entries['min']) & (entries['frequency'] <=                           entries['max']), "True", "False")
entries.head()

#frequency table
entries["validation"].value_counts()
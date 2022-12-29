from nltk.corpus import wordnet as wn
import itertools
import json

def prove_noun_remove_duplicates(list_of_nouns):
    final_list_of_nouns = []
    no_duplicates_list = list(dict.fromkeys(list_of_nouns))
    list_of_nouns_from_wordnet = {x.name().split('.', 1)[0] for x in wn.all_synsets('n')}
        
    for noun in no_duplicates_list:
        if noun in list_of_nouns_from_wordnet:
            final_list_of_nouns.append(noun)
    return final_list_of_nouns

def read_file(filename):
    list_of_nouns = []
    
    file = open(filename, 'r')
    Lines = file.readlines()
    
    # Strips the newline character
    for line in Lines:
        list_of_nouns.append(line.strip())

    return list_of_nouns

def convert_list_to_dictionary(list_of_nouns):
    dictionary_of_nouns = { noun : False for noun in list_of_nouns }
    with open("nouns.json", "w") as outfile:
        json.dump(dictionary_of_nouns, outfile)

# currently have 17302 nouns total
# currently have 6053 nouns after cleaning
def create_final_list_of_acceptable_noun_without_duplicates():
    # test list of nouns
    # list_of_files_to_evaluate = ['./testing/noun_list_v1.txt', './testing/noun_list_v2.txt']
    list_of_files_to_evaluate = ['unofficial_txt_list_v1.txt', 'unofficial_txt_list_v2.txt', 'unofficial_txt_list_v3.txt']
    final_list_of_nouns = []
    
    for file in list_of_files_to_evaluate:
        final_list_of_nouns = list(itertools.chain(final_list_of_nouns, read_file(file)))
        
    completed_list_of_nouns = prove_noun_remove_duplicates(final_list_of_nouns)
    
    convert_list_to_dictionary(completed_list_of_nouns)
    
    print(len(final_list_of_nouns))
    print(len(completed_list_of_nouns))
    
create_final_list_of_acceptable_noun_without_duplicates()
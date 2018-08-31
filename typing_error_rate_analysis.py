# -*- coding: utf-8 -*-
"""
Created on Tue Aug 28 12:01:00 2018

@author: Ben_Lucas
"""
import numpy as np
from matplotlib.pyplot import plot as plt
from scipy.stats import pearsonr

def LevenshteinDistance(seq1, seq2):  
    size_x = len(seq1) + 1
    size_y = len(seq2) + 1
    matrix = np.zeros ((size_x, size_y))
    for x in range(size_x):
        matrix [x, 0] = x
    for y in range(size_y):
        matrix [0, y] = y

    for x in range(1, size_x):
        for y in range(1, size_y):
            if seq1[x-1] == seq2[y-1]:
                matrix [x,y] = min(
                    matrix[x-1, y] + 1,
                    matrix[x-1, y-1],
                    matrix[x, y-1] + 1
                )
            else:
                matrix [x,y] = min(
                    matrix[x-1,y] + 1,
                    matrix[x-1,y-1] + 1,
                    matrix[x,y-1] + 1
                )
    return (matrix[size_x - 1, size_y - 1])

class TrialData:
    def __init__(self, latency, frame_time, target_text, input_text):
        self.latency = latency
        self.frame_time = frame_time
        self.edit_distance = LevenshteinDistance(target_text, input_text)
        self.normalized_edit_distance = float(self.edit_distance)/float(len(target_text))
        self.target_text = target_text
        self.input_text = input_text
        
def LoadTestData(filename):
    f = open(filename, 'r')
    file_data = f.readlines()
    trial_data_list = []
    for i in range(1, len(file_data)):
        trial_data_list.append(ParseEntry(file_data[i]))
    return trial_data_list
    
def ParseEntry(entry):
    fields = entry.split("#")
    latency = int(fields[0].split(":")[1])
    frame_time = int(fields[1].split(":")[1])
    target_text = fields[2]
    input_text = fields[3].split(": ")[1].replace("\n","")
    return TrialData(latency, frame_time, target_text, input_text)

def BinLagLatency(trial_data):
    latencies = [tr.latency for tr in trial_data]
    unique_latency = list(set(latencies))
    unique_latency.sort()
    average_edits = []
    for latency in unique_latency:
        edit_distances = [tr.normalized_edit_distance for tr in trial_data if tr.latency == latency]
        average_edits.append(np.mean(edit_distances))
    return zip(unique_latency, average_edits)

def CheckLagLatencyCorrelation(trial_data):
    lag_latency = [tr.latency for tr in trial_data]
    norm_error = [tr.normalized_edit_distance for tr in trial_data]
    corr = pearsonr(lag_latency, norm_error)
    return corr

def BinFrameRateLatency(trial_data):
    latencies = [tr.frame_time for tr in trial_data]
    unique_latency = list(set(latencies))
    unique_latency.sort()
    average_edits = []
    for latency in unique_latency:
        edit_distances = [tr.normalized_edit_distance for tr in trial_data if tr.frame_time == latency]
        average_edits.append(np.mean(edit_distances))
    return zip(unique_latency, average_edits)

def CheckFrameRateLatencyCorrelation(trial_data):
    frame_rate_latency = [tr.frame_time for tr in trial_data]
    norm_error = [tr.normalized_edit_distance for tr in trial_data]
    corr = pearsonr(frame_rate_latency, norm_error)
    return corr

# Analyze Frame Rate only data:
filename = "trialData_frameRate.txt"
trials = LoadTestData(filename)
latency_vs_editDist = BinFrameRateLatency(trials)
corr_frameRate = CheckFrameRateLatencyCorrelation(trials)
#print(corr_frameRate[1]) # p-value - printing for python3 only...
#Plot Latency:
plt([x[0] for x in latency_vs_editDist], [x[1] for x in latency_vs_editDist])

# Analyze Frame Rate only data:
filename = "trialData_displayLag.txt"
trials = LoadTestData(filename)
latency_vs_editDist = BinLagLatency(trials)
corr_lag = CheckLagLatencyCorrelation(trials)
#print(corr_lag[1])
#Plot Latency:
plt([x[0] for x in latency_vs_editDist], [x[1] for x in latency_vs_editDist])